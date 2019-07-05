import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { RoleName } from 'src/app/core/constant/role-name';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { HospitalService } from 'src/app/core/services/hospital.service';
import { UserService } from 'src/app/core/services/user.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-hospital-assign-staffs-modal',
  templateUrl: './hospital-assign-staffs-modal.component.html',
  styleUrls: ['./hospital-assign-staffs-modal.component.scss']
})
export class HospitalAssignStaffsModalComponent implements OnInit {

  @Input() hospitalId: string;
  @Input() rowData: TableRow;

  @Output() hospitalStaffUpdated = new EventEmitter();

  staffsForm: FormGroup;
  roleId: string;

  existingUsers = [];
  users$: Observable<User[]>;
  usersInput$ = new Subject<string>();
  usersLoading = false;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private userService: UserService,
    private hospitalService: HospitalService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.staffsForm = this.fb.group({
      userIds: [[], Validators.required]
    });

    this.hospitalService.getStaffsOfHospital(this.hospitalId)
      .subscribe((users: User[]) => {
        this.existingUsers = users;
        this.staffsForm.patchValue({
          userIds: users.map(user => user._id)
        });

        this.users$ = concat(
          of(this.existingUsers), // default items
          this.usersInput$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            filter(term => term && term.length > 2),
            tap(() => this.usersLoading = true),
            switchMap(term => this.userService.searchUsers(term).pipe(
              map((response: any) => response.items),
              catchError(() => of([])), // empty list on error
              tap(() => this.usersLoading = false)
            ))
          )
        );
      });
  }

  assignStaffs() {
    this.userService.assignOrganization(
      this.staffsForm.value.userIds,
      RoleName.HOSPITAL,
      this.hospitalId
    ).subscribe(
      (result: any) => {
        this.hospitalStaffUpdated.emit(result);
        this.alertService.success('common.alert.assignStaffsSuccess');
      },
      error => this.alertService.error('common.alert.assignStaffsFailed')
    );
  }

}

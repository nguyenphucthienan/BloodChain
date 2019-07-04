import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { RoleName } from 'src/app/core/constant/role-name';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodCampService } from 'src/app/core/services/blood-camp.service';
import { UserService } from 'src/app/core/services/user.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-camp-assign-staffs-modal',
  templateUrl: './blood-camp-assign-staffs-modal.component.html',
  styleUrls: ['./blood-camp-assign-staffs-modal.component.scss']
})
export class BloodCampAssignStaffsModalComponent implements OnInit {

  @Input() bloodCampId: string;
  @Input() rowData: TableRow;

  @Output() bloodCampStaffUpdated = new EventEmitter();

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
    private bloodCampService: BloodCampService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.staffsForm = this.fb.group({
      userIds: [[], Validators.required]
    });

    this.bloodCampService.getStaffsOfBloodCamp(this.bloodCampId)
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
      RoleName.BLOOD_CAMP,
      this.bloodCampId
    ).subscribe(
      (result: any) => {
        this.bloodCampStaffUpdated.emit(result);
        this.alertService.success('common.alert.assignStaffsSuccess');
      },
      error => this.alertService.error('common.alert.assignStaffsFailed')
    );
  }

}

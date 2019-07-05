import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { RoleName } from 'src/app/core/constant/role-name';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodTestCenterService } from 'src/app/core/services/blood-test-center.service';
import { UserService } from 'src/app/core/services/user.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-test-center-assign-staffs-modal',
  templateUrl: './blood-test-center-assign-staffs-modal.component.html',
  styleUrls: ['./blood-test-center-assign-staffs-modal.component.scss']
})
export class BloodTestCenterAssignStaffsModalComponent implements OnInit {

  @Input() bloodTestCenterId: string;
  @Input() rowData: TableRow;

  @Output() bloodTestCenterStaffUpdated = new EventEmitter();

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
    private bloodTestCenterService: BloodTestCenterService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.staffsForm = this.fb.group({
      userIds: [[], Validators.required]
    });

    this.bloodTestCenterService.getStaffsOfBloodTestCenter(this.bloodTestCenterId)
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
      RoleName.BLOOD_TEST_CENTER,
      this.bloodTestCenterId
    ).subscribe(
      (result: any) => {
        this.bloodTestCenterStaffUpdated.emit(result);
        this.alertService.success('common.alert.assignStaffsSuccess');
      },
      error => this.alertService.error('common.alert.assignStaffsFailed')
    );
  }

}

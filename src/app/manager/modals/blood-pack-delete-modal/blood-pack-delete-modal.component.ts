import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleName } from 'src/app/core/constant/role-name';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-blood-pack-delete-modal',
  templateUrl: './blood-pack-delete-modal.component.html',
  styleUrls: ['./blood-pack-delete-modal.component.scss']
})
export class BloodPackDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;
  @Input() organizationType: RoleName;
  @Input() bloodPackIds: string[] = [];

  @Output() bloodPackDeleted = new EventEmitter();

  constructor(
    public modalRef: MDBModalRef,
    private authService: AuthService,
    private bloodPackService: BloodPackService,
    private alertService: AlertService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  deleteBloodPack() {
    this.spinnerService.show();
    this.authService.getMyUserInfo().subscribe(
      (user: User) => {
        let organizationId: string;
        switch (this.organizationType) {
          case RoleName.BLOOD_CAMP:
            organizationId = user.bloodCamp._id;
            break;
          case RoleName.BLOOD_TEST_CENTER:
            organizationId = user.bloodTestCenter._id;
            break;
          case RoleName.BLOOD_SEPARATION_CENTER:
            organizationId = user.bloodSeparationCenter._id;
            break;
        }

        this.bloodPackService.disposeBloodPack({
          organizationType: this.organizationType,
          organizationId,
          description: 'Dispose Blood Pack',
          bloodPackIds: this.bloodPackIds
        })
          .subscribe(
            () => {
              this.spinnerService.hide();
              this.bloodPackDeleted.emit();
              this.alertService.success('bloodPackManager.alert.deleteSuccess');
            },
            error => {
              this.spinnerService.hide();
              this.alertService.error('bloodPackManager.alert.deleteFailed');
            }
          );
      },
      error => {
        this.spinnerService.hide();
        this.alertService.error('bloodPackManager.alert.deleteFailed');
      });
  }

}

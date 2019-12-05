import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleName } from 'src/app/core/constant/role-name';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import {
  BloodPackDisposeResultModalComponent,
} from '../blood-pack-dispose-result-modal/blood-pack-dispose-result-modal.component';

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
    private modalService: MDBModalService,
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
            (results) => {
              this.spinnerService.hide();
              this.bloodPackDeleted.emit();
              this.openBloodPackDisposeResultModal(results);
            },
            error => {
              this.spinnerService.hide();
              this.alertService.error('bloodPackManager.alert.disposeFailed');
            }
          );
      },
      error => {
        this.spinnerService.hide();
        this.alertService.error('bloodPackManager.alert.disposeFailed');
      });
  }

  openBloodPackDisposeResultModal({ success, errors }) {
    this.modalRef = this.modalService.show(BloodPackDisposeResultModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        success,
        errors
      }
    });
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleName } from 'src/app/core/constant/role-name';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BloodProductService } from 'src/app/core/services/blood-product.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

import {
  BloodProductDisposeResultModalComponent,
} from '../blood-product-dispose-result-modal/blood-product-dispose-result-modal.component';

@Component({
  selector: 'app-blood-product-delete-modal',
  templateUrl: './blood-product-delete-modal.component.html',
  styleUrls: ['./blood-product-delete-modal.component.scss']
})
export class BloodProductDeleteModalComponent implements OnInit {

  @Input() rowData: TableRow;
  @Input() organizationType: RoleName;
  @Input() bloodProductIds: string[] = [];

  @Output() bloodProductDeleted = new EventEmitter();

  constructor(
    public modalRef: MDBModalRef,
    private modalService: MDBModalService,
    private authService: AuthService,
    private bloodProductService: BloodProductService,
    private alertService: AlertService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  deleteBloodProducts() {
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

        this.bloodProductService.disposeBloodProducts({
          organizationType: this.organizationType,
          organizationId,
          description: 'Dispose Blood Product',
          bloodProductIds: this.bloodProductIds
        })
          .subscribe(
            (results) => {
              this.spinnerService.hide();
              this.bloodProductDeleted.emit();
              this.openBloodProductDisposeResultModal(results);
            },
            error => {
              this.spinnerService.hide();
              this.alertService.error('bloodProductManager.alert.disposeFailed');
            }
          );
      },
      error => {
        this.spinnerService.hide();
        this.alertService.error('bloodProductManager.alert.disposeFailed');
      });
  }

  openBloodProductDisposeResultModal({ success, errors }) {
    this.modalRef = this.modalService.show(BloodProductDisposeResultModalComponent, {
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

import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Point } from 'src/app/core/models/point.interface';
import { User } from 'src/app/core/models/user.interface';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';

import { UserQrcodeModalComponent } from '../../modals/user-qrcode-modal/user-qrcode-modal.component';
import { UserDetailBloodDonationHistoryTableService } from '../../services/user-detail-blood-donation-history-table.service';

@Component({
  selector: 'app-manager-user-manager-user-detail',
  templateUrl: './manager-user-manager-user-detail.component.html',
  styleUrls: ['./manager-user-manager-user-detail.component.scss'],
  providers: [UserDetailBloodDonationHistoryTableService]
})
export class ManagerUserManagerUserDetailComponent implements OnInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  user: User;
  userForm: FormGroup;

  point: Point;
  modalRef: MDBModalRef;

  constructor(
    public userDetailBloodDonationHistoryTableService: UserDetailBloodDonationHistoryTableService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private modalService: MDBModalService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.userForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      gender: [null, Validators.required],
      birthdate: [null, Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      location: [null, Validators.required]
    });

    this.userForm.disable();
    this.route.data.subscribe((data: any) => {
      this.user = data.user;
      this.point = this.user.location;
      this.userForm.patchValue({
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        gender: this.user.gender,
        birthdate: this.user.birthdate,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address,
        location: this.user.location
      });

      this.userDetailBloodDonationHistoryTableService.filterMode.donor = this.user._id;
      this.datatable.refresh();
    });
  }

  openUserQrCodeModal() {
    this.modalRef = this.modalService.show(UserQrcodeModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        user: this.user
      }
    });
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodPackDetail(tableCellChange.row.cells._id.value);
        break;
    }
  }

  navigateToBloodPackDetail(id: string) {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}

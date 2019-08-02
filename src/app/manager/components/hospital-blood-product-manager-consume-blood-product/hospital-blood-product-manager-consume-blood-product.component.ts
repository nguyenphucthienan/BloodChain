import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { RoleName } from 'src/app/core/constant/role-name';
import { BloodProduct } from 'src/app/core/models/blood-product.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BloodProductService } from 'src/app/core/services/blood-product.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { ScanQrcodeModalComponent } from 'src/app/shared/modals/scan-qrcode-modal/scan-qrcode-modal.component';

import { HospitalBloodProductConsumeTableService } from '../../services/hospital-blood-product-consume-table.service';

@Component({
  selector: 'app-hospital-blood-product-manager-consume-blood-product',
  templateUrl: './hospital-blood-product-manager-consume-blood-product.component.html',
  styleUrls: ['./hospital-blood-product-manager-consume-blood-product.component.scss'],
  providers: [HospitalBloodProductConsumeTableService]
})
export class HospitalBloodProductManagerConsumeBloodProductComponent implements OnInit, OnDestroy {

  readonly organizationTypeTranslations = [
    { translation: 'bloodProductManager.organization.bloodBank', value: RoleName.BLOOD_BANK },
    { translation: 'bloodProductManager.organization.hospital', value: RoleName.HOSPITAL }
  ];

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  modalRef: MDBModalRef;

  bloodProducts$: Observable<BloodProduct[]>;
  bloodProductsInput$ = new Subject<string>();
  bloodProductsLoading = false;

  consumeForm: FormGroup;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private authService: AuthService,
    private bloodProductService: BloodProductService,
    private alertService: AlertService,
    private modalService: MDBModalService,
    private spinnerService: NgxSpinnerService,
    public hospitalBloodProductConsumeTableService: HospitalBloodProductConsumeTableService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const { bloodProducts } = navigation.extras.state;
      if (bloodProducts) {
        this.hospitalBloodProductConsumeTableService.setDataRows(bloodProducts);
      }
    }
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.initForms();
    this.initDataFields();
  }

  private initDataFields() {
    this.bloodProducts$ = concat(
      of([]), // default items
      this.bloodProductsInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(id => id && id.length === 24),
        tap(() => this.bloodProductsLoading = true),
        switchMap(id => this.bloodProductService.getBloodProduct(id).pipe(
          map((bloodProduct: BloodProduct) => [bloodProduct]),
          catchError(() => of([])), // empty list on error
          tap(() => this.bloodProductsLoading = false)
        ))
      )
    );
  }

  private initForms() {
    this.consumeForm = this.fb.group({
      bloodProductIds: [[]],
      patientName: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  selectBloodProduct(bloodProduct: BloodProduct) {
    if (!bloodProduct) {
      return;
    }

    this.authService.getMyUserInfo()
      .subscribe((user: User) => {
        if (user.bloodCamp._id !== bloodProduct.currentLocation) {
          this.alertService.error('bloodProductManager.alert.cannotSelect');
          return;
        }

        this.hospitalBloodProductConsumeTableService.addRawDataRow(bloodProduct);
        this.datatable.refresh();
      });
  }

  openScanQrCodeModal() {
    this.modalRef = this.modalService.show(ScanQrcodeModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.scanSuccess
      .subscribe((bloodProductId: string) => this.onQrCodeScanSuccess(bloodProductId));
  }

  onQrCodeScanSuccess(bloodProductId: string) {
    this.bloodProductService.getBloodProduct(bloodProductId)
      .subscribe(
        (bloodProduct: BloodProduct) => this.selectBloodProduct(bloodProduct),
        error => this.alertService.error('common.alert.qrCodeInvalid')
      );
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodProductDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Delete:
        this.removeBloodProductFromList(tableCellChange.row.cells._id.value);
    }
  }

  navigateToBloodProductDetail(id: string) {
  }

  removeBloodProductFromList(id: string) {
    this.hospitalBloodProductConsumeTableService.removeDataRow(id);
    this.datatable.refresh();
  }

  consumeBloodProducts() {
    // const bloodProductIds = this.hospitalBloodProductConsumeTableService.getAllRowIds();
    // if (bloodProductIds.length === 0) {
    //   this.alertService.error('bloodProductManager.alert.noBloodProduct');
    //   return;
    // }

    // this.openBloodProductTransferConfirmModal(bloodProductIds);
  }

  openBloodProductConsumeConfirmModal(bloodProductIds: string[]) {
    // this.modalRef = this.modalService.show(BloodProductTransferConfirmModalComponent, {
    //   backdrop: true,
    //   keyboard: true,
    //   focus: true,
    //   show: false,
    //   ignoreBackdropClick: true,
    //   class: 'modal-dialog-centered',
    //   containerClass: 'top',
    //   animated: true
    // });

    // this.modalRef.content.confirmed
    //   .subscribe(() => this.onTransferBloodProductsConfirmed(bloodProductIds));
  }

  onConsumeBloodProductsConfirmed(bloodProductIds: string[]) {
    // this.spinnerService.show();
    // this.consumeForm.patchValue({ bloodProductIds });
    // this.bloodProductService.transferBloodProducts(
    //   RoleName.HOSPITAL,
    //   this.toOrganizationType,
    //   this.consumeForm.getRawValue()
    // ).subscribe(
    //   results => {
    //     this.openBloodProductTransferResultModal(results);
    //     this.spinnerService.hide();
    //   },
    //   error => this.spinnerService.hide()
    // );
  }

  openBloodProductTransferResultModal({ success, errors }) {
    // this.modalRef = this.modalService.show(BloodProductTransferResultModalComponent, {
    //   backdrop: true,
    //   keyboard: true,
    //   focus: true,
    //   show: false,
    //   ignoreBackdropClick: true,
    //   class: 'modal-dialog-centered',
    //   containerClass: 'top',
    //   animated: true,
    //   data: {
    //     success,
    //     errors
    //   }
    // });

    // this.modalRef.content.closed.subscribe(() => this.resetForm());
  }

  resetForm() {
    this.consumeForm.reset();
    this.hospitalBloodProductConsumeTableService.removeAllDataRows();
    this.datatable.refresh();
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.consumeForm.get(controlName).touched
      && this.consumeForm.get(controlName).hasError(errorName);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}

import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { RoleName } from 'src/app/core/constant/role-name';
import { BloodProduct } from 'src/app/core/models/blood-product.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BloodBankService } from 'src/app/core/services/blood-bank.service';
import { BloodProductService } from 'src/app/core/services/blood-product.service';
import { HospitalService } from 'src/app/core/services/hospital.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { ScanQrcodeModalComponent } from 'src/app/shared/modals/scan-qrcode-modal/scan-qrcode-modal.component';

import {
  BloodProductTransferConfirmModalComponent,
} from '../../modals/blood-product-transfer-confirm-modal/blood-product-transfer-confirm-modal.component';
import {
  BloodProductTransferResultModalComponent,
} from '../../modals/blood-product-transfer-result-modal/blood-product-transfer-result-modal.component';
import {
  BloodSeparationCenterBloodProductTransferTableService,
} from '../../services/blood-separation-center-blood-product-transfer-table.service';

@Component({
  selector: 'app-blood-separation-center-blood-product-manager-transfer-blood-product',
  templateUrl: './blood-separation-center-blood-product-manager-transfer-blood-product.component.html',
  styleUrls: ['./blood-separation-center-blood-product-manager-transfer-blood-product.component.scss'],
  providers: [BloodSeparationCenterBloodProductTransferTableService]
})
export class BloodSeparationCenterBloodProductManagerTransferBloodProductComponent implements OnInit, OnDestroy {

  readonly organizationTypeTranslations = [
    { translation: 'bloodProductManager.organization.bloodBank', value: RoleName.BLOOD_BANK },
    { translation: 'bloodProductManager.organization.hospital', value: RoleName.HOSPITAL }
  ];

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('organizationTypeSelect') organizationTypeSelect: NgSelectComponent;
  @ViewChild('organizationSelect') organizationSelect: NgSelectComponent;

  modalRef: MDBModalRef;

  bloodProducts$: Observable<BloodProduct[]>;
  bloodProductsInput$ = new Subject<string>();
  bloodProductsLoading = false;

  organizations$: Observable<any>;
  organizationsInput$ = new Subject<string>();
  organizationsLoading = false;

  organizationTypes: any[] = [];
  organizationType: any;
  toOrganizationType: RoleName;

  organizationForm: FormGroup;
  transferForm: FormGroup;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private authService: AuthService,
    private bloodBankService: BloodBankService,
    private hospitalService: HospitalService,
    private bloodProductService: BloodProductService,
    private alertService: AlertService,
    private modalService: MDBModalService,
    private translate: TranslateService,
    private spinnerService: NgxSpinnerService,
    public bloodSeparationCenterBloodProductTransferTableService: BloodSeparationCenterBloodProductTransferTableService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const { bloodProducts } = navigation.extras.state;
      if (bloodProducts) {
        this.bloodSeparationCenterBloodProductTransferTableService.setDataRows(bloodProducts);
      }
    }
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.initForms();
    this.initDataFields();
  }

  private initDataFields() {
    this.translate.get(this.organizationTypeTranslations.map(resultTranslation => resultTranslation.translation))
      .subscribe(translations => {
        this.organizationTypes = this.organizationTypeTranslations
          .map(organizationTypeTranslation => ({
            label: translations[organizationTypeTranslation.translation],
            value: organizationTypeTranslation.value
          }));

        this.organizationTypeSelect.select(this.organizationTypes[0]);
        this.initOrganizationDataField(this.organizationTypes[0].value);
      });

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

  initOrganizationDataField(organizationType: RoleName) {
    if (organizationType === RoleName.BLOOD_BANK) {
      this.organizations$ = concat(
        of([]), // default items
        this.organizationsInput$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          filter(name => name && name.length > 2),
          tap(() => this.organizationsLoading = true),
          switchMap(id => this.bloodBankService.searchBloodBanks(id).pipe(
            map((response: any) => response.items),
            catchError(() => of([])), // empty list on error
            tap(() => this.organizationsLoading = false)
          ))
        )
      );
    } else if (organizationType === RoleName.HOSPITAL) {
      this.organizations$ = concat(
        of([]), // default items
        this.organizationsInput$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          filter(name => name && name.length > 2),
          tap(() => this.organizationsLoading = true),
          switchMap(id => this.hospitalService.searchHospitals(id).pipe(
            map((response: any) => response.items),
            catchError(() => of([])), // empty list on error
            tap(() => this.organizationsLoading = false)
          ))
        )
      );
    }
  }

  private initForms() {
    this.organizationForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      location: [null, Validators.required]
    });

    this.transferForm = this.fb.group({
      bloodProductIds: [[]],
      toOrganizationId: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  selectOrganizationType(organizationType: any) {
    this.toOrganizationType = organizationType.value;
    this.organizationSelect.clearModel();
    this.initOrganizationDataField(organizationType.value);
    this.organizationForm.reset();
  }

  selectOrganization(organization: any) {
    if (!organization) {
      this.organizationForm.reset();
      this.transferForm.reset();
      return;
    }

    this.organizationForm.patchValue({
      name: organization.name,
      address: organization.address,
      phone: organization.phone,
      email: organization.email,
      location: organization.location
    });

    this.transferForm.patchValue({
      toOrganizationId: organization._id
    });
  }

  selectBloodProduct(bloodProduct: BloodProduct) {
    if (!bloodProduct) {
      return;
    }

    this.authService.getMyUserInfo()
      .subscribe((user: User) => {
        if (user.bloodCamp._id !== bloodProduct.currentLocation) {
          this.alertService.error('bloodProductManager.alert.cannotSelectBloodProduct');
          return;
        }

        this.bloodSeparationCenterBloodProductTransferTableService.addRawDataRow(bloodProduct);
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
    this.bloodSeparationCenterBloodProductTransferTableService.removeDataRow(id);
    this.datatable.refresh();
  }

  transferBloodProducts() {
    const bloodProductIds = this.bloodSeparationCenterBloodProductTransferTableService.getAllRowIds();
    if (bloodProductIds.length === 0) {
      this.alertService.error('bloodProductManager.alert.noBloodProduct');
      return;
    }

    this.openBloodProductTransferConfirmModal(bloodProductIds);
  }

  openBloodProductTransferConfirmModal(bloodProductIds: string[]) {
    this.modalRef = this.modalService.show(BloodProductTransferConfirmModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.confirmed
      .subscribe(() => this.onTransferBloodProductsConfirmed(bloodProductIds));
  }

  onTransferBloodProductsConfirmed(bloodProductIds: string[]) {
    this.spinnerService.show();
    this.transferForm.patchValue({ bloodProductIds });
    this.bloodProductService.transferBloodProducts(
      RoleName.BLOOD_SEPARATION_CENTER,
      this.toOrganizationType,
      this.transferForm.getRawValue()
    ).subscribe(
      results => {
        this.openBloodProductTransferResultModal(results);
        this.spinnerService.hide();
      },
      error => this.spinnerService.hide()
    );
  }

  openBloodProductTransferResultModal({ success, errors }) {
    this.modalRef = this.modalService.show(BloodProductTransferResultModalComponent, {
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

    this.modalRef.content.closed.subscribe(() => this.resetForm());
  }

  resetForm() {
    this.organizationSelect.clearModel();
    this.organizationForm.reset();
    this.transferForm.reset();
    this.bloodSeparationCenterBloodProductTransferTableService.removeAllDataRows();
    this.datatable.refresh();
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.transferForm.get(controlName).touched
      && this.transferForm.get(controlName).hasError(errorName);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}

import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { BloodSeparationCenter } from 'src/app/core/models/blood-separation-center.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { BloodSeparationCenterService } from 'src/app/core/services/blood-separation-center.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { ScanQrcodeModalComponent } from 'src/app/shared/modals/scan-qrcode-modal/scan-qrcode-modal.component';

import {
  BloodPackTransferConfirmModalComponent,
} from '../../modals/blood-pack-transfer-confirm-modal/blood-pack-transfer-confirm-modal.component';
import {
  BloodPackTransferResultModalComponent,
} from '../../modals/blood-pack-transfer-result-modal/blood-pack-transfer-result-modal.component';
import {
  BloodTestCenterBloodPackTransferTableService,
} from '../../services/blood-test-center-blood-pack-transfer-table.service';

@Component({
  selector: 'app-blood-test-center-blood-pack-manager-transfer-blood-pack',
  templateUrl: './blood-test-center-blood-pack-manager-transfer-blood-pack.component.html',
  styleUrls: ['./blood-test-center-blood-pack-manager-transfer-blood-pack.component.scss'],
  providers: [BloodTestCenterBloodPackTransferTableService]
})
export class BloodTestCenterBloodPackManagerTransferBloodPackComponent implements OnInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  modalRef: MDBModalRef;

  bloodPacks$: Observable<BloodPack[]>;
  bloodPacksInput$ = new Subject<string>();
  bloodPacksLoading = false;

  bloodSeparationsCenters$: Observable<BloodPack[]>;
  bloodSeparationsCentersInput$ = new Subject<string>();
  bloodSeparationsCentersLoading = false;
  bloodSeparationsCentersCenter: BloodSeparationCenter;

  bloodSeparationCenterForm: FormGroup;
  transferForm: FormGroup;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private authService: AuthService,
    private bloodPackService: BloodPackService,
    private bloodSeparationCenterService: BloodSeparationCenterService,
    private alertService: AlertService,
    private modalService: MDBModalService,
    private spinnerService: NgxSpinnerService,
    public bloodTestCenterBloodPackTransferTableService: BloodTestCenterBloodPackTransferTableService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const { bloodPacks } = navigation.extras.state;
      if (bloodPacks) {
        this.bloodTestCenterBloodPackTransferTableService.setDataRows(bloodPacks);
      }
    }
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.bloodPacks$ = concat(
      of([]), // default items
      this.bloodPacksInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(id => id && id.length === 24),
        tap(() => this.bloodPacksLoading = true),
        switchMap(id => this.bloodPackService.getBloodPack(id).pipe(
          map((bloodPack: BloodPack) => [bloodPack]),
          catchError(() => of([])), // empty list on error
          tap(() => this.bloodPacksLoading = false)
        ))
      )
    );

    this.bloodSeparationsCenters$ = concat(
      of([]), // default items
      this.bloodSeparationsCentersInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(name => name && name.length > 2),
        tap(() => this.bloodSeparationsCentersLoading = true),
        switchMap(id => this.bloodSeparationCenterService.searchBloodSeparationCenters(id)
          .pipe(
            map((response: any) => response.items),
            catchError(() => of([])), // empty list on error
            tap(() => this.bloodSeparationsCentersLoading = false)
          ))
      )
    );

    this.bloodSeparationCenterForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      location: [null, Validators.required]
    });

    this.transferForm = this.fb.group({
      bloodPackIds: [[]],
      bloodSeparationCenterId: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  selectBloodPack(bloodPack: BloodPack) {
    if (!bloodPack) {
      return;
    }

    if (!bloodPack.tested) {
      this.alertService.error('bloodPackManager.alert.hasNotBeenTested');
      return;
    }

    if (!bloodPack.testPassed) {
      this.alertService.error('bloodPackManager.alert.testFailed');
      return;
    }

    if (bloodPack.disposed) {
      this.alertService.error('bloodPackManager.alert.alreadyDisposed');
      return;
    }

    this.authService.getMyUserInfo()
      .subscribe((user: User) => {
        if (user.bloodTestCenter._id !== bloodPack.currentLocation) {
          this.alertService.error('bloodPackManager.alert.cannotSelectBloodPack');
          return;
        }

        this.bloodTestCenterBloodPackTransferTableService.addRawDataRow(bloodPack);
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
      .subscribe((bloodPackId: string) => this.onQrCodeScanSuccess(bloodPackId));
  }

  onQrCodeScanSuccess(bloodPackId: string) {
    this.bloodPackService.getBloodPack(bloodPackId)
      .subscribe(
        (bloodPack: BloodPack) => this.selectBloodPack(bloodPack),
        error => this.alertService.error('common.alert.qrCodeInvalid')
      );
  }

  selectBloodSeparationCenter(bloodSeparationCenter: BloodSeparationCenter) {
    if (!bloodSeparationCenter) {
      this.bloodSeparationCenterForm.reset();
      this.transferForm.reset();
      return;
    }

    this.bloodSeparationCenterForm.patchValue({
      name: bloodSeparationCenter.name,
      address: bloodSeparationCenter.address,
      phone: bloodSeparationCenter.phone,
      email: bloodSeparationCenter.email,
      location: bloodSeparationCenter.location
    });

    this.transferForm.patchValue({
      bloodSeparationCenterId: bloodSeparationCenter._id
    });
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodPackDetail(tableCellChange.row.cells._id.value);
        break;
      case TableActionType.Delete:
        this.removeBloodPackFromList(tableCellChange.row.cells._id.value);
    }
  }

  navigateToBloodPackDetail(id: string) {
  }

  removeBloodPackFromList(id: string) {
    this.bloodTestCenterBloodPackTransferTableService.removeDataRow(id);
    this.datatable.refresh();
  }

  transferBloodPacks() {
    const bloodPackIds = this.bloodTestCenterBloodPackTransferTableService.getAllRowIds();
    if (bloodPackIds.length === 0) {
      this.alertService.error('bloodPackManager.alert.noBloodPack');
      return;
    }

    this.openBloodPackTransferConfirmModal(bloodPackIds);
  }

  openBloodPackTransferConfirmModal(bloodPackIds: string[]) {
    this.modalRef = this.modalService.show(BloodPackTransferConfirmModalComponent, {
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
      .subscribe(() => this.onTransferBloodPacksConfirmed(bloodPackIds));
  }

  onTransferBloodPacksConfirmed(bloodPackIds: string[]) {
    this.spinnerService.show();
    this.transferForm.patchValue({ bloodPackIds });
    this.bloodPackService.transferBloodPacksToBloodSeparationCenter(this.transferForm.getRawValue())
      .subscribe(
        results => {
          this.openBloodPackTransferResultModal(results);
          this.spinnerService.hide();
        },
        error => this.spinnerService.hide()
      );
  }

  openBloodPackTransferResultModal({ success, errors }) {
    this.modalRef = this.modalService.show(BloodPackTransferResultModalComponent, {
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
    this.bloodSeparationCenterForm.reset();
    this.transferForm.reset();
    this.bloodTestCenterBloodPackTransferTableService.removeAllDataRows();
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

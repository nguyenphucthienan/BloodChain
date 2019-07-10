import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { BloodTestCenter } from 'src/app/core/models/blood-test-center.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { BloodTestCenterService } from 'src/app/core/services/blood-test-center.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { ScanQrcodeModalComponent } from 'src/app/shared/modals/scan-qrcode-modal/scan-qrcode-modal.component';

import {
  BloodPackTransferConfirmModalComponent,
} from '../../modals/blood-pack-transfer-confirm-modal/blood-pack-transfer-confirm-modal.component';
import { BloodCampBloodPackTransferTableService } from '../../services/blood-camp-blood-pack-transfer-table.service';

@Component({
  selector: 'app-blood-camp-blood-pack-manager-transfer-blood-pack',
  templateUrl: './blood-camp-blood-pack-manager-transfer-blood-pack.component.html',
  styleUrls: ['./blood-camp-blood-pack-manager-transfer-blood-pack.component.scss'],
  providers: [BloodCampBloodPackTransferTableService]
})
export class BloodCampBloodPackManagerTransferBloodPackComponent implements OnInit, OnDestroy {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  modalRef: MDBModalRef;

  bloodPacks$: Observable<BloodPack[]>;
  bloodPacksInput$ = new Subject<string>();
  bloodPacksLoading = false;
  bloodPack: BloodPack;

  bloodTestCenters$: Observable<BloodPack[]>;
  bloodTestCentersInput$ = new Subject<string>();
  bloodTestCentersLoading = false;
  bloodTestCenter: BloodTestCenter;

  bloodTestCenterForm: FormGroup;
  transferForm: FormGroup;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private authService: AuthService,
    private bloodPackService: BloodPackService,
    private bloodTestCenterService: BloodTestCenterService,
    private alertService: AlertService,
    private modalService: MDBModalService,
    public bloodCampBloodPackTransferTableService: BloodCampBloodPackTransferTableService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const { bloodPacks } = navigation.extras.state;
      if (bloodPacks) {
        this.bloodCampBloodPackTransferTableService.setDataRows(bloodPacks);
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

    this.bloodTestCenters$ = concat(
      of([]), // default items
      this.bloodTestCentersInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(name => name && name.length > 2),
        tap(() => this.bloodTestCentersLoading = true),
        switchMap(id => this.bloodTestCenterService.searchBloodTestCenters(id).pipe(
          map((response: any) => response.items),
          catchError(() => of([])), // empty list on error
          tap(() => this.bloodTestCentersLoading = false)
        ))
      )
    );

    this.bloodTestCenterForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      location: [null, Validators.required]
    });

    this.bloodTestCenterForm.disable();
    this.transferForm = this.fb.group({
      bloodPackIds: [[]],
      bloodTestCenterId: [{ value: '', disabled: true }, Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  selectBloodPack(bloodPack: BloodPack) {
    if (!bloodPack) {
      return;
    }

    this.authService.getMyUserInfo()
      .subscribe((user: User) => {
        if (user.bloodCamp._id !== bloodPack.currentLocation) {
          this.alertService.error('bloodPackManager.alert.cannotSelect');
          return;
        }

        this.bloodCampBloodPackTransferTableService.addRawDataRow(bloodPack);
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
      .subscribe((userId) => this.onQrCodeScanSuccess(userId));
  }

  onQrCodeScanSuccess(bloodPackId: string) {
    this.bloodPackService.getBloodPack(bloodPackId)
      .subscribe(
        (bloodPack: BloodPack) => this.selectBloodPack(bloodPack),
        error => this.alertService.error('common.alert.qrCodeInvalid')
      );
  }

  selectBloodTestCenter(bloodTestCenter: BloodTestCenter) {
    this.bloodTestCenterForm.patchValue({
      name: bloodTestCenter.name,
      address: bloodTestCenter.address,
      phone: bloodTestCenter.phone,
      email: bloodTestCenter.email,
      location: bloodTestCenter.location
    });

    this.transferForm.patchValue({
      bloodTestCenterId: bloodTestCenter._id
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
    this.bloodCampBloodPackTransferTableService.removeDataRow(id);
    this.datatable.refresh();
  }

  transferBloodPacks() {
    const bloodPackIds = this.bloodCampBloodPackTransferTableService.getAllRowIds();
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
    this.transferForm.patchValue({ bloodPackIds });
    this.bloodPackService.transferBloodPacksToBloodTestCenter(this.transferForm.getRawValue())
      .subscribe(() => this.alertService.success('common.alert.transferSuccess'));
  }

  resetForm() {
    this.bloodTestCenterForm.reset();
    this.transferForm.reset();
    this.bloodCampBloodPackTransferTableService.removeAllDataRows();
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

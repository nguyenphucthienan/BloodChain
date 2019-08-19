import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { BloodType } from 'src/app/core/constant/blood-type';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { BloodProductType } from 'src/app/core/models/blood-product-type.interface';
import { BloodProduct } from 'src/app/core/models/blood-product.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { BloodProductTypeService } from 'src/app/core/services/blood-product-type.service';
import { BloodProductService } from 'src/app/core/services/blood-product.service';
import { UserService } from 'src/app/core/services/user.service';
import { ScanQrcodeModalComponent } from 'src/app/shared/modals/scan-qrcode-modal/scan-qrcode-modal.component';

import {
  BloodPackUpdateSeparationResultResultModalComponent,
} from '../../modals/blood-pack-update-separation-result-result-modal/blood-pack-update-separation-result-result-modal.component';

@Component({
  selector: 'app-blood-separation-center-blood-pack-manager-update-result',
  templateUrl: './blood-separation-center-blood-pack-manager-update-result.component.html',
  styleUrls: ['./blood-separation-center-blood-pack-manager-update-result.component.scss'],
  providers: [DatePipe]
})
export class BloodSeparationCenterBloodPackManagerUpdateResultComponent implements OnInit, OnDestroy {

  readonly bloodTypes = [
    { label: BloodType.A_POSITIVE, value: BloodType.A_POSITIVE },
    { label: BloodType.A_NEGATIVE, value: BloodType.AB_NEGATIVE },
    { label: BloodType.B_POSITIVE, value: BloodType.B_POSITIVE },
    { label: BloodType.B_NEGATIVE, value: BloodType.B_NEGATIVE },
    { label: BloodType.O_POSITIVE, value: BloodType.O_POSITIVE },
    { label: BloodType.O_NEGATIVE, value: BloodType.O_NEGATIVE },
    { label: BloodType.AB_POSITIVE, value: BloodType.AB_POSITIVE },
    { label: BloodType.AB_NEGATIVE, value: BloodType.AB_NEGATIVE },
  ];

  bloodPacks$: Observable<BloodPack[]>;
  bloodPacksInput$ = new Subject<string>();
  bloodPacksLoading = false;
  bloodPack: BloodPack;

  bloodProductTypes: BloodProductType[] = [];

  userForm: FormGroup;
  bloodPackForm: FormGroup;
  updateForm: FormGroup;

  modalRef: MDBModalRef;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private bloodProductTypeService: BloodProductTypeService,
    private bloodPackService: BloodPackService,
    private bloodProductService: BloodProductService,
    private alertService: AlertService,
    private modalService: MDBModalService,
    private spinnerService: NgxSpinnerService,
    private datePipe: DatePipe
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const { bloodPackId } = navigation.extras.state;
      if (bloodPackId) {
        this.bloodPackService.getBloodPack(bloodPackId)
          .subscribe((bloodPack: BloodPack) => this.selectBloodPack(bloodPack));
      }
    }
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.initDataFields();
    this.initForms();
  }

  private initDataFields() {
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

    this.bloodProductTypeService.getAllBloodProductTypes()
      .subscribe((bloodProductTypes: BloodProductType[]) => this.bloodProductTypes = bloodProductTypes);
  }

  private initForms() {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
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

    this.bloodPackForm = this.fb.group({
      id: ['', Validators.required],
      volume: [null, [Validators.required, Validators.min(1)]],
      time: [null, Validators.required],
      bloodCamp: ['', Validators.required],
      bloodTestCenter: ['', Validators.required],
      tested: [null, Validators.required],
      testPassed: [null, Validators.required],
      separated: [null, Validators.required]
    });

    this.updateForm = this.fb.group({
      separationResults: this.fb.array([this.createSeparationField()], Validators.required),
      separationDescription: ['', Validators.required]
    }, { validator: [this.separationResultRepeatedValidator] });
  }

  selectBloodPack(bloodPack: BloodPack) {
    if (!bloodPack) {
      return;
    }

    this.bloodPack = bloodPack;
    this.authService.getMyUserInfo().subscribe((user: User) => {
      if (user.bloodSeparationCenter._id !== bloodPack.currentLocation) {
        this.alertService.error('bloodPackManager.alert.cannotSelectBloodPack');
        return;
      }

      this.userService.getUser(bloodPack.donor._id).subscribe((donor: User) => {
        this.userForm.patchValue({
          id: donor._id,
          username: donor.username,
          firstName: donor.firstName,
          lastName: donor.lastName,
          gender: donor.gender,
          birthdate: donor.birthdate,
          email: donor.email,
          phone: donor.phone,
          address: donor.address,
          location: donor.location
        });

        this.bloodPackForm.patchValue({
          id: bloodPack._id,
          volume: bloodPack.volume,
          time: this.datePipe.transform(new Date(bloodPack.createdAt), 'medium'),
          bloodCamp: bloodPack.bloodCamp.name,
          bloodTestCenter: bloodPack.bloodTestCenter.name,
          tested: bloodPack.tested,
          testPassed: bloodPack.testPassed,
          separated: bloodPack.separated
        });

        if (bloodPack.separated) {
          this.bloodProductService.getBloodProducts(undefined, undefined, {
            bloodPack: bloodPack._id
          }).subscribe((response: any) => {
            const bloodProducts = response.items;

            let numOfFields = 1;
            if (bloodProducts && bloodProducts.length > 0) {
              numOfFields = bloodProducts.length;
            }

            this.resetSeparationResultFormArray();
            for (let i = 1; i < numOfFields; i++) {
              this.addSeparationField();
            }

            this.updateForm.patchValue({
              separationResults: this.buildSeparationResults(bloodProducts),
              separationDescription: bloodPack.separationDescription
            });
          });
        }
      });
    });
  }

  private buildSeparationResults(bloodProducts: BloodProduct[]) {
    return bloodProducts.map(bloodProduct => ({
      _id: bloodProduct._id,
      bloodProductType: bloodProduct.bloodProductType._id,
      volume: bloodProduct.volume,
      expirationDate: bloodProduct.expirationDate
    }));
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

  navigateToBloodPackDetail(id: string) {
  }

  resetForms() {
    this.userForm.reset();
    this.bloodPackForm.reset();
    this.updateForm.reset();
    this.resetSeparationResultFormArray();
  }

  private resetSeparationResultFormArray() {
    while (this.separationResultFormArray.length > 1) {
      this.separationResultFormArray.removeAt(1);
    }
  }

  updateSeparationResults() {
    if (!this.bloodPack) {
      this.alertService.error('bloodPackManager.alert.noBloodPack');
      return;
    }

    this.spinnerService.show();
    this.bloodPackService.updateBloodPackSeparationResults(this.bloodPack._id, this.updateForm.value)
      .subscribe(
        (bloodPack: BloodPack) => {
          this.spinnerService.hide();
          this.alertService.success('bloodPackManager.alert.updateSeparationResultSuccess');
          this.openBloodPackUpdateResultSuccessModal(bloodPack);
        },
        error => {
          this.spinnerService.hide();
          this.alertService.error('bloodPackManager.alert.updateSeparationResultFailed');
        });
  }

  openBloodPackUpdateResultSuccessModal(bloodPack: BloodPack) {
    this.modalRef = this.modalService.show(BloodPackUpdateSeparationResultResultModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-xl modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        bloodPack
      }
    });

    this.modalRef.content.closed
      .subscribe(() => this.onBloodPackAddSuccessModalClosed());
  }

  onBloodPackAddSuccessModalClosed() {
    this.resetForms();
  }

  get separationResultFormArray() {
    return this.updateForm.get('separationResults') as FormArray;
  }

  createSeparationField() {
    return this.fb.group({
      _id: [null],
      bloodProductType: [null, Validators.required],
      volume: [null, [Validators.required, Validators.min(1)]],
      expirationDate: [null, Validators.required]
    });
  }

  createSeparationFieldArray(quantity: number = 1) {
    if (quantity < 1) {
      return;
    }

    const separationFields = this.fb.array([]);
    for (let i = 0; i < quantity; i++) {
      separationFields.push(this.createSeparationField());
    }

    return separationFields;
  }

  removeSeparationField(index: number) {
    this.separationResultFormArray.removeAt(index);
  }

  addSeparationField() {
    this.separationResultFormArray.push(this.createSeparationField());
  }

  openDatePicker(picker: MatDatepicker<Date>) {
    picker.open();
  }

  private separationResultRepeatedValidator(g: FormGroup) {
    const separationResults = g.get('separationResults') as FormArray;
    const bloodProductTypes = {};

    if (separationResults) {
      for (const separationResult of separationResults.controls) {
        const bloodProductType = separationResult.get('bloodProductType').value;
        if (bloodProductType) {
          if (!bloodProductTypes[bloodProductType]) {
            bloodProductTypes[bloodProductType] = true;
          } else {
            return { bloodProductTypeRepeated: true };
          }
        }
      }
    }

    return null;
  }

  separationResultFormArrayControlHasError(index: number, controlName: string, errorName: string): boolean {
    return this.separationResultFormArray.at(index).get(controlName).touched
      && this.separationResultFormArray.at(index).get(controlName).hasError(errorName);
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.updateForm.get(controlName).touched
      && this.updateForm.get(controlName).hasError(errorName);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}

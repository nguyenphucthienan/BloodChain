import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { BloodType } from 'src/app/core/constant/blood-type';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { TestType } from 'src/app/core/models/test-type.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { TestTypeService } from 'src/app/core/services/test-type.service';
import { UserService } from 'src/app/core/services/user.service';
import { ScanQrcodeModalComponent } from 'src/app/shared/modals/scan-qrcode-modal/scan-qrcode-modal.component';

@Component({
  selector: 'app-blood-test-center-blood-pack-manager-update-result',
  templateUrl: './blood-test-center-blood-pack-manager-update-result.component.html',
  styleUrls: ['./blood-test-center-blood-pack-manager-update-result.component.scss'],
  providers: [DatePipe]
})
export class BloodTestCenterBloodPackManagerUpdateResultComponent implements OnInit, OnDestroy {

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

  readonly resultTranslations = [
    { translation: 'common.result.passed', value: true },
    { translation: 'common.result.failed', value: false }
  ];

  bloodPacks$: Observable<BloodPack[]>;
  bloodPacksInput$ = new Subject<string>();
  bloodPacksLoading = false;
  bloodPack: BloodPack;

  testTypes: TestType[] = [];
  results: any[] = [];

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
    private testTypeService: TestTypeService,
    private bloodPackService: BloodPackService,
    private alertService: AlertService,
    private translate: TranslateService,
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

    this.testTypeService.getAllTestTypes()
      .subscribe((testTypes: TestType[]) => this.testTypes = testTypes);

    this.translate.get(this.resultTranslations.map(resultTranslation => resultTranslation.translation))
      .subscribe(translations => this.results = this.resultTranslations.map(resultTranslation => ({
        label: translations[resultTranslation.translation],
        value: resultTranslation.value
      })));
  }

  private initForms() {
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

    this.bloodPackForm = this.fb.group({
      id: ['', Validators.required],
      volume: [null, [Validators.required, Validators.min(1)]],
      time: [null, Validators.required],
      bloodCamp: ['', Validators.required],
      bloodTestCenter: ['', Validators.required],
      tested: [null, Validators.required],
      testPassed: [null, Validators.required],
    });

    this.updateForm = this.fb.group({
      testResults: this.fb.array([this.createTestField()], Validators.required),
      bloodType: [null, Validators.required],
      testDescription: ['', Validators.required]
    }, { validator: [this.testResultRepeatedValidator] });

    this.userForm.disable();
    this.bloodPackForm.disable();
  }

  selectBloodPack(bloodPack: BloodPack) {
    if (!bloodPack) {
      return;
    }

    this.bloodPack = bloodPack;
    this.authService.getMyUserInfo().subscribe((user: User) => {
      if (user.bloodTestCenter._id !== bloodPack.currentLocation) {
        this.alertService.error('bloodPackManager.alert.cannotSelect');
        return;
      }

      this.userService.getUser(bloodPack.donor._id).subscribe((donor: User) => {
        this.userForm.patchValue({
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
          testPassed: bloodPack.testPassed
        });

        if (bloodPack.tested) {
          let numOfFields = 1;
          if (bloodPack.testResults && bloodPack.testResults.length > 0) {
            numOfFields = bloodPack.testResults.length;
          }

          this.resetTestResultFormArray();
          for (let i = 1; i < numOfFields; i++) {
            this.addTestField();
          }

          this.updateForm.patchValue({
            testResults: bloodPack.testResults,
            bloodType: bloodPack.bloodType,
            testDescription: bloodPack.testDescription
          });
        }
      });
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

  navigateToBloodPackDetail(id: string) {
  }

  resetForms() {
    this.userForm.reset();
    this.bloodPackForm.reset();
    this.updateForm.reset();
    this.resetTestResultFormArray();
  }

  private resetTestResultFormArray() {
    while (this.testResultFormArray.length > 1) {
      this.testResultFormArray.removeAt(1);
    }
  }

  updateTestResults() {
    if (!this.bloodPack) {
      this.alertService.error('bloodPackManager.alert.noBloodPack');
      return;
    }

    this.spinnerService.show();
    this.bloodPackService.updateBloodPackTestResults(this.bloodPack._id, this.updateForm.value)
      .subscribe(
        (bloodPack: BloodPack) => {
          this.spinnerService.hide();
          this.alertService.success('bloodPackManager.alert.updateTestResultSuccess');
          this.resetForms();
        },
        error => {
          this.spinnerService.hide();
          this.alertService.error('bloodPackManager.alert.updateTestResultFailed');
        });
  }

  get testResultFormArray() {
    return this.updateForm.get('testResults') as FormArray;
  }

  createTestField() {
    return this.fb.group({
      testType: [null, Validators.required],
      passed: [null, Validators.required]
    });
  }

  createTestFieldArray(quantity: number = 1) {
    if (quantity < 1) {
      return;
    }

    const testFields = this.fb.array([]);
    for (let i = 0; i < quantity; i++) {
      testFields.push(this.createTestField());
    }

    return testFields;
  }

  removeTestField(index: number) {
    this.testResultFormArray.removeAt(index);
  }

  addTestField() {
    this.testResultFormArray.push(this.createTestField());
  }

  private testResultRepeatedValidator(g: FormGroup) {
    const testResults = g.get('testResults') as FormArray;
    const testTypes = {};

    if (testResults) {
      for (const testResult of testResults.controls) {
        const testType = testResult.get('testType').value;
        if (testType) {
          if (!testTypes[testType]) {
            testTypes[testType] = true;
          } else {
            return { testTypeRepeated: true };
          }
        }
      }
    }

    return null;
  }

  testResultFormArrayControlHasError(index: number, controlName: string, errorName: string): boolean {
    return this.testResultFormArray.at(index).get(controlName).touched
      && this.testResultFormArray.at(index).get(controlName).hasError(errorName);
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.updateForm.get(controlName).touched
      && this.updateForm.get(controlName).hasError(errorName);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}

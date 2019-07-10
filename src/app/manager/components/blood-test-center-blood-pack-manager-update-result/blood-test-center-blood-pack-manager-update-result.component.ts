import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { UserService } from 'src/app/core/services/user.service';
import { ScanQrcodeModalComponent } from 'src/app/shared/modals/scan-qrcode-modal/scan-qrcode-modal.component';

@Component({
  selector: 'app-blood-test-center-blood-pack-manager-update-result',
  templateUrl: './blood-test-center-blood-pack-manager-update-result.component.html',
  styleUrls: ['./blood-test-center-blood-pack-manager-update-result.component.scss'],
  providers: [DatePipe]
})
export class BloodTestCenterBloodPackManagerUpdateResultComponent implements OnInit, OnDestroy {

  modalRef: MDBModalRef;

  bloodPacks$: Observable<BloodPack[]>;
  bloodPacksInput$ = new Subject<string>();
  bloodPacksLoading = false;

  userForm: FormGroup;
  bloodPackForm: FormGroup;
  updateForm: FormGroup;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private bloodPackService: BloodPackService,
    private alertService: AlertService,
    private modalService: MDBModalService,
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
      bloodTestCenter: ['', Validators.required]
    });

    this.userForm.disable();
    this.bloodPackForm.disable();
  }

  selectBloodPack(bloodPack: BloodPack) {
    if (!bloodPack) {
      return;
    }

    this.authService.getMyUserInfo()
      .subscribe((user: User) => {
        if (user.bloodTestCenter._id !== bloodPack.currentLocation) {
          this.alertService.error('bloodPackManager.alert.cannotSelect');
          return;
        }

        this.userService.getUser(bloodPack.donor._id)
          .subscribe((donor: User) => {
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
              bloodTestCenter: bloodPack.bloodTestCenter.name
            });
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
      .subscribe((userId: string) => this.onQrCodeScanSuccess(userId));
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

  resetForm() {
    this.userForm.reset();
    this.bloodPackForm.reset();
    this.updateForm.reset();
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.updateForm.get(controlName).touched
      && this.updateForm.get(controlName).hasError(errorName);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}

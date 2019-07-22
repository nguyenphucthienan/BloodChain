import { Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxSpinnerService } from 'ngx-spinner';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { UserService } from 'src/app/core/services/user.service';
import { ScanQrcodeModalComponent } from 'src/app/shared/modals/scan-qrcode-modal/scan-qrcode-modal.component';

import {
  BloodPackAddSuccessModalComponent,
} from '../../modals/blood-pack-add-success-modal/blood-pack-add-success-modal.component';
import {
  ManagerBloodPackManagerDonationHistoryComponent,
} from '../manager-blood-pack-manager-donation-history/manager-blood-pack-manager-donation-history.component';

@Component({
  selector: 'app-blood-camp-blood-pack-manager-add-blood-pack',
  templateUrl: './blood-camp-blood-pack-manager-add-blood-pack.component.html',
  styleUrls: ['./blood-camp-blood-pack-manager-add-blood-pack.component.scss']
})
export class BloodCampBloodPackManagerAddBloodPackComponent implements OnInit, OnDestroy {

  @ViewChild(ManagerBloodPackManagerDonationHistoryComponent)
  donationHistory: ManagerBloodPackManagerDonationHistoryComponent;

  @Output() bloodPackAdded = new EventEmitter();

  addForm: FormGroup;
  userForm: FormGroup;
  modalRef: MDBModalRef;

  users$: Observable<User[]>;
  usersInput$ = new Subject<string>();
  usersLoading = false;
  user: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private bloodPackService: BloodPackService,
    private renderer: Renderer2,
    private alertService: AlertService,
    private modalService: MDBModalService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.users$ = concat(
      of([]), // default items
      this.usersInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(term => term && term.length > 2),
        tap(() => this.usersLoading = true),
        switchMap(term => this.userService.searchUsers(term).pipe(
          map((response: any) => response.items),
          catchError(() => of([])), // empty list on error
          tap(() => this.usersLoading = false)
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

    this.userForm.disable();
    this.addForm = this.fb.group({
      donor: [{ value: null, disabled: true }, Validators.required],
      volume: [null, [Validators.required, Validators.min(1)]]
    });
  }

  selectUser(user: User) {
    if (!user) {
      return;
    }

    this.userForm.patchValue({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      birthdate: user.birthdate,
      email: user.email,
      phone: user.phone,
      address: user.address,
      location: user.location
    });

    this.addForm.patchValue({
      donor: user._id
    });

    this.donationHistory.changeUser(user);
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

  onQrCodeScanSuccess(userId: string) {
    this.userService.getUser(userId)
      .subscribe(
        (user: User) => this.selectUser(user),
        error => this.alertService.error('common.alert.qrCodeInvalid')
      );
  }

  addBloodPack() {
    this.spinnerService.show();
    this.bloodPackService.createBloodPack(this.addForm.getRawValue())
      .subscribe(
        (bloodPack: BloodPack) => {
          this.spinnerService.hide();
          this.bloodPackAdded.emit(bloodPack);
          this.alertService.success('bloodPackManager.alert.addSuccess');
          this.openBloodPackAddSuccessModal(bloodPack);
        },
        error => {
          this.spinnerService.hide();
          this.alertService.error('bloodPackManager.alert.addFailed');
        }
      );
  }

  openBloodPackAddSuccessModal(bloodPack: BloodPack) {
    this.modalRef = this.modalService.show(BloodPackAddSuccessModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
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
    this.donationHistory.datatable.refresh();
  }

  resetForm() {
    this.userForm.reset();
    this.addForm.reset();
    this.donationHistory.changeUser(null);
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.addForm.get(controlName).touched
      && this.addForm.get(controlName).hasError(errorName);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}

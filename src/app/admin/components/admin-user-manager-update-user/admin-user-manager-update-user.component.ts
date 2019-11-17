import { Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Point } from 'src/app/core/models/point.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

import {
  UserResetPasswordConfirmModalComponent,
} from '../../modals/user-reset-password-confirm-modal/user-reset-password-confirm-modal.component';
import { UserUpdateSuccessModalComponent } from '../../modals/user-update-success-modal/user-update-success-modal.component';

@Component({
  selector: 'app-admin-user-manager-update-user',
  templateUrl: './admin-user-manager-update-user.component.html',
  styleUrls: ['./admin-user-manager-update-user.component.scss']
})
export class AdminUserManagerUpdateUserComponent implements OnInit, OnDestroy {

  readonly genders = [
    { translation: 'common.gender.male', value: 'Male' },
    { translation: 'common.gender.female', value: 'Female' },
    { translation: 'common.gender.other', value: 'Other' }
  ];

  @Output() userUpdated = new EventEmitter();

  genders$: Observable<any>;
  user: User;
  point: Point;
  updateForm: FormGroup;
  modalRef: MDBModalRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private renderer: Renderer2,
    private alertService: AlertService,
    private translate: TranslateService,
    private modalService: MDBModalService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.genders$ = this.translate.get(this.genders.map(gender => gender.translation))
      .pipe(
        map(result => this.genders.map(gender => ({
          label: result[gender.translation],
          value: gender.value
        })))
      );

    this.updateForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ], this.usernameExistsValidator.bind(this)],
      idCardNumber: ['', [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern('^[0-9]*$')
      ], this.idCardNumberExistsValidator.bind(this)],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ], this.emailExistsValidator.bind(this)],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      gender: [this.genders[0].value, Validators.required],
      birthdate: [moment('1990-01-01').startOf('day'), Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      location: [null, Validators.required]
    });

    this.route.data.subscribe((data: any) => {
      if (data.user) {
        this.changeUser(data.user);
      }
    });
  }

  updateUser() {
    this.userService.updateUser(this.user._id, this.updateForm.value)
      .subscribe(
        (user: User) => {
          this.changeUser(user);
          this.userUpdated.emit(user);
          this.alertService.success('userManager.alert.updateSuccess');
          this.openUserUpdateSuccessModal(user);
        },
        error => this.alertService.error('userManager.alert.updateFailed')
      );
  }

  openUserUpdateSuccessModal(user: User) {
    this.modalRef = this.modalService.show(UserUpdateSuccessModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
      containerClass: 'top',
      animated: true,
      data: {
        user
      }
    });

    this.modalRef.content.closed
      .subscribe(() => this.onUserUpdateSuccessModalClosed());
  }

  onUserUpdateSuccessModalClosed() {
  }

  openUserResetPasswordConfirmModal() {
    this.modalRef = this.modalService.show(UserResetPasswordConfirmModalComponent, {
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

    this.modalRef.content.passwordResetted
      .subscribe((user: User) => this.onUserPasswordResetted(user));
  }

  onUserPasswordResetted(user: User) {
    console.log('user', user);
  }

  cancel() {
    this.router.navigate(['/admin', 'users']);
  }

  openDatePicker(picker: MatDatepicker<Date>) {
    picker.open();
  }

  datePickerFilter(momentDate: any): boolean {
    return momentDate.isSameOrBefore(moment().startOf('day'));
  }

  private changeUser(user: User) {
    this.user = user;

    if (this.user.location) {
      this.point = this.user.location;
      const { 0: lng, 1: lat } = this.user.location.coordinates;
      this.changeLocation({ lng, lat });
    }

    this.updateForm.patchValue({
      username: this.user.username,
      idCardNumber: this.user.idCardNumber,
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      gender: this.user.gender,
      birthdate: this.user.birthdate,
      phone: this.user.phone,
      address: this.user.address
    });
  }

  changeLocation(location: any) {
    this.updateForm.patchValue({
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      }
    });
  }

  private usernameExistsValidator(c: FormControl) {
    if (c.value === this.user.username) {
      return of(null);
    }

    return this.authService.checkUsernameExists(c.value)
      .pipe(
        debounceTime(250),
        map((result: any) => {
          if (result.exists) {
            return { exists: true };
          }
          return null;
        })
      );
  }

  private idCardNumberExistsValidator(c: FormControl) {
    if (c.value === this.user.idCardNumber) {
      return of(null);
    }

    return this.authService.checkIdCardNumberExists(c.value)
      .pipe(
        debounceTime(250),
        map((result: any) => {
          if (result.exists) {
            return { exists: true };
          }
          return null;
        })
      );
  }

  private emailExistsValidator(c: FormControl) {
    if (c.value === this.user.email) {
      return of(null);
    }

    return this.authService.checkEmailExists(c.value)
      .pipe(
        debounceTime(250),
        map((result: any) => {
          if (result.exists) {
            return { exists: true };
          }
          return null;
        })
      );
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.updateForm.get(controlName).touched
      && this.updateForm.get(controlName).hasError(errorName);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}

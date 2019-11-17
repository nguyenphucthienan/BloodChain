import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Point } from 'src/app/core/models/point.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

import {
  ProfileUploadPhotoModalComponent,
} from '../../modals/profile-upload-photo-modal/profile-upload-photo-modal.component';

@Component({
  selector: 'app-profile-edit-info',
  templateUrl: './profile-edit-info.component.html',
  styleUrls: ['./profile-edit-info.component.scss']
})
export class ProfileEditInfoComponent implements OnInit, OnDestroy {

  readonly defaultPhotoUrl = environment.photoUrl.defaultUser;

  private readonly genders = [
    { translation: 'common.gender.male', value: 'Male' },
    { translation: 'common.gender.female', value: 'Female' },
    { translation: 'common.gender.other', value: 'Other' }
  ];

  genders$: Observable<any>;
  user: User;
  point: Point;
  updateInfoForm: FormGroup;
  changePasswordForm: FormGroup;
  modalRef: MDBModalRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private modalService: MDBModalService,
    private authService: AuthService,
    private alertService: AlertService,
    private translate: TranslateService
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

    this.updateInfoForm = this.fb.group({
      username: [{
        value: '',
        disabled: true
      }, [Validators.required]],
      idCardNumber: [{
        value: '',
        disabled: true
      }, [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ], this.emailExistsValidator.bind(this)],
      firstName: [{
        value: '',
        disabled: true
      }, [Validators.required, Validators.maxLength(50)]],
      lastName: [{
        value: '',
        disabled: true
      }, [Validators.required, Validators.maxLength(50)]],
      gender: [{
        value: this.genders[0].value,
        disabled: true
      }, Validators.required],
      birthdate: [{
        value: moment('1990-01-01').startOf('day'),
        disabled: true
      }, Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      location: [null, Validators.required]
    });

    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      confirmPassword: ['', Validators.required]
    }, { validator: [this.passwordMatchValidator] });

    this.getUserInfo();
  }

  openUploadPhotoModal() {
    this.modalRef = this.modalService.show(ProfileUploadPhotoModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      containerClass: 'top',
      animated: true
    });

    this.modalRef.content.uploadSucceed
      .subscribe((user: User) => this.onPhotoUploaded());
  }

  onPhotoUploaded() {
    this.getUserInfo();
    this.modalRef.hide();
  }

  private getUserInfo() {
    this.authService.getMyUserInfo()
      .subscribe((user: User) => {
        this.user = user;

        if (this.user.location) {
          this.point = this.user.location;
          const { 0: lng, 1: lat } = this.user.location.coordinates;
          this.changeLocation({ lng, lat });
        }

        this.updateInfoForm.patchValue({
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
      });
  }

  updateInfo() {
    this.authService.updateUserInfo(this.updateInfoForm.getRawValue())
      .subscribe(
        () => {
          this.getUserInfo();
          this.alertService.success('Update user info successfully');
        },
        error => this.alertService.error('Update user info failed')
      );
  }

  changePassword() {
    this.authService.changeUserPassword(this.changePasswordForm.value)
      .subscribe(
        () => {
          this.authService.logout();
          this.router.navigate(['/login']);
          this.alertService.success('Change password successfully. Please login again');
        },
        error => this.alertService.error('Change password failed')
      );
  }

  openDatePicker(picker: MatDatepicker<Date>) {
    picker.open();
  }

  datePickerFilter(momentDate: any): boolean {
    return momentDate.isSameOrBefore(moment().startOf('day'));
  }

  changeLocation(location: any) {
    this.updateInfoForm.patchValue({
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      }
    });
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

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { passwordMatch: true };
  }

  updateInfoFormControlHasError(controlName: string, errorName: string): boolean {
    return this.updateInfoForm.get(controlName).touched
      && this.updateInfoForm.get(controlName).hasError(errorName);
  }

  changePasswordFormControlHasError(controlName: string, errorName: string): boolean {
    return this.changePasswordForm.get(controlName).touched
      && this.changePasswordForm.get(controlName).hasError(errorName);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-edit-info',
  templateUrl: './profile-edit-info.component.html',
  styleUrls: ['./profile-edit-info.component.scss']
})
export class ProfileEditInfoComponent implements OnInit {

  readonly defaultPhotoUrl = environment.photoUrl.defaultUser;

  private readonly genders = [
    { translation: 'common.gender.male', value: 'Male' },
    { translation: 'common.gender.female', value: 'Female' },
    { translation: 'common.gender.other', value: 'Other' }
  ];

  genders$: Observable<any>;
  user: User;
  updateInfoForm: FormGroup;
  changePasswordForm: FormGroup;
  modalRef: MDBModalRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: MDBModalService,
    private authService: AuthService,
    private alertService: AlertService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.genders$ = this.translate.get(this.genders.map(gender => gender.translation))
      .pipe(
        map(result => this.genders.map(gender => ({
          label: result[gender.translation],
          value: gender.value
        })))
      );

    this.updateInfoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      gender: [this.genders[0].value, Validators.required],
      birthdate: [moment('1990-01-01').startOf('day'), Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      confirmPassword: ['', Validators.required]
    }, { validator: [this.passwordMatchValidator] });

    this.authService.getMyUserInfo()
      .subscribe((user: User) => {
        this.user = user;
        this.updateInfoForm.patchValue({
          email: this.user.email,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          gender: this.user.gender,
          birthdate: this.user.birthdate,
          phone: this.user.phone,
          address: this.user.address,
        });
      });
  }

  openUploadPhotoModal() {
  }

  updateInfo() {
    this.authService.updateUserInfo(this.updateInfoForm.value)
      .subscribe(
        () => this.alertService.success('Update user info successfully'),
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

}

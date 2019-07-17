import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  readonly genders = [
    { translation: 'common.gender.male', value: 'Male' },
    { translation: 'common.gender.female', value: 'Female' },
    { translation: 'common.gender.other', value: 'Other' }
  ];

  genders$: Observable<any>;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
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

    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ], this.usernameExistsValidator.bind(this)],
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
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: [this.passwordMatchValidator] });
  }

  register() {
    this.authService.register(this.registerForm.value)
      .subscribe(
        () => {
          this.alertService.success('register.alert.registerSuccess');
          this.authService.login({
            username: this.registerForm.controls.username.value,
            password: this.registerForm.controls.password.value
          }).subscribe(() => {
            this.router.navigate(['/']);
          });
        },
        error => this.alertService.error('register.alert.registerFailed')
      );
  }

  openDatePicker(picker: MatDatepicker<Date>) {
    picker.open();
  }

  datePickerFilter(momentDate: any): boolean {
    return momentDate.isSameOrBefore(moment().startOf('day'));
  }

  private usernameExistsValidator(c: FormControl) {
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

  private emailExistsValidator(c: FormControl) {
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

  controlHasError(controlName: string, errorName: string): boolean {
    return this.registerForm.get(controlName).touched
      && this.registerForm.get(controlName).hasError(errorName);
  }

}

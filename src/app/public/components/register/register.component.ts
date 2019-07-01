import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      confirmPassword: ['', Validators.required]
    }, { validator: [this.passwordMatchValidator] });
  }

  register() {
    this.authService.register(this.registerForm.value)
      .subscribe(
        () => {
          this.translate.get('register.alert.registerSuccess')
            .pipe(
              map(registerSuccess => {
                this.alertService.success(registerSuccess);
                return this.authService.login({
                  username: this.registerForm.controls.username.value,
                  password: this.registerForm.controls.password.value
                });
              })
            ).subscribe(() => {
              this.router.navigate(['/']);
            });
        },
        error => {
          this.translate.get('register.alert.registerFailed')
            .subscribe(registerFailed => this.alertService.error(registerFailed));
        }
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

import { Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { TranslateService } from '@ngx-translate/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

import { UserAddSuccessModalComponent } from '../../modals/user-add-success-modal/user-add-success-modal.component';

@Component({
  selector: 'app-manager-user-manager-add-user',
  templateUrl: './manager-user-manager-add-user.component.html',
  styleUrls: ['./manager-user-manager-add-user.component.scss']
})
export class ManagerUserManagerAddUserComponent implements OnInit, OnDestroy {

  readonly genders = [
    { translation: 'common.gender.male', value: 'Male' },
    { translation: 'common.gender.female', value: 'Female' },
    { translation: 'common.gender.other', value: 'Other' }
  ];

  @Output() userAdded = new EventEmitter();

  genders$: Observable<any>;
  addForm: FormGroup;
  modalRef: MDBModalRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private renderer: Renderer2,
    private alertService: AlertService,
    private translate: TranslateService,
    private modalService: MDBModalService,
    private spinnerService: NgxSpinnerService
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

    this.addForm = this.fb.group({
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
      location: [null, Validators.required]
    });
  }

  addUser() {
    this.spinnerService.show();
    this.userService.createUser(this.addForm.value)
      .subscribe(
        (user: User) => {
          this.spinnerService.hide();

          this.userAdded.emit(user);
          this.alertService.success('userManager.alert.addSuccess');
          this.openUserAddSuccessModal(user);
        },
        error => {
          this.spinnerService.hide();
          this.alertService.error('userManager.alert.addFailed');
        }
      );
  }

  openUserAddSuccessModal(user: User) {
    this.modalRef = this.modalService.show(UserAddSuccessModalComponent, {
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
      .subscribe(() => this.onUserAddSuccessModalClosed());
  }

  onUserAddSuccessModalClosed() {
    this.resetForm();
  }

  resetForm() {
    this.addForm.reset();
    this.addForm.patchValue({
      gender: this.genders[0].value,
      birthdate: moment('1990-01-01').startOf('day')
    });
  }

  openDatePicker(picker: MatDatepicker<Date>) {
    picker.open();
  }

  datePickerFilter(momentDate: any): boolean {
    return momentDate.isSameOrBefore(moment().startOf('day'));
  }

  onLocationChanged(location: any) {
    this.addForm.patchValue({
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      }
    });
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

  controlHasError(controlName: string, errorName: string): boolean {
    return this.addForm.get(controlName).touched
      && this.addForm.get(controlName).hasError(errorName);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}

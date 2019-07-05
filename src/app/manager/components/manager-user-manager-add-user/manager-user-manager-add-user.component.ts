import { Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserService } from 'src/app/core/services/user.service';

import { UserAddSuccessModalComponent } from '../../modals/user-add-success-modal/user-add-success-modal.component';

@Component({
  selector: 'app-manager-user-manager-add-user',
  templateUrl: './manager-user-manager-add-user.component.html',
  styleUrls: ['./manager-user-manager-add-user.component.scss']
})
export class ManagerUserManagerAddUserComponent implements OnInit, OnDestroy {

  @Output() userAdded = new EventEmitter();

  addForm: FormGroup;
  modalRef: MDBModalRef;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private renderer: Renderer2,
    private alertService: AlertService,
    private modalService: MDBModalService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.addForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      phone: [''],
      address: ['', Validators.required],
      location: [null, Validators.required]
    });
  }

  addUser() {
    this.userService.createUser(this.addForm.value)
      .subscribe(
        (user: User) => {
          this.userAdded.emit(user);
          this.alertService.success('userManager.alert.addSuccess');
          this.openUserAddSuccessModal(user);
        },
        error => this.alertService.error('userManager.alert.addFailed')
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
    this.addForm.reset();
  }

  onLocationChanged(location: any) {
    this.addForm.patchValue({
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      }
    });
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.addForm.get(controlName).touched
      && this.addForm.get(controlName).hasError(errorName);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}

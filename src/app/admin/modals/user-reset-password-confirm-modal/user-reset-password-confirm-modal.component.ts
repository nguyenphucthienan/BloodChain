import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-reset-password-confirm-modal',
  templateUrl: './user-reset-password-confirm-modal.component.html',
  styleUrls: ['./user-reset-password-confirm-modal.component.scss']
})
export class UserResetPasswordConfirmModalComponent implements OnInit {

  @Input() user: User;

  @Output() passwordResetted = new EventEmitter();

  username: string;

  constructor(
    public modalRef: MDBModalRef,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.username = this.user.username;
  }

  resetPassword() {
    this.userService.resetPassword(this.user._id)
      .subscribe(
        (user: User) => {
          this.modalRef.hide();
          this.passwordResetted.emit(user);
          this.alertService.success('userManager.alert.resetPasswordSuccess');
        },
        error => this.alertService.error('hospitalManager.alert.resetPasswordFailed')
      );
  }

}

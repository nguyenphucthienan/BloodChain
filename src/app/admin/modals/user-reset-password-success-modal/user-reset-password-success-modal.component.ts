import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-user-reset-password-success-modal',
  templateUrl: './user-reset-password-success-modal.component.html',
  styleUrls: ['./user-reset-password-success-modal.component.scss']
})
export class UserResetPasswordSuccessModalComponent implements OnInit {

  @Input() user: User;

  @Output() closed = new EventEmitter();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

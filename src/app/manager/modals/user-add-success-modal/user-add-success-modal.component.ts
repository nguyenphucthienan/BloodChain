import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-user-add-success-modal',
  templateUrl: './user-add-success-modal.component.html',
  styleUrls: ['./user-add-success-modal.component.scss']
})
export class UserAddSuccessModalComponent implements OnInit {

  @Input() user: User;

  @Output() closed = new EventEmitter();

  qrCode: string;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.qrCode = this.user._id;
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

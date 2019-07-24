import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-profile-user-qrcode-modal',
  templateUrl: './profile-user-qrcode-modal.component.html',
  styleUrls: ['./profile-user-qrcode-modal.component.scss']
})
export class ProfileUserQrcodeModalComponent implements OnInit {

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

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

  qcCode: string;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.qcCode = this.user.username;
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

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

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  printUser() {
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

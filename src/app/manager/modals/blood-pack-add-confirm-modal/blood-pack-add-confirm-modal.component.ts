import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-blood-pack-add-confirm-modal',
  templateUrl: './blood-pack-add-confirm-modal.component.html',
  styleUrls: ['./blood-pack-add-confirm-modal.component.scss']
})
export class BloodPackAddConfirmModalComponent implements OnInit {

  @Input() user: User;
  @Input() volume: number;

  @Output() confirmed = new EventEmitter();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  yes() {
    this.confirmed.emit();
    this.modalRef.hide();
  }

}

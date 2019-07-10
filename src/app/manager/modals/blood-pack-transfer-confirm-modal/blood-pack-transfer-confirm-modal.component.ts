import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-blood-pack-transfer-confirm-modal',
  templateUrl: './blood-pack-transfer-confirm-modal.component.html',
  styleUrls: ['./blood-pack-transfer-confirm-modal.component.scss']
})
export class BloodPackTransferConfirmModalComponent implements OnInit {

  @Output() confirmed = new EventEmitter();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  yes() {
    this.confirmed.emit();
    this.modalRef.hide();
  }

}

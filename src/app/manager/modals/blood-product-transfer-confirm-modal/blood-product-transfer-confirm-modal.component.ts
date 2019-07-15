import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-blood-product-transfer-confirm-modal',
  templateUrl: './blood-product-transfer-confirm-modal.component.html',
  styleUrls: ['./blood-product-transfer-confirm-modal.component.scss']
})
export class BloodProductTransferConfirmModalComponent implements OnInit {

  @Output() confirmed = new EventEmitter();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  yes() {
    this.confirmed.emit();
    this.modalRef.hide();
  }

}

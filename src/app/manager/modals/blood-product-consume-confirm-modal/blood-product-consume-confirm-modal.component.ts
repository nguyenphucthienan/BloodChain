import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-blood-product-consume-confirm-modal',
  templateUrl: './blood-product-consume-confirm-modal.component.html',
  styleUrls: ['./blood-product-consume-confirm-modal.component.scss']
})
export class BloodProductConsumeConfirmModalComponent implements OnInit {

  @Output() confirmed = new EventEmitter();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  yes() {
    this.confirmed.emit();
    this.modalRef.hide();
  }

}

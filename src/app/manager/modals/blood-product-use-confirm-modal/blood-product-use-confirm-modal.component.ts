import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-blood-product-use-confirm-modal',
  templateUrl: './blood-product-use-confirm-modal.component.html',
  styleUrls: ['./blood-product-use-confirm-modal.component.scss']
})
export class BloodProductUseConfirmModalComponent implements OnInit {

  @Output() confirmed = new EventEmitter();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  yes() {
    this.confirmed.emit();
    this.modalRef.hide();
  }

}

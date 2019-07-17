import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodProduct } from 'src/app/core/models/blood-product.interface';

@Component({
  selector: 'app-blood-product-qrcode-modal',
  templateUrl: './blood-product-qrcode-modal.component.html',
  styleUrls: ['./blood-product-qrcode-modal.component.scss']
})
export class BloodProductQrcodeModalComponent implements OnInit {

  @Input() bloodProduct: BloodProduct;

  @Output() closed = new EventEmitter();

  bloodProductQrCode: string;
  donorQrCode: string;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.bloodProductQrCode = this.bloodProduct._id;
    this.donorQrCode = this.bloodProduct.donor._id;
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

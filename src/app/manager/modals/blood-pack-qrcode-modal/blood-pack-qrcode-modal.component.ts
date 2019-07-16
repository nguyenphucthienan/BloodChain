import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';

@Component({
  selector: 'app-blood-pack-qrcode-modal',
  templateUrl: './blood-pack-qrcode-modal.component.html',
  styleUrls: ['./blood-pack-qrcode-modal.component.scss']
})
export class BloodPackQrcodeModalComponent implements OnInit {

  @Input() bloodPack: BloodPack;

  @Output() closed = new EventEmitter();

  bloodPackQrCode: string;
  donorQrCode: string;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.bloodPackQrCode = this.bloodPack._id;
    this.donorQrCode = this.bloodPack.donor._id;
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

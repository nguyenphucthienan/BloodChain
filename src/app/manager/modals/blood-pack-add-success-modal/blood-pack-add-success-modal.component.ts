import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';

@Component({
  selector: 'app-blood-pack-add-success-modal',
  templateUrl: './blood-pack-add-success-modal.component.html',
  styleUrls: ['./blood-pack-add-success-modal.component.scss']
})
export class BloodPackAddSuccessModalComponent implements OnInit {

  @Input() bloodPack: BloodPack;

  @Output() closed = new EventEmitter();

  bloodPackQrCode: string;
  donorQrCode: string;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.bloodPackQrCode = this.bloodPack._id;
    this.donorQrCode = this.bloodPack.donor as unknown as string;
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-scan-qrcode-modal',
  templateUrl: './scan-qrcode-modal.component.html',
  styleUrls: ['./scan-qrcode-modal.component.scss']
})
export class ScanQrcodeModalComponent implements OnInit {

  @Output() scanSuccess = new EventEmitter();
  @Output() closed = new EventEmitter();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  onScanSuccess(result: string) {
    this.scanSuccess.emit(result);
    this.close();
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

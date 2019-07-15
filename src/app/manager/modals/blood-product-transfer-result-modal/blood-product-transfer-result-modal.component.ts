import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-blood-product-transfer-result-modal',
  templateUrl: './blood-product-transfer-result-modal.component.html',
  styleUrls: ['./blood-product-transfer-result-modal.component.scss']
})
export class BloodProductTransferResultModalComponent implements OnInit {

  @Input() success: string[];
  @Input() errors: string[];

  @Output() closed = new EventEmitter();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

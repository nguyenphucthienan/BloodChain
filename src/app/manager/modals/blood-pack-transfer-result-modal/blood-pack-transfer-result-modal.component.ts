import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-blood-pack-transfer-result-modal',
  templateUrl: './blood-pack-transfer-result-modal.component.html',
  styleUrls: ['./blood-pack-transfer-result-modal.component.scss']
})
export class BloodPackTransferResultModalComponent implements OnInit {

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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-blood-product-consume-result-modal',
  templateUrl: './blood-product-consume-result-modal.component.html',
  styleUrls: ['./blood-product-consume-result-modal.component.scss']
})
export class BloodProductConsumeResultModalComponent implements OnInit {

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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-blood-product-use-result-modal',
  templateUrl: './blood-product-use-result-modal.component.html',
  styleUrls: ['./blood-product-use-result-modal.component.scss']
})
export class BloodProductUseResultModalComponent implements OnInit {

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

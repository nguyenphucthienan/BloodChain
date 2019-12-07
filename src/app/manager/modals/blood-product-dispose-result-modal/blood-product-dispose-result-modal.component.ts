import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-blood-product-dispose-result-modal',
  templateUrl: './blood-product-dispose-result-modal.component.html',
  styleUrls: ['./blood-product-dispose-result-modal.component.scss']
})
export class BloodProductDisposeResultModalComponent implements OnInit {

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

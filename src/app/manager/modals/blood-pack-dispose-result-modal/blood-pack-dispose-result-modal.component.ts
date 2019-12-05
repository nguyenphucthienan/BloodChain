import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-blood-pack-dispose-result-modal',
  templateUrl: './blood-pack-dispose-result-modal.component.html',
  styleUrls: ['./blood-pack-dispose-result-modal.component.scss']
})
export class BloodPackDisposeResultModalComponent implements OnInit {

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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Reward } from 'src/app/core/models/reward.interface';

@Component({
  selector: 'app-reward-voucher-info-modal',
  templateUrl: './reward-voucher-info-modal.component.html',
  styleUrls: ['./reward-voucher-info-modal.component.scss']
})
export class RewardVoucherInfoModalComponent implements OnInit {

  @Input() reward: Reward;

  @Output() closed = new EventEmitter();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

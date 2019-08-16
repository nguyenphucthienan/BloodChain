import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Reward } from 'src/app/core/models/reward.interface';

@Component({
  selector: 'app-reward-redeem-voucher-success-modal',
  templateUrl: './reward-redeem-voucher-success-modal.component.html',
  styleUrls: ['./reward-redeem-voucher-success-modal.component.scss']
})
export class RewardRedeemVoucherSuccessModalComponent implements OnInit {

  @Input() reward: Reward;
  @Input() code: string;

  @Output() closed = new EventEmitter();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-reward-redeem-ethereum-success-modal',
  templateUrl: './reward-redeem-ethereum-success-modal.component.html',
  styleUrls: ['./reward-redeem-ethereum-success-modal.component.scss']
})
export class RewardRedeemEthereumSuccessModalComponent implements OnInit {

  @Input() ethereumPlan: any;
  @Input() transactionId: string;

  @Output() closed = new EventEmitter();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  close() {
    this.modalRef.hide();
    this.closed.emit();
  }

}

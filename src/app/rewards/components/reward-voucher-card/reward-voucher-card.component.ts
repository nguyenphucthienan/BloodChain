import { Component, Input, OnInit } from '@angular/core';
import { Reward } from 'src/app/core/models/reward.interface';

@Component({
  selector: 'app-reward-voucher-card',
  templateUrl: './reward-voucher-card.component.html',
  styleUrls: ['./reward-voucher-card.component.scss']
})
export class RewardVoucherCardComponent implements OnInit {

  @Input() reward: Reward;

  constructor() { }

  ngOnInit() {
  }

}

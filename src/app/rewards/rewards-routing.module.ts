import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RewardRedeemEthereumComponent } from './components/reward-redeem-ethereum/reward-redeem-ethereum.component';
import { RewardRedeemVouchersComponent } from './components/reward-redeem-vouchers/reward-redeem-vouchers.component';
import { RewardsComponent } from './rewards.component';

const routes: Routes = [
  {
    path: 'rewards',
    data: { breadcrumb: 'breadcrumb.reward.rewards' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RewardsComponent
      },
      {
        path: 'vouchers',
        component: RewardRedeemVouchersComponent,
        data: { breadcrumb: 'breadcrumb.reward.redeemVouchers' }
      },
      {
        path: 'ethereum',
        component: RewardRedeemEthereumComponent,
        data: { breadcrumb: 'breadcrumb.reward.redeemEthereum' }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RewardsRoutingModule { }

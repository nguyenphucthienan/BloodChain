import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { RewardRedeemEthereumComponent } from './components/reward-redeem-ethereum/reward-redeem-ethereum.component';
import { RewardRedeemVouchersComponent } from './components/reward-redeem-vouchers/reward-redeem-vouchers.component';
import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsComponent } from './rewards.component';

@NgModule({
  declarations: [
    RewardsComponent,
    RewardRedeemVouchersComponent,
    RewardRedeemEthereumComponent
  ],
  imports: [
    SharedModule,
    RewardsRoutingModule,
    DatatableModule
  ]
})
export class RewardsModule { }

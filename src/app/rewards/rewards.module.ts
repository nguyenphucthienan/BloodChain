import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { RewardRedeemEthereumComponent } from './components/reward-redeem-ethereum/reward-redeem-ethereum.component';
import { RewardRedeemVouchersComponent } from './components/reward-redeem-vouchers/reward-redeem-vouchers.component';
import { RewardVoucherCardComponent } from './components/reward-voucher-card/reward-voucher-card.component';
import {
  RewardPointHistoryInfoModalComponent,
} from './modals/reward-point-history-info-modal/reward-point-history-info-modal.component';
import {
  RewardRedeemEthereumConfirmModalComponent,
} from './modals/reward-redeem-ethereum-confirm-modal/reward-redeem-ethereum-confirm-modal.component';
import {
  RewardRedeemEthereumSuccessModalComponent,
} from './modals/reward-redeem-ethereum-success-modal/reward-redeem-ethereum-success-modal.component';
import {
  RewardRedeemVoucherConfirmModalComponent,
} from './modals/reward-redeem-voucher-confirm-modal/reward-redeem-voucher-confirm-modal.component';
import {
  RewardRedeemVoucherSuccessModalComponent,
} from './modals/reward-redeem-voucher-success-modal/reward-redeem-voucher-success-modal.component';
import { RewardVoucherInfoModalComponent } from './modals/reward-voucher-info-modal/reward-voucher-info-modal.component';
import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsComponent } from './rewards.component';

@NgModule({
  declarations: [
    RewardsComponent,
    RewardRedeemVouchersComponent,
    RewardRedeemEthereumComponent,
    RewardVoucherCardComponent,
    RewardVoucherInfoModalComponent,
    RewardPointHistoryInfoModalComponent,
    RewardRedeemVoucherConfirmModalComponent,
    RewardRedeemVoucherSuccessModalComponent,
    RewardRedeemEthereumConfirmModalComponent,
    RewardRedeemEthereumSuccessModalComponent
  ],
  imports: [
    SharedModule,
    RewardsRoutingModule,
    DatatableModule
  ],
  entryComponents: [
    RewardVoucherInfoModalComponent,
    RewardPointHistoryInfoModalComponent,
    RewardRedeemVoucherConfirmModalComponent,
    RewardRedeemVoucherSuccessModalComponent,
    RewardRedeemEthereumConfirmModalComponent,
    RewardRedeemEthereumSuccessModalComponent
  ]
})
export class RewardsModule { }

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodBanksRoutingModule } from './blood-banks-routing.module';
import { BloodBanksComponent } from './blood-banks.component';
import { BloodBankCardComponent } from './components/blood-bank-card/blood-bank-card.component';
import { BloodBankDetailComponent } from './components/blood-bank-detail/blood-bank-detail.component';

@NgModule({
  declarations: [
    BloodBanksComponent,
    BloodBankCardComponent,
    BloodBankDetailComponent
  ],
  imports: [
    SharedModule,
    BloodBanksRoutingModule
  ]
})
export class BloodBanksModule { }

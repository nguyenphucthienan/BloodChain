import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodBankRoutingModule } from './blood-bank-routing.module';
import { BloodBankComponent } from './blood-bank.component';
import { BloodBankCardComponent } from './components/blood-bank-card/blood-bank-card.component';
import { BloodBankDetailComponent } from './components/blood-bank-detail/blood-bank-detail.component';

@NgModule({
  declarations: [
    BloodBankComponent,
    BloodBankCardComponent,
    BloodBankDetailComponent
  ],
  imports: [
    SharedModule,
    BloodBankRoutingModule
  ]
})
export class BloodBankModule { }

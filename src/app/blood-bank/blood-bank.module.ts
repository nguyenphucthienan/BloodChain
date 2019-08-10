import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodBankRoutingModule } from './blood-bank-routing.module';
import { BloodBankComponent } from './blood-bank.component';

@NgModule({
  declarations: [
    BloodBankComponent
  ],
  imports: [
    SharedModule,
    BloodBankRoutingModule
  ]
})
export class BloodBankModule { }

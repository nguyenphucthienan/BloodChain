import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { DonationHistoryRoutingModule } from './donation-history-routing.module';
import { DonationHistoryComponent } from './donation-history.component';

@NgModule({
  declarations: [
    DonationHistoryComponent
  ],
  imports: [
    SharedModule,
    DatatableModule,
    DonationHistoryRoutingModule
  ]
})
export class DonationHistoryModule { }

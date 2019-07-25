import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import {
  DonationHistoryBloodPackDetailComponent,
} from './components/donation-history-blood-pack-detail/donation-history-blood-pack-detail.component';
import { DonationHistoryRoutingModule } from './donation-history-routing.module';
import { DonationHistoryComponent } from './donation-history.component';

@NgModule({
  declarations: [
    DonationHistoryComponent,
    DonationHistoryBloodPackDetailComponent
  ],
  imports: [
    SharedModule,
    DatatableModule,
    DonationHistoryRoutingModule
  ]
})
export class DonationHistoryModule { }

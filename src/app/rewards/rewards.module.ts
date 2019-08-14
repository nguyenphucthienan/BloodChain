import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsComponent } from './rewards.component';

@NgModule({
  declarations: [
    RewardsComponent
  ],
  imports: [
    SharedModule,
    RewardsRoutingModule,
    DatatableModule
  ]
})
export class RewardsModule { }

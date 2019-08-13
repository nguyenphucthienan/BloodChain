import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { AwardsRoutingModule } from './awards-routing.module';
import { AwardsComponent } from './awards.component';

@NgModule({
  declarations: [
    AwardsComponent
  ],
  imports: [
    SharedModule,
    AwardsRoutingModule,
    DatatableModule
  ]
})
export class AwardsModule { }

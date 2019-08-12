import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HospitalCardComponent } from './components/hospital-card/hospital-card.component';
import { HospitalDetailComponent } from './components/hospital-detail/hospital-detail.component';
import { HospitalsRoutingModule } from './hospitals-routing.module';
import { HospitalsComponent } from './hospitals.component';

@NgModule({
  declarations: [
    HospitalsComponent,
    HospitalCardComponent,
    HospitalDetailComponent
  ],
  imports: [
    SharedModule,
    HospitalsRoutingModule
  ]
})
export class HospitalsModule { }

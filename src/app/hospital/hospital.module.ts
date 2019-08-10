import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HospitalCardComponent } from './components/hospital-card/hospital-card.component';
import { HospitalDetailComponent } from './components/hospital-detail/hospital-detail.component';
import { HospitalRoutingModule } from './hospital-routing.module';
import { HospitalComponent } from './hospital.component';

@NgModule({
  declarations: [
    HospitalComponent,
    HospitalCardComponent,
    HospitalDetailComponent
  ],
  imports: [
    SharedModule,
    HospitalRoutingModule
  ]
})
export class HospitalModule { }

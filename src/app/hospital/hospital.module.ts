import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HospitalCardComponent } from './components/hospital-card/hospital-card.component';
import { HospitalRoutingModule } from './hospital-routing.module';
import { HospitalComponent } from './hospital.component';

@NgModule({
  declarations: [
    HospitalComponent,
    HospitalCardComponent
  ],
  imports: [
    SharedModule,
    HospitalRoutingModule
  ]
})
export class HospitalModule { }

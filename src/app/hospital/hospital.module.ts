import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HospitalRoutingModule } from './hospital-routing.module';
import { HospitalComponent } from './hospital.component';

@NgModule({
  declarations: [
    HospitalComponent
  ],
  imports: [
    SharedModule,
    HospitalRoutingModule
  ]
})
export class HospitalModule { }

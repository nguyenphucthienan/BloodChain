import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodSeparationCenterRoutingModule } from './blood-separation-center-routing.module';
import { BloodSeparationCenterComponent } from './blood-separation-center.component';

@NgModule({
  declarations: [
    BloodSeparationCenterComponent
  ],
  imports: [
    SharedModule,
    BloodSeparationCenterRoutingModule
  ]
})
export class BloodSeparationCenterModule { }

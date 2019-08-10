import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodSeparationCenterRoutingModule } from './blood-separation-center-routing.module';
import { BloodSeparationCenterComponent } from './blood-separation-center.component';
import {
  BloodSeparationCenterCardComponent,
} from './components/blood-separation-center-card/blood-separation-center-card.component';
import {
  BloodSeparationCenterDetailComponent,
} from './components/blood-separation-center-detail/blood-separation-center-detail.component';

@NgModule({
  declarations: [
    BloodSeparationCenterComponent,
    BloodSeparationCenterCardComponent,
    BloodSeparationCenterDetailComponent
  ],
  imports: [
    SharedModule,
    BloodSeparationCenterRoutingModule
  ]
})
export class BloodSeparationCenterModule { }

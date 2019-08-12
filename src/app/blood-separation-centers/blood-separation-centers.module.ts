import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodSeparationCentersRoutingModule } from './blood-separation-centers-routing.module';
import { BloodSeparationCentersComponent } from './blood-separation-centers.component';
import {
  BloodSeparationCenterCardComponent,
} from './components/blood-separation-center-card/blood-separation-center-card.component';
import {
  BloodSeparationCenterDetailComponent,
} from './components/blood-separation-center-detail/blood-separation-center-detail.component';

@NgModule({
  declarations: [
    BloodSeparationCentersComponent,
    BloodSeparationCenterCardComponent,
    BloodSeparationCenterDetailComponent
  ],
  imports: [
    SharedModule,
    BloodSeparationCentersRoutingModule
  ]
})
export class BloodSeparationCentersModule { }

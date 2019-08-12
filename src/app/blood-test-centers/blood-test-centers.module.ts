import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodTestCentersRoutingModule } from './blood-test-centers-routing.module';
import { BloodTestCentersComponent } from './blood-test-centers.component';
import { BloodTestCenterCardComponent } from './components/blood-test-center-card/blood-test-center-card.component';
import { BloodTestCenterDetailComponent } from './components/blood-test-center-detail/blood-test-center-detail.component';

@NgModule({
  declarations: [
    BloodTestCentersComponent,
    BloodTestCenterCardComponent,
    BloodTestCenterDetailComponent
  ],
  imports: [
    SharedModule,
    BloodTestCentersRoutingModule
  ]
})
export class BloodTestCentersModule { }

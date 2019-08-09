import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodTestCenterRoutingModule } from './blood-test-center-routing.module';
import { BloodTestCenterComponent } from './blood-test-center.component';
import { BloodTestCenterCardComponent } from './components/blood-test-center-card/blood-test-center-card.component';
import { BloodTestCenterDetailComponent } from './components/blood-test-center-detail/blood-test-center-detail.component';

@NgModule({
  declarations: [
    BloodTestCenterComponent,
    BloodTestCenterCardComponent,
    BloodTestCenterDetailComponent
  ],
  imports: [
    SharedModule,
    BloodTestCenterRoutingModule
  ]
})
export class BloodTestCenterModule { }

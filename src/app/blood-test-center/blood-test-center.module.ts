import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodTestCenterRoutingModule } from './blood-test-center-routing.module';
import { BloodTestCenterComponent } from './blood-test-center.component';

@NgModule({
  declarations: [
    BloodTestCenterComponent
  ],
  imports: [
    SharedModule,
    BloodTestCenterRoutingModule
  ]
})
export class BloodTestCenterModule { }

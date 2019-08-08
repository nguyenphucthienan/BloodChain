import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodCampRoutingModule } from './blood-camp-routing.module';
import { BloodCampComponent } from './blood-camp.component';

@NgModule({
  declarations: [
    BloodCampComponent
  ],
  imports: [
    SharedModule,
    BloodCampRoutingModule
  ]
})
export class BloodCampModule { }

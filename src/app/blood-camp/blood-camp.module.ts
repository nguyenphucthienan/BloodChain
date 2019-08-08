import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodCampRoutingModule } from './blood-camp-routing.module';
import { BloodCampComponent } from './blood-camp.component';
import { BloodCampCardComponent } from './components/blood-camp-card/blood-camp-card.component';

@NgModule({
  declarations: [
    BloodCampComponent,
    BloodCampCardComponent
  ],
  imports: [
    SharedModule,
    BloodCampRoutingModule
  ]
})
export class BloodCampModule { }

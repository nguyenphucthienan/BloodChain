import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BloodCampsRoutingModule } from './blood-camps-routing.module';
import { BloodCampsComponent } from './blood-camps.component';
import { BloodCampCardComponent } from './components/blood-camp-card/blood-camp-card.component';
import { BloodCampDetailComponent } from './components/blood-camp-detail/blood-camp-detail.component';

@NgModule({
  declarations: [
    BloodCampsComponent,
    BloodCampCardComponent,
    BloodCampDetailComponent
  ],
  imports: [
    SharedModule,
    BloodCampsRoutingModule
  ]
})
export class BloodCampsModule { }

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';

@NgModule({
  declarations: [
    CampaignComponent
  ],
  imports: [
    SharedModule,
    CampaignRoutingModule
  ]
})
export class CampaignModule { }

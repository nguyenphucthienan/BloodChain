import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { CampaignCardComponent } from './components/campaign-card/campaign-card.component';

@NgModule({
  declarations: [
    CampaignsComponent,
    CampaignCardComponent
  ],
  imports: [
    SharedModule,
    CampaignsRoutingModule
  ]
})
export class CampaignsModule { }

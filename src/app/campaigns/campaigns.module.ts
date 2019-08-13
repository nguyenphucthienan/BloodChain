import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { CampaignCardComponent } from './components/campaign-card/campaign-card.component';
import { CampaignDetailComponent } from './components/campaign-detail/campaign-detail.component';

@NgModule({
  declarations: [
    CampaignsComponent,
    CampaignCardComponent,
    CampaignDetailComponent
  ],
  imports: [
    SharedModule,
    CampaignsRoutingModule
  ]
})
export class CampaignsModule { }

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';

@NgModule({
  declarations: [
    CampaignsComponent
  ],
  imports: [
    SharedModule,
    CampaignsRoutingModule
  ]
})
export class CampaignsModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CampaignResolver } from '../core/resolvers/campaign.resolver';
import { CampaignsComponent } from './campaigns.component';
import { CampaignDetailComponent } from './components/campaign-detail/campaign-detail.component';

const routes: Routes = [
  {
    path: 'campaigns',
    data: { breadcrumb: 'breadcrumb.campaign.campaigns' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CampaignsComponent
      },
      {
        path: ':id',
        component: CampaignDetailComponent,
        resolve: { campaign: CampaignResolver },
        data: { breadcrumb: 'breadcrumb.campaign.campaignDetail' }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CampaignsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RewardsComponent } from './rewards.component';

const routes: Routes = [
  {
    path: 'rewards',
    data: { breadcrumb: 'breadcrumb.reward.rewards' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RewardsComponent
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
export class RewardsRoutingModule { }

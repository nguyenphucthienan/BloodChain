import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AwardsComponent } from './awards.component';

const routes: Routes = [
  {
    path: 'awards',
    data: { breadcrumb: 'breadcrumb.award.awards' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AwardsComponent
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
export class AwardsRoutingModule { }

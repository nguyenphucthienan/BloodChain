import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BloodSeparationCenterComponent } from './blood-separation-center.component';

const routes: Routes = [
  {
    path: 'blood-separation-centers',
    data: { breadcrumb: 'breadcrumb.bloodSeparationCenter.main' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BloodSeparationCenterComponent
      },
      // {
      //   path: ':id',
      //   component: BloodSeparationCenterDetailComponent,
      //   resolve: { bloodSeparationCenter: BloodSeparationCenterResolver },
      //   data: { breadcrumb: 'breadcrumb.bloodSeparationCenter.bloodSeparationCenterDetail' }
      // }
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
export class BloodSeparationCenterRoutingModule { }

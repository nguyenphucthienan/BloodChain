import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BloodSeparationCenterResolver } from '../core/resolvers/blood-separation-center.resolver';
import { BloodSeparationCenterComponent } from './blood-separation-center.component';
import {
  BloodSeparationCenterDetailComponent,
} from './components/blood-separation-center-detail/blood-separation-center-detail.component';

const routes: Routes = [
  {
    path: 'blood-separation-centers',
    data: { breadcrumb: 'breadcrumb.bloodSeparationCenter.bloodSeparationCenters' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BloodSeparationCenterComponent
      },
      {
        path: ':id',
        component: BloodSeparationCenterDetailComponent,
        resolve: { bloodSeparationCenter: BloodSeparationCenterResolver },
        data: { breadcrumb: 'breadcrumb.bloodSeparationCenter.bloodSeparationCenterDetail' }
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
export class BloodSeparationCenterRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BloodTestCenterResolver } from '../core/resolvers/blood-test-center.resolver';
import { BloodTestCenterComponent } from './blood-test-center.component';
import { BloodTestCenterDetailComponent } from './components/blood-test-center-detail/blood-test-center-detail.component';

const routes: Routes = [
  {
    path: 'blood-test-centers',
    data: { breadcrumb: 'breadcrumb.bloodTestCenter.bloodTestCenters' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BloodTestCenterComponent
      },
      {
        path: ':id',
        component: BloodTestCenterDetailComponent,
        resolve: { bloodTestCenter: BloodTestCenterResolver },
        data: { breadcrumb: 'breadcrumb.bloodTestCenter.bloodTestCenterDetail' }
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
export class BloodTestCenterRoutingModule { }

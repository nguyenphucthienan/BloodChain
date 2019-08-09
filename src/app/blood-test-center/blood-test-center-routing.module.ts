import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BloodTestCenterComponent } from './blood-test-center.component';

const routes: Routes = [
  {
    path: 'blood-test-centers',
    data: { breadcrumb: 'breadcrumb.bloodTestCenter.main' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BloodTestCenterComponent
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

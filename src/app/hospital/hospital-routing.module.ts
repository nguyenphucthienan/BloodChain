import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HospitalComponent } from './hospital.component';

const routes: Routes = [
  {
    path: 'hospitals',
    data: { breadcrumb: 'breadcrumb.hospital.main' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HospitalComponent
      },
      // {
      //   path: ':id',
      //   component: HospitalDetailComponent,
      //   resolve: { hospital: HospitalResolver },
      //   data: { breadcrumb: 'breadcrumb.hospital.hospitalDetail' }
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
export class HospitalRoutingModule { }

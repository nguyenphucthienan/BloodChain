import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HospitalResolver } from '../core/resolvers/hospital.resolver';
import { HospitalDetailComponent } from './components/hospital-detail/hospital-detail.component';
import { HospitalComponent } from './hospital.component';

const routes: Routes = [
  {
    path: 'hospitals',
    data: { breadcrumb: 'breadcrumb.hospital.hospitals' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HospitalComponent
      },
      {
        path: ':id',
        component: HospitalDetailComponent,
        resolve: { hospital: HospitalResolver },
        data: { breadcrumb: 'breadcrumb.hospital.hospitalDetail' }
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
export class HospitalRoutingModule { }

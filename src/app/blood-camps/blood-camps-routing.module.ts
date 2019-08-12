import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BloodCampResolver } from '../core/resolvers/blood-camp.resolver';
import { BloodCampsComponent } from './blood-camps.component';
import { BloodCampDetailComponent } from './components/blood-camp-detail/blood-camp-detail.component';

const routes: Routes = [
  {
    path: 'blood-camps',
    data: { breadcrumb: 'breadcrumb.bloodCamp.bloodCamps' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BloodCampsComponent
      },
      {
        path: ':id',
        component: BloodCampDetailComponent,
        resolve: { bloodCamp: BloodCampResolver },
        data: { breadcrumb: 'breadcrumb.bloodCamp.bloodCampDetail' }
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
export class BloodCampsRoutingModule { }

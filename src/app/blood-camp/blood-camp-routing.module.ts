import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BloodCampComponent } from './blood-camp.component';

const routes: Routes = [
  {
    path: 'blood-camps',
    data: { breadcrumb: 'breadcrumb.bloodCamp.main' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BloodCampComponent
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
export class BloodCampRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BloodBankComponent } from './blood-bank.component';

const routes: Routes = [
  {
    path: 'blood-banks',
    data: { breadcrumb: 'breadcrumb.bloodBank.main' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BloodBankComponent
      },
      // {
      //   path: ':id',
      //   component: BloodBankDetailComponent,
      //   resolve: { bloodBank: BloodBankResolver },
      //   data: { breadcrumb: 'breadcrumb.bloodBank.bloodBankDetail' }
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
export class BloodBankRoutingModule { }

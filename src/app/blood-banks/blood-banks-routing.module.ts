import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BloodBankResolver } from '../core/resolvers/blood-bank.resolver';
import { BloodBanksComponent } from './blood-banks.component';
import { BloodBankDetailComponent } from './components/blood-bank-detail/blood-bank-detail.component';

const routes: Routes = [
  {
    path: 'blood-banks',
    data: { breadcrumb: 'breadcrumb.bloodBank.bloodBanks' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BloodBanksComponent
      },
      {
        path: ':id',
        component: BloodBankDetailComponent,
        resolve: { bloodBank: BloodBankResolver },
        data: { breadcrumb: 'breadcrumb.bloodBank.bloodBankDetail' }
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
export class BloodBanksRoutingModule { }

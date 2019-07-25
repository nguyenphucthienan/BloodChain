import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleName } from '../core/constant/role-name';
import { HasRoleGuard } from '../core/guards/has-role.guard';
import { DonationHistoryComponent } from './donation-history.component';

const routes: Routes = [
  {
    path: 'donation-history',
    canActivate: [HasRoleGuard],
    data: {
      roles: [RoleName.DONOR],
      breadcrumb: 'breadcrumb.donationHistory.main'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DonationHistoryComponent
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
export class DonationHistoryRoutingModule { }

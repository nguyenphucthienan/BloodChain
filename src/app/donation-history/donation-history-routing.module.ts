import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleName } from '../core/constant/role-name';
import { HasRoleGuard } from '../core/guards/has-role.guard';
import { BloodPackResolver } from '../core/resolvers/blood-pack.resolver';
import { TestTypesResolver } from '../core/resolvers/test-types.resolver';
import {
  DonationHistoryBloodPackDetailComponent,
} from './components/donation-history-blood-pack-detail/donation-history-blood-pack-detail.component';
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
      },
      {
        path: 'blood-packs/:id',
        component: DonationHistoryBloodPackDetailComponent,
        resolve: {
          testTypes: TestTypesResolver,
          bloodPack: BloodPackResolver
        },
        data: { breadcrumb: 'breadcrumb.donationHistory.bloodPackDetail' }
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

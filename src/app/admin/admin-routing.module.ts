import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleName } from '../core/constant/role-name';
import { HasRoleGuard } from '../core/guards/has-role.guard';
import { AdminBloodBankManagerComponent } from './components/admin-blood-bank-manager/admin-blood-bank-manager.component';
import { AdminBloodCampManagerComponent } from './components/admin-blood-camp-manager/admin-blood-camp-manager.component';
import { AdminBloodPackManagerComponent } from './components/admin-blood-pack-manager/admin-blood-pack-manager.component';
import {
  AdminBloodSeparationCenterManagerComponent,
} from './components/admin-blood-separation-center-manager/admin-blood-separation-center-manager.component';
import {
  AdminBloodTestCenterManagerComponent,
} from './components/admin-blood-test-center-manager/admin-blood-test-center-manager.component';
import { AdminHospitalManagerComponent } from './components/admin-hospital-manager/admin-hospital-manager.component';
import { AdminUserManagerComponent } from './components/admin-user-manager/admin-user-manager.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [HasRoleGuard],
    data: { roles: [RoleName.ADMIN], breadcrumb: 'breadcrumb.admin.main' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'users',
        component: AdminUserManagerComponent,
        data: { breadcrumb: 'breadcrumb.admin.users' }
      },
      {
        path: 'blood-camps',
        component: AdminBloodCampManagerComponent,
        data: { breadcrumb: 'breadcrumb.admin.bloodCamps' }
      },
      {
        path: 'blood-test-centers',
        component: AdminBloodTestCenterManagerComponent,
        data: { breadcrumb: 'breadcrumb.admin.bloodTestCenters' }
      },
      {
        path: 'blood-separation-centers',
        component: AdminBloodSeparationCenterManagerComponent,
        data: { breadcrumb: 'breadcrumb.admin.bloodSeparationCenters' }
      },
      {
        path: 'blood-banks',
        component: AdminBloodBankManagerComponent,
        data: { breadcrumb: 'breadcrumb.admin.bloodBanks' }
      },
      {
        path: 'hospitals',
        component: AdminHospitalManagerComponent,
        data: { breadcrumb: 'breadcrumb.admin.hospitals' }
      },
      {
        path: 'blood-packs',
        component: AdminBloodPackManagerComponent,
        data: { breadcrumb: 'breadcrumb.admin.bloodPacks' }
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
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleName } from '../core/constant/role-name';
import { HasRoleGuard } from '../core/guards/has-role.guard';
import { AdminBloodBankManagerComponent } from './components/admin-blood-bank-manager/admin-blood-bank-manager.component';
import { AdminBloodCampManagerComponent } from './components/admin-blood-camp-manager/admin-blood-camp-manager.component';
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
    data: { roles: [RoleName.ADMIN], breadcrumb: 'breadcumb.admin' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'users',
        component: AdminUserManagerComponent,
        data: { breadcrumb: 'breadcumb.users' }
      },
      {
        path: 'blood-camps',
        component: AdminBloodCampManagerComponent,
        data: { breadcrumb: 'breadcumb.bloodCamps' }
      },
      {
        path: 'blood-test-centers',
        component: AdminBloodTestCenterManagerComponent,
        data: { breadcrumb: 'breadcumb.bloodTestCenters' }
      },
      {
        path: 'blood-separation-centers',
        component: AdminBloodSeparationCenterManagerComponent,
        data: { breadcrumb: 'breadcumb.bloodSeparationCenters' }
      },
      {
        path: 'blood-banks',
        component: AdminBloodBankManagerComponent,
        data: { breadcrumb: 'breadcumb.bloodBanks' }
      },
      {
        path: 'hospitals',
        component: AdminHospitalManagerComponent,
        data: { breadcrumb: 'breadcumb.hospitals' }
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

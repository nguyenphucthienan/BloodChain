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
    path: 'admin/users',
    component: AdminUserManagerComponent,
    canActivate: [HasRoleGuard],
    data: { roles: [RoleName.ADMIN] }
  },
  {
    path: 'admin/blood-camps',
    component: AdminBloodCampManagerComponent,
    canActivate: [HasRoleGuard],
    data: { roles: [RoleName.ADMIN] }
  },
  {
    path: 'admin/blood-test-centers',
    component: AdminBloodTestCenterManagerComponent,
    canActivate: [HasRoleGuard],
    data: { roles: [RoleName.ADMIN] }
  },
  {
    path: 'admin/blood-separation-centers',
    component: AdminBloodSeparationCenterManagerComponent,
    canActivate: [HasRoleGuard],
    data: { roles: [RoleName.ADMIN] }
  },
  {
    path: 'admin/blood-banks',
    component: AdminBloodBankManagerComponent,
    canActivate: [HasRoleGuard],
    data: { roles: [RoleName.ADMIN] }
  },
  {
    path: 'admin/hospitals',
    component: AdminHospitalManagerComponent,
    canActivate: [HasRoleGuard],
    data: { roles: [RoleName.ADMIN] }
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

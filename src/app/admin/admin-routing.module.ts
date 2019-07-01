import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminBloodBankManagerComponent } from './components/admin-blood-bank-manager/admin-blood-bank-manager.component';
import { AdminBloodCampManagerComponent } from './components/admin-blood-camp-manager/admin-blood-camp-manager.component';
import {
  AdminBloodSeparationCenterManagerComponent,
} from './components/admin-blood-separation-center-manager/admin-blood-separation-center-manager.component';
import {
  AdminBloodTestCenterManagerComponent,
} from './components/admin-blood-test-center-manager/admin-blood-test-center-manager.component';
import { AdminHospitalManagerComponent } from './components/admin-hospital-manager/admin-hospital-manager.component';

const routes: Routes = [
  {
    path: 'admin/blood-camps',
    component: AdminBloodCampManagerComponent
  },
  {
    path: 'admin/blood-test-centers',
    component: AdminBloodTestCenterManagerComponent
  },
  {
    path: 'admin/blood-separation-centers',
    component: AdminBloodSeparationCenterManagerComponent
  },
  {
    path: 'admin/blood-banks',
    component: AdminBloodBankManagerComponent
  },
  {
    path: 'admin/hospitals',
    component: AdminHospitalManagerComponent
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

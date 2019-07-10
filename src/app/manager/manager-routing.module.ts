import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleName } from '../core/constant/role-name';
import { HasRoleGuard } from '../core/guards/has-role.guard';
import {
  BloodCampBloodPackManagerAddBloodPackComponent,
} from './components/blood-camp-blood-pack-manager-add-blood-pack/blood-camp-blood-pack-manager-add-blood-pack.component';
import {
  BloodCampBloodPackManagerTransferBloodPackComponent,
} from './components/blood-camp-blood-pack-manager-transfer-blood-pack/blood-camp-blood-pack-manager-transfer-blood-pack.component';
import {
  BloodCampBloodPackManagerComponent,
} from './components/blood-camp-blood-pack-manager/blood-camp-blood-pack-manager.component';
import {
  BloodTestCenterBloodPackManagerComponent,
} from './components/blood-test-center-blood-pack-manager/blood-test-center-blood-pack-manager.component';
import {
  ManagerUserManagerAddUserComponent,
} from './components/manager-user-manager-add-user/manager-user-manager-add-user.component';
import { ManagerUserManagerComponent } from './components/manager-user-manager/manager-user-manager.component';

const routes: Routes = [
  {
    path: 'manager',
    data: { breadcrumb: 'breadcrumb.manager.main' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'users',
        canActivate: [HasRoleGuard],
        data: {
          roles: [
            RoleName.ADMIN,
            RoleName.BLOOD_CAMP,
            RoleName.BLOOD_TEST_CENTER,
            RoleName.BLOOD_SEPARATION_CENTER,
            RoleName.BLOOD_BANK,
            RoleName.HOSPITAL
          ],
          breadcrumb: 'breadcrumb.manager.users'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ManagerUserManagerComponent
          },
          {
            path: 'add',
            component: ManagerUserManagerAddUserComponent,
            data: { breadcrumb: 'breadcrumb.manager.addUsers' }
          }
        ]
      },
      {
        path: 'blood-camp',
        canActivate: [HasRoleGuard],
        data: {
          roles: [RoleName.BLOOD_CAMP],
          breadcrumb: 'breadcrumb.bloodCamp.main'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'blood-packs'
          },
          {
            path: 'blood-packs',
            data: { breadcrumb: 'breadcrumb.bloodCamp.bloodPacks.main' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: BloodCampBloodPackManagerComponent
              },
              {
                path: 'add',
                component: BloodCampBloodPackManagerAddBloodPackComponent,
                data: { breadcrumb: 'breadcrumb.bloodCamp.bloodPacks.addBloodPack' }
              },
              {
                path: 'transfer',
                component: BloodCampBloodPackManagerTransferBloodPackComponent,
                data: { breadcrumb: 'breadcrumb.bloodCamp.bloodPacks.transferBloodPacks' }
              }
            ]
          }
        ]
      },
      {
        path: 'blood-test-center',
        canActivate: [HasRoleGuard],
        data: {
          roles: [RoleName.BLOOD_TEST_CENTER],
          breadcrumb: 'breadcrumb.bloodTestCenter.main'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'blood-packs'
          },
          {
            path: 'blood-packs',
            data: { breadcrumb: 'breadcrumb.bloodTestCenter.bloodPacks.main' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: BloodTestCenterBloodPackManagerComponent
              }
            ]
          }
        ]
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
export class ManagerRoutingModule { }

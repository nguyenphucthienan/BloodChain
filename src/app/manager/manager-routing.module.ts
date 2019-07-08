import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleName } from '../core/constant/role-name';
import { HasRoleGuard } from '../core/guards/has-role.guard';
import {
  BloodCampBloodPackManagerAddBloodPackComponent,
} from './components/blood-camp-blood-pack-manager-add-blood-pack/blood-camp-blood-pack-manager-add-blood-pack.component';
import {
  BloodCampBloodPackManagerComponent,
} from './components/blood-camp-blood-pack-manager/blood-camp-blood-pack-manager.component';
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
          roles: [RoleName.ADMIN, RoleName.BLOOD_CAMP],
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
        data: { breadcrumb: 'breadcrumb.manager.bloodCamp.main' },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'blood-packs'
          },
          {
            path: 'blood-packs',
            data: { breadcrumb: 'breadcrumb.manager.bloodCamp.bloodPacks.main' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                canActivate: [HasRoleGuard],
                data: { roles: [RoleName.BLOOD_CAMP] },
                component: BloodCampBloodPackManagerComponent
              },
              {
                path: 'add',
                component: BloodCampBloodPackManagerAddBloodPackComponent,
                data: {
                  roles: [RoleName.BLOOD_CAMP],
                  breadcrumb: 'breadcrumb.manager.bloodCamp.bloodPacks.addBloodPacks'
                }
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

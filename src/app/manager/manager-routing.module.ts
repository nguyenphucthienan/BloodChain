import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleName } from '../core/constant/role-name';
import { HasRoleGuard } from '../core/guards/has-role.guard';
import {
  ManagerBloodPackManagerAddBloodPackComponent,
} from './components/manager-blood-pack-manager-add-blood-pack/manager-blood-pack-manager-add-blood-pack.component';
import {
  ManagerBloodPackManagerComponent,
} from './components/manager-blood-pack-manager/manager-blood-pack-manager.component';
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
        path: 'blood-packs',
        canActivate: [HasRoleGuard],
        data: {
          roles: [RoleName.ADMIN, RoleName.BLOOD_CAMP],
          breadcrumb: 'breadcrumb.manager.bloodPacks'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ManagerBloodPackManagerComponent
          },
          {
            path: 'add',
            component: ManagerBloodPackManagerAddBloodPackComponent,
            data: { breadcrumb: 'breadcrumb.manager.addBloodPacks' }
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

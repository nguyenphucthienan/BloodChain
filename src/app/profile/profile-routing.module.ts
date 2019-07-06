import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleName } from '../core/constant/role-name';
import { HasRoleGuard } from '../core/guards/has-role.guard';
import { ProfileEditInfoComponent } from './components/profile-edit-info/profile-edit-info.component';

const routes: Routes = [
  {
    path: 'profile',
    canActivate: [HasRoleGuard],
    data: { roles: [RoleName.DONOR], breadcrumb: 'breadcrumb.profile.main' },
    children: [
      {
        path: 'edit',
        data: { breadcrumb: 'breadcrumb.profile.editInfo' },
        component: ProfileEditInfoComponent
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
export class ProfileRoutingModule { }

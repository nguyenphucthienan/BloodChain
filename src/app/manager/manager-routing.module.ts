import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerUserManagerComponent } from './components/manager-user-manager/manager-user-manager.component';

const routes: Routes = [
  {
    path: 'manager',
    data: {  breadcrumb: 'breadcumb.manager' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'users',
        component: ManagerUserManagerComponent,
        data: { breadcrumb: 'breadcumb.users' }
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

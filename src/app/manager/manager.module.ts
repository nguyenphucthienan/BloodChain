import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { ManagerUserManagerComponent } from './components/manager-user-manager/manager-user-manager.component';
import { ManagerRoutingModule } from './manager-routing.module';

@NgModule({
  declarations: [
    ManagerUserManagerComponent
  ],
  imports: [
    SharedModule,
    DatatableModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }

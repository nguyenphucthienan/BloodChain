import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import {
  ManagerBloodPackManagerComponent,
} from './components/manager-blood-pack-manager/manager-blood-pack-manager.component';
import {
  ManagerUserManagerAddUserComponent,
} from './components/manager-user-manager-add-user/manager-user-manager-add-user.component';
import { ManagerUserManagerComponent } from './components/manager-user-manager/manager-user-manager.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { UserAddSuccessModalComponent } from './modals/user-add-success-modal/user-add-success-modal.component';
import { UserManagerLiteTableService } from './services/user-manager-lite-table.service';
import { ManagerBloodPackManagerAddBloodPackComponent } from './components/manager-blood-pack-manager-add-blood-pack/manager-blood-pack-manager-add-blood-pack.component';
import { ManagerBloodPackManagerDonationHistoryComponent } from './components/manager-blood-pack-manager-donation-history/manager-blood-pack-manager-donation-history.component';

@NgModule({
  declarations: [
    ManagerUserManagerComponent,
    ManagerUserManagerAddUserComponent,
    UserAddSuccessModalComponent,
    ManagerBloodPackManagerComponent,
    ManagerBloodPackManagerAddBloodPackComponent,
    ManagerBloodPackManagerDonationHistoryComponent
  ],
  imports: [
    SharedModule,
    DatatableModule,
    ManagerRoutingModule
  ],
  providers: [
    UserManagerLiteTableService
  ],
  entryComponents: [
    UserAddSuccessModalComponent
  ]
})
export class ManagerModule { }

import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
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
  ManagerBloodPackManagerDonationHistoryComponent,
} from './components/manager-blood-pack-manager-donation-history/manager-blood-pack-manager-donation-history.component';
import {
  ManagerUserManagerAddUserComponent,
} from './components/manager-user-manager-add-user/manager-user-manager-add-user.component';
import { ManagerUserManagerComponent } from './components/manager-user-manager/manager-user-manager.component';
import { ManagerRoutingModule } from './manager-routing.module';
import {
  BloodPackAddSuccessModalComponent,
} from './modals/blood-pack-add-success-modal/blood-pack-add-success-modal.component';
import { UserAddSuccessModalComponent } from './modals/user-add-success-modal/user-add-success-modal.component';
import { UserManagerLiteTableService } from './services/user-manager-lite-table.service';

@NgModule({
  declarations: [
    ManagerUserManagerComponent,
    ManagerUserManagerAddUserComponent,
    UserAddSuccessModalComponent,
    ManagerBloodPackManagerDonationHistoryComponent,
    BloodPackAddSuccessModalComponent,
    BloodCampBloodPackManagerComponent,
    BloodCampBloodPackManagerAddBloodPackComponent,
    BloodCampBloodPackManagerTransferBloodPackComponent,
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
    UserAddSuccessModalComponent,
    BloodPackAddSuccessModalComponent,
  ]
})
export class ManagerModule { }

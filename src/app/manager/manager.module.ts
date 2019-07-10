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
import {
  BloodPackTransferConfirmModalComponent,
} from './modals/blood-pack-transfer-confirm-modal/blood-pack-transfer-confirm-modal.component';
import {
  BloodPackTransferResultModalComponent,
} from './modals/blood-pack-transfer-result-modal/blood-pack-transfer-result-modal.component';
import { UserAddSuccessModalComponent } from './modals/user-add-success-modal/user-add-success-modal.component';
import { UserManagerLiteTableService } from './services/user-manager-lite-table.service';
import { BloodTestCenterBloodPackManagerComponent } from './components/blood-test-center-blood-pack-manager/blood-test-center-blood-pack-manager.component';

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
    BloodPackTransferConfirmModalComponent,
    BloodPackTransferResultModalComponent,
    BloodTestCenterBloodPackManagerComponent,
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
    BloodPackTransferConfirmModalComponent,
    BloodPackTransferResultModalComponent
  ]
})
export class ManagerModule { }

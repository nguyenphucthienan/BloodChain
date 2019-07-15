import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import {
  BloodBankBloodProductManagerComponent,
} from './components/blood-bank-blood-product-manager/blood-bank-blood-product-manager.component';
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
  BloodSeparationCenterBloodPackManagerUpdateResultComponent,
} from './components/blood-separation-center-blood-pack-manager-update-result/blood-separation-center-blood-pack-manager-update-result.component';
import {
  BloodSeparationCenterBloodPackManagerComponent,
} from './components/blood-separation-center-blood-pack-manager/blood-separation-center-blood-pack-manager.component';
import {
  BloodSeparationCenterBloodProductManagerTransferBloodProductComponent,
} from './components/blood-separation-center-blood-product-manager-transfer-blood-product/blood-separation-center-blood-product-manager-transfer-blood-product.component';
import {
  BloodSeparationCenterBloodProductManagerComponent,
} from './components/blood-separation-center-blood-product-manager/blood-separation-center-blood-product-manager.component';
import {
  BloodTestCenterBloodPackManagerTransferBloodPackComponent,
} from './components/blood-test-center-blood-pack-manager-transfer-blood-pack/blood-test-center-blood-pack-manager-transfer-blood-pack.component';
import {
  BloodTestCenterBloodPackManagerUpdateResultComponent,
} from './components/blood-test-center-blood-pack-manager-update-result/blood-test-center-blood-pack-manager-update-result.component';
import {
  BloodTestCenterBloodPackManagerComponent,
} from './components/blood-test-center-blood-pack-manager/blood-test-center-blood-pack-manager.component';
import {
  HospitalBloodProductManagerComponent,
} from './components/hospital-blood-product-manager/hospital-blood-product-manager.component';
import {
  ManagerBloodPackManagerDonationHistoryComponent,
} from './components/manager-blood-pack-manager-donation-history/manager-blood-pack-manager-donation-history.component';
import {
  ManagerBloodProductManagerComponent,
} from './components/manager-blood-product-manager/manager-blood-product-manager.component';
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
import {
  BloodProductTransferConfirmModalComponent,
} from './modals/blood-product-transfer-confirm-modal/blood-product-transfer-confirm-modal.component';
import {
  BloodProductTransferResultModalComponent,
} from './modals/blood-product-transfer-result-modal/blood-product-transfer-result-modal.component';
import { UserAddSuccessModalComponent } from './modals/user-add-success-modal/user-add-success-modal.component';
import { UserManagerLiteTableService } from './services/user-manager-lite-table.service';

@NgModule({
  declarations: [
    ManagerUserManagerComponent,
    ManagerUserManagerAddUserComponent,
    UserAddSuccessModalComponent,
    ManagerBloodPackManagerDonationHistoryComponent,
    ManagerBloodProductManagerComponent,
    BloodPackAddSuccessModalComponent,
    BloodCampBloodPackManagerComponent,
    BloodCampBloodPackManagerAddBloodPackComponent,
    BloodCampBloodPackManagerTransferBloodPackComponent,
    BloodPackTransferConfirmModalComponent,
    BloodPackTransferResultModalComponent,
    BloodTestCenterBloodPackManagerComponent,
    BloodTestCenterBloodPackManagerUpdateResultComponent,
    BloodTestCenterBloodPackManagerTransferBloodPackComponent,
    BloodSeparationCenterBloodPackManagerComponent,
    BloodSeparationCenterBloodPackManagerUpdateResultComponent,
    BloodSeparationCenterBloodProductManagerComponent,
    BloodSeparationCenterBloodProductManagerTransferBloodProductComponent,
    BloodBankBloodProductManagerComponent,
    HospitalBloodProductManagerComponent,
    BloodProductTransferConfirmModalComponent,
    BloodProductTransferResultModalComponent,
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
    BloodPackTransferResultModalComponent,
    BloodProductTransferConfirmModalComponent,
    BloodProductTransferResultModalComponent
  ]
})
export class ManagerModule { }

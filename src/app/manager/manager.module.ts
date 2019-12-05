import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import {
  BloodBankBloodProductManagerTransferBloodProductComponent,
} from './components/blood-bank-blood-product-manager-transfer-blood-product/blood-bank-blood-product-manager-transfer-blood-product.component';
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
  BloodCampCampaignManagerComponent,
} from './components/blood-camp-campaign-manager/blood-camp-campaign-manager.component';
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
  HospitalBloodProductManagerTransferBloodProductComponent,
} from './components/hospital-blood-product-manager-transfer-blood-product/hospital-blood-product-manager-transfer-blood-product.component';
import {
  HospitalBloodProductManagerUseBloodProductComponent,
} from './components/hospital-blood-product-manager-use-blood-product/hospital-blood-product-manager-use-blood-product.component';
import {
  HospitalBloodProductManagerComponent,
} from './components/hospital-blood-product-manager/hospital-blood-product-manager.component';
import {
  ManagerBloodPackManagerBloodPackDetailComponent,
} from './components/manager-blood-pack-manager-blood-pack-detail/manager-blood-pack-manager-blood-pack-detail.component';
import {
  ManagerBloodPackManagerDonationHistoryComponent,
} from './components/manager-blood-pack-manager-donation-history/manager-blood-pack-manager-donation-history.component';
import {
  ManagerBloodPackManagerComponent,
} from './components/manager-blood-pack-manager/manager-blood-pack-manager.component';
import {
  ManagerBloodProductManagerBloodProductDetailComponent,
} from './components/manager-blood-product-manager-blood-product-detail/manager-blood-product-manager-blood-product-detail.component';
import {
  ManagerBloodProductManagerComponent,
} from './components/manager-blood-product-manager/manager-blood-product-manager.component';
import { ManagerCampaignManagerComponent } from './components/manager-campaign-manager/manager-campaign-manager.component';
import {
  ManagerUserManagerAddUserComponent,
} from './components/manager-user-manager-add-user/manager-user-manager-add-user.component';
import {
  ManagerUserManagerUserDetailComponent,
} from './components/manager-user-manager-user-detail/manager-user-manager-user-detail.component';
import { ManagerUserManagerComponent } from './components/manager-user-manager/manager-user-manager.component';
import { ManagerRoutingModule } from './manager-routing.module';
import {
  BloodPackAddConfirmModalComponent,
} from './modals/blood-pack-add-confirm-modal/blood-pack-add-confirm-modal.component';
import {
  BloodPackAddSuccessModalComponent,
} from './modals/blood-pack-add-success-modal/blood-pack-add-success-modal.component';
import { BloodPackDeleteModalComponent } from './modals/blood-pack-delete-modal/blood-pack-delete-modal.component';
import {
  BloodPackDisposeResultModalComponent,
} from './modals/blood-pack-dispose-result-modal/blood-pack-dispose-result-modal.component';
import { BloodPackQrcodeModalComponent } from './modals/blood-pack-qrcode-modal/blood-pack-qrcode-modal.component';
import {
  BloodPackTransferConfirmModalComponent,
} from './modals/blood-pack-transfer-confirm-modal/blood-pack-transfer-confirm-modal.component';
import {
  BloodPackTransferResultModalComponent,
} from './modals/blood-pack-transfer-result-modal/blood-pack-transfer-result-modal.component';
import { BloodPackUpdateModalComponent } from './modals/blood-pack-update-modal/blood-pack-update-modal.component';
import {
  BloodPackUpdateSeparationResultResultModalComponent,
} from './modals/blood-pack-update-separation-result-result-modal/blood-pack-update-separation-result-result-modal.component';
import { BloodProductQrcodeModalComponent } from './modals/blood-product-qrcode-modal/blood-product-qrcode-modal.component';
import {
  BloodProductTransferConfirmModalComponent,
} from './modals/blood-product-transfer-confirm-modal/blood-product-transfer-confirm-modal.component';
import {
  BloodProductTransferResultModalComponent,
} from './modals/blood-product-transfer-result-modal/blood-product-transfer-result-modal.component';
import {
  BloodProductUseConfirmModalComponent,
} from './modals/blood-product-use-confirm-modal/blood-product-use-confirm-modal.component';
import {
  BloodProductUseResultModalComponent,
} from './modals/blood-product-use-result-modal/blood-product-use-result-modal.component';
import { CampaignAddModalComponent } from './modals/campaign-add-modal/campaign-add-modal.component';
import { CampaignDeleteModalComponent } from './modals/campaign-delete-modal/campaign-delete-modal.component';
import {
  CampaignPhotoManagerModalComponent,
} from './modals/campaign-photo-manager-modal/campaign-photo-manager-modal.component';
import { CampaignUpdateModalComponent } from './modals/campaign-update-modal/campaign-update-modal.component';
import { UserAddSuccessModalComponent } from './modals/user-add-success-modal/user-add-success-modal.component';
import { UserQrcodeModalComponent } from './modals/user-qrcode-modal/user-qrcode-modal.component';

@NgModule({
  declarations: [
    ManagerUserManagerComponent,
    ManagerUserManagerAddUserComponent,
    ManagerUserManagerUserDetailComponent,
    UserAddSuccessModalComponent,
    ManagerBloodPackManagerComponent,
    ManagerBloodPackManagerBloodPackDetailComponent,
    ManagerBloodPackManagerDonationHistoryComponent,
    ManagerBloodProductManagerComponent,
    ManagerBloodProductManagerBloodProductDetailComponent,
    ManagerCampaignManagerComponent,
    BloodPackAddConfirmModalComponent,
    BloodPackAddSuccessModalComponent,
    BloodPackUpdateModalComponent,
    BloodPackDeleteModalComponent,
    BloodCampBloodPackManagerComponent,
    BloodCampBloodPackManagerAddBloodPackComponent,
    BloodCampBloodPackManagerTransferBloodPackComponent,
    BloodCampCampaignManagerComponent,
    BloodPackTransferConfirmModalComponent,
    BloodPackTransferResultModalComponent,
    BloodPackUpdateSeparationResultResultModalComponent,
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
    BloodProductUseConfirmModalComponent,
    BloodProductUseResultModalComponent,
    BloodBankBloodProductManagerTransferBloodProductComponent,
    HospitalBloodProductManagerTransferBloodProductComponent,
    HospitalBloodProductManagerUseBloodProductComponent,
    UserQrcodeModalComponent,
    BloodPackQrcodeModalComponent,
    BloodProductQrcodeModalComponent,
    CampaignAddModalComponent,
    CampaignUpdateModalComponent,
    CampaignDeleteModalComponent,
    CampaignPhotoManagerModalComponent,
    ManagerCampaignManagerComponent,
    BloodPackDisposeResultModalComponent
  ],
  imports: [
    SharedModule,
    DatatableModule,
    ManagerRoutingModule
  ],
  entryComponents: [
    UserAddSuccessModalComponent,
    BloodPackAddConfirmModalComponent,
    BloodPackAddSuccessModalComponent,
    BloodPackUpdateModalComponent,
    BloodPackTransferConfirmModalComponent,
    BloodPackTransferResultModalComponent,
    BloodPackUpdateSeparationResultResultModalComponent,
    BloodProductTransferConfirmModalComponent,
    BloodProductTransferResultModalComponent,
    BloodProductUseConfirmModalComponent,
    BloodProductUseResultModalComponent,
    UserQrcodeModalComponent,
    BloodPackQrcodeModalComponent,
    BloodProductQrcodeModalComponent,
    CampaignAddModalComponent,
    CampaignUpdateModalComponent,
    CampaignDeleteModalComponent,
    CampaignPhotoManagerModalComponent,
    BloodPackDeleteModalComponent,
    BloodPackDisposeResultModalComponent
  ]
})
export class ManagerModule { }

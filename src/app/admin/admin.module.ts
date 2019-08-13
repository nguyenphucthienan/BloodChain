import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminAwardManagerComponent } from './components/admin-award-manager/admin-award-manager.component';
import { AdminBloodBankManagerComponent } from './components/admin-blood-bank-manager/admin-blood-bank-manager.component';
import { AdminBloodCampManagerComponent } from './components/admin-blood-camp-manager/admin-blood-camp-manager.component';
import { AdminBloodPackManagerComponent } from './components/admin-blood-pack-manager/admin-blood-pack-manager.component';
import {
  AdminBloodProductTypeManagerComponent,
} from './components/admin-blood-product-type-manager/admin-blood-product-type-manager.component';
import {
  AdminBloodSeparationCenterManagerComponent,
} from './components/admin-blood-separation-center-manager/admin-blood-separation-center-manager.component';
import {
  AdminBloodTestCenterManagerComponent,
} from './components/admin-blood-test-center-manager/admin-blood-test-center-manager.component';
import { AdminHospitalManagerComponent } from './components/admin-hospital-manager/admin-hospital-manager.component';
import { AdminTestTypeManagerComponent } from './components/admin-test-type-manager/admin-test-type-manager.component';
import {
  AdminUserManagerUpdateUserComponent,
} from './components/admin-user-manager-update-user/admin-user-manager-update-user.component';
import { AdminUserManagerComponent } from './components/admin-user-manager/admin-user-manager.component';
import { AwardAddModalComponent } from './modals/award-add-modal/award-add-modal.component';
import { AwardUpdateModalComponent } from './modals/award-update-modal/award-update-modal.component';
import { BloodBankAddModalComponent } from './modals/blood-bank-add-modal/blood-bank-add-modal.component';
import {
  BloodBankAssignStaffsModalComponent,
} from './modals/blood-bank-assign-staffs-modal/blood-bank-assign-staffs-modal.component';
import { BloodBankDeleteModalComponent } from './modals/blood-bank-delete-modal/blood-bank-delete-modal.component';
import {
  BloodBankPhotoManagerModalComponent,
} from './modals/blood-bank-photo-manager-modal/blood-bank-photo-manager-modal.component';
import { BloodBankUpdateModalComponent } from './modals/blood-bank-update-modal/blood-bank-update-modal.component';
import { BloodCampAddModalComponent } from './modals/blood-camp-add-modal/blood-camp-add-modal.component';
import {
  BloodCampAssignStaffsModalComponent,
} from './modals/blood-camp-assign-staffs-modal/blood-camp-assign-staffs-modal.component';
import { BloodCampDeleteModalComponent } from './modals/blood-camp-delete-modal/blood-camp-delete-modal.component';
import {
  BloodCampPhotoManagerModalComponent,
} from './modals/blood-camp-photo-manager-modal/blood-camp-photo-manager-modal.component';
import { BloodCampUpdateModalComponent } from './modals/blood-camp-update-modal/blood-camp-update-modal.component';
import {
  BloodProductTypeAddModalComponent,
} from './modals/blood-product-type-add-modal/blood-product-type-add-modal.component';
import {
  BloodProductTypeDeleteModalComponent,
} from './modals/blood-product-type-delete-modal/blood-product-type-delete-modal.component';
import {
  BloodProductTypeUpdateModalComponent,
} from './modals/blood-product-type-update-modal/blood-product-type-update-modal.component';
import {
  BloodSeparationCenterAddModalComponent,
} from './modals/blood-separation-center-add-modal/blood-separation-center-add-modal.component';
import {
  BloodSeparationCenterAssignStaffsModalComponent,
} from './modals/blood-separation-center-assign-staffs-modal/blood-separation-center-assign-staffs-modal.component';
import {
  BloodSeparationCenterDeleteModalComponent,
} from './modals/blood-separation-center-delete-modal/blood-separation-center-delete-modal.component';
import {
  BloodSeparationCenterPhotoManagerModalComponent,
} from './modals/blood-separation-center-photo-manager-modal/blood-separation-center-photo-manager-modal.component';
import {
  BloodSeparationCenterUpdateModalComponent,
} from './modals/blood-separation-center-update-modal/blood-separation-center-update-modal.component';
import {
  BloodTestCenterAddModalComponent,
} from './modals/blood-test-center-add-modal/blood-test-center-add-modal.component';
import {
  BloodTestCenterAssignStaffsModalComponent,
} from './modals/blood-test-center-assign-staffs-modal/blood-test-center-assign-staffs-modal.component';
import {
  BloodTestCenterDeleteModalComponent,
} from './modals/blood-test-center-delete-modal/blood-test-center-delete-modal.component';
import {
  BloodTestCenterPhotoManagerModalComponent,
} from './modals/blood-test-center-photo-manager-modal/blood-test-center-photo-manager-modal.component';
import {
  BloodTestCenterUpdateModalComponent,
} from './modals/blood-test-center-update-modal/blood-test-center-update-modal.component';
import { HospitalAddModalComponent } from './modals/hospital-add-modal/hospital-add-modal.component';
import {
  HospitalAssignStaffsModalComponent,
} from './modals/hospital-assign-staffs-modal/hospital-assign-staffs-modal.component';
import { HospitalDeleteModalComponent } from './modals/hospital-delete-modal/hospital-delete-modal.component';
import {
  HospitalPhotoManagerModalComponent,
} from './modals/hospital-photo-manager-modal/hospital-photo-manager-modal.component';
import { HospitalUpdateModalComponent } from './modals/hospital-update-modal/hospital-update-modal.component';
import { TestTypeAddModalComponent } from './modals/test-type-add-modal/test-type-add-modal.component';
import { TestTypeDeleteModalComponent } from './modals/test-type-delete-modal/test-type-delete-modal.component';
import { TestTypeUpdateModalComponent } from './modals/test-type-update-modal/test-type-update-modal.component';
import { UserUpdateSuccessModalComponent } from './modals/user-update-success-modal/user-update-success-modal.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserManagerComponent,
    AdminUserManagerUpdateUserComponent,
    AdminTestTypeManagerComponent,
    AdminBloodProductTypeManagerComponent,
    AdminBloodCampManagerComponent,
    AdminBloodTestCenterManagerComponent,
    AdminBloodSeparationCenterManagerComponent,
    AdminBloodBankManagerComponent,
    AdminHospitalManagerComponent,
    AdminAwardManagerComponent,
    AdminBloodPackManagerComponent,
    UserUpdateSuccessModalComponent,
    TestTypeAddModalComponent,
    TestTypeUpdateModalComponent,
    TestTypeDeleteModalComponent,
    BloodProductTypeAddModalComponent,
    BloodProductTypeUpdateModalComponent,
    BloodProductTypeDeleteModalComponent,
    BloodCampAddModalComponent,
    BloodCampUpdateModalComponent,
    BloodCampDeleteModalComponent,
    BloodCampAssignStaffsModalComponent,
    BloodCampPhotoManagerModalComponent,
    BloodTestCenterAddModalComponent,
    BloodTestCenterUpdateModalComponent,
    BloodTestCenterDeleteModalComponent,
    BloodTestCenterAssignStaffsModalComponent,
    BloodTestCenterPhotoManagerModalComponent,
    BloodSeparationCenterAddModalComponent,
    BloodSeparationCenterUpdateModalComponent,
    BloodSeparationCenterDeleteModalComponent,
    BloodSeparationCenterAssignStaffsModalComponent,
    BloodSeparationCenterPhotoManagerModalComponent,
    BloodBankAddModalComponent,
    BloodBankUpdateModalComponent,
    BloodBankDeleteModalComponent,
    BloodBankAssignStaffsModalComponent,
    BloodBankPhotoManagerModalComponent,
    HospitalAddModalComponent,
    HospitalUpdateModalComponent,
    HospitalDeleteModalComponent,
    HospitalAssignStaffsModalComponent,
    HospitalPhotoManagerModalComponent,
    AwardAddModalComponent,
    AwardUpdateModalComponent
  ],
  imports: [
    SharedModule,
    DatatableModule,
    AdminRoutingModule
  ],
  entryComponents: [
    UserUpdateSuccessModalComponent,
    TestTypeAddModalComponent,
    TestTypeUpdateModalComponent,
    TestTypeDeleteModalComponent,
    BloodProductTypeAddModalComponent,
    BloodProductTypeUpdateModalComponent,
    BloodProductTypeDeleteModalComponent,
    BloodCampAddModalComponent,
    BloodCampUpdateModalComponent,
    BloodCampDeleteModalComponent,
    BloodCampAssignStaffsModalComponent,
    BloodCampPhotoManagerModalComponent,
    BloodTestCenterAddModalComponent,
    BloodTestCenterUpdateModalComponent,
    BloodTestCenterDeleteModalComponent,
    BloodTestCenterAssignStaffsModalComponent,
    BloodTestCenterPhotoManagerModalComponent,
    BloodSeparationCenterAddModalComponent,
    BloodSeparationCenterUpdateModalComponent,
    BloodSeparationCenterDeleteModalComponent,
    BloodSeparationCenterAssignStaffsModalComponent,
    BloodSeparationCenterPhotoManagerModalComponent,
    BloodBankAddModalComponent,
    BloodBankUpdateModalComponent,
    BloodBankDeleteModalComponent,
    BloodBankAssignStaffsModalComponent,
    BloodBankPhotoManagerModalComponent,
    HospitalAddModalComponent,
    HospitalUpdateModalComponent,
    HospitalDeleteModalComponent,
    HospitalAssignStaffsModalComponent,
    HospitalPhotoManagerModalComponent,
    AwardAddModalComponent,
    AwardUpdateModalComponent
  ]
})
export class AdminModule { }

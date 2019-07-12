import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
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
import { AdminUserManagerComponent } from './components/admin-user-manager/admin-user-manager.component';
import { BloodBankAddModalComponent } from './modals/blood-bank-add-modal/blood-bank-add-modal.component';
import {
  BloodBankAssignStaffsModalComponent,
} from './modals/blood-bank-assign-staffs-modal/blood-bank-assign-staffs-modal.component';
import { BloodBankDeleteModalComponent } from './modals/blood-bank-delete-modal/blood-bank-delete-modal.component';
import { BloodBankUpdateModalComponent } from './modals/blood-bank-update-modal/blood-bank-update-modal.component';
import { BloodCampAddModalComponent } from './modals/blood-camp-add-modal/blood-camp-add-modal.component';
import {
  BloodCampAssignStaffsModalComponent,
} from './modals/blood-camp-assign-staffs-modal/blood-camp-assign-staffs-modal.component';
import { BloodCampDeleteModalComponent } from './modals/blood-camp-delete-modal/blood-camp-delete-modal.component';
import { BloodCampUpdateModalComponent } from './modals/blood-camp-update-modal/blood-camp-update-modal.component';
import {
  BloodProductTypeAddModalComponent,
} from './modals/blood-product-type-add-modal/blood-product-type-add-modal.component';
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
  BloodTestCenterUpdateModalComponent,
} from './modals/blood-test-center-update-modal/blood-test-center-update-modal.component';
import { HospitalAddModalComponent } from './modals/hospital-add-modal/hospital-add-modal.component';
import {
  HospitalAssignStaffsModalComponent,
} from './modals/hospital-assign-staffs-modal/hospital-assign-staffs-modal.component';
import { HospitalDeleteModalComponent } from './modals/hospital-delete-modal/hospital-delete-modal.component';
import { HospitalUpdateModalComponent } from './modals/hospital-update-modal/hospital-update-modal.component';
import { TestTypeAddModalComponent } from './modals/test-type-add-modal/test-type-add-modal.component';
import { TestTypeDeleteModalComponent } from './modals/test-type-delete-modal/test-type-delete-modal.component';
import { TestTypeUpdateModalComponent } from './modals/test-type-update-modal/test-type-update-modal.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserManagerComponent,
    AdminTestTypeManagerComponent,
    AdminBloodCampManagerComponent,
    AdminBloodTestCenterManagerComponent,
    AdminBloodSeparationCenterManagerComponent,
    AdminBloodBankManagerComponent,
    AdminHospitalManagerComponent,
    TestTypeAddModalComponent,
    TestTypeUpdateModalComponent,
    TestTypeDeleteModalComponent,
    BloodCampAddModalComponent,
    BloodCampUpdateModalComponent,
    BloodCampDeleteModalComponent,
    BloodCampAssignStaffsModalComponent,
    BloodTestCenterAddModalComponent,
    BloodTestCenterUpdateModalComponent,
    BloodTestCenterDeleteModalComponent,
    BloodTestCenterAssignStaffsModalComponent,
    BloodSeparationCenterAddModalComponent,
    BloodSeparationCenterUpdateModalComponent,
    BloodSeparationCenterDeleteModalComponent,
    BloodSeparationCenterAssignStaffsModalComponent,
    BloodBankAddModalComponent,
    BloodBankUpdateModalComponent,
    BloodBankDeleteModalComponent,
    BloodBankAssignStaffsModalComponent,
    HospitalAddModalComponent,
    HospitalUpdateModalComponent,
    HospitalDeleteModalComponent,
    HospitalAssignStaffsModalComponent,
    AdminBloodPackManagerComponent,
    AdminBloodProductTypeManagerComponent,
    BloodProductTypeAddModalComponent,
    BloodProductTypeUpdateModalComponent,
  ],
  imports: [
    SharedModule,
    DatatableModule,
    AdminRoutingModule
  ],
  entryComponents: [
    TestTypeAddModalComponent,
    TestTypeUpdateModalComponent,
    TestTypeDeleteModalComponent,
    BloodCampAddModalComponent,
    BloodCampUpdateModalComponent,
    BloodCampDeleteModalComponent,
    BloodCampAssignStaffsModalComponent,
    BloodTestCenterAddModalComponent,
    BloodTestCenterUpdateModalComponent,
    BloodTestCenterDeleteModalComponent,
    BloodTestCenterAssignStaffsModalComponent,
    BloodSeparationCenterAddModalComponent,
    BloodSeparationCenterUpdateModalComponent,
    BloodSeparationCenterDeleteModalComponent,
    BloodSeparationCenterAssignStaffsModalComponent,
    BloodBankAddModalComponent,
    BloodBankUpdateModalComponent,
    BloodBankDeleteModalComponent,
    BloodBankAssignStaffsModalComponent,
    HospitalAddModalComponent,
    HospitalUpdateModalComponent,
    HospitalDeleteModalComponent,
    HospitalAssignStaffsModalComponent,
    BloodProductTypeAddModalComponent,
    BloodProductTypeUpdateModalComponent
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleName } from '../core/constant/role-name';
import { HasRoleGuard } from '../core/guards/has-role.guard';
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
  HospitalBloodProductManagerComponent,
} from './components/hospital-blood-product-manager/hospital-blood-product-manager.component';
import {
  ManagerBloodProductManagerComponent,
} from './components/manager-blood-product-manager/manager-blood-product-manager.component';
import {
  ManagerUserManagerAddUserComponent,
} from './components/manager-user-manager-add-user/manager-user-manager-add-user.component';
import {
  ManagerUserManagerUserDetailComponent,
} from './components/manager-user-manager-user-detail/manager-user-manager-user-detail.component';
import { ManagerUserManagerComponent } from './components/manager-user-manager/manager-user-manager.component';
import { UserResolver } from './resolvers/user.resolver';

const routes: Routes = [
  {
    path: 'manager',
    data: { breadcrumb: 'breadcrumb.manager.main' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'users',
        canActivate: [HasRoleGuard],
        data: {
          roles: [
            RoleName.ADMIN,
            RoleName.BLOOD_CAMP,
            RoleName.BLOOD_TEST_CENTER,
            RoleName.BLOOD_SEPARATION_CENTER,
            RoleName.BLOOD_BANK,
            RoleName.HOSPITAL
          ],
          breadcrumb: 'breadcrumb.manager.users'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ManagerUserManagerComponent
          },
          {
            path: 'add',
            component: ManagerUserManagerAddUserComponent,
            data: { breadcrumb: 'breadcrumb.manager.addUsers' }
          },
          {
            path: ':id',
            component: ManagerUserManagerUserDetailComponent,
            resolve: { user: UserResolver },
            data: { breadcrumb: 'breadcrumb.manager.userDetail' }
          }
        ]
      },
      {
        path: 'blood-products',
        component: ManagerBloodProductManagerComponent,
        canActivate: [HasRoleGuard],
        data: {
          roles: [
            RoleName.ADMIN,
            RoleName.BLOOD_CAMP,
            RoleName.BLOOD_TEST_CENTER,
            RoleName.BLOOD_SEPARATION_CENTER,
            RoleName.BLOOD_BANK,
            RoleName.HOSPITAL
          ],
          breadcrumb: 'breadcrumb.manager.bloodProducts'
        }
      },
      {
        path: 'blood-camp',
        canActivate: [HasRoleGuard],
        data: {
          roles: [RoleName.BLOOD_CAMP],
          breadcrumb: 'breadcrumb.bloodCamp.main'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'blood-packs'
          },
          {
            path: 'blood-packs',
            data: { breadcrumb: 'breadcrumb.bloodCamp.bloodPacks.main' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: BloodCampBloodPackManagerComponent
              },
              {
                path: 'add',
                component: BloodCampBloodPackManagerAddBloodPackComponent,
                data: { breadcrumb: 'breadcrumb.bloodCamp.bloodPacks.addBloodPack' }
              },
              {
                path: 'transfer',
                component: BloodCampBloodPackManagerTransferBloodPackComponent,
                data: { breadcrumb: 'breadcrumb.bloodCamp.bloodPacks.transferBloodPacks' }
              }
            ]
          }
        ]
      },
      {
        path: 'blood-test-center',
        canActivate: [HasRoleGuard],
        data: {
          roles: [RoleName.BLOOD_TEST_CENTER],
          breadcrumb: 'breadcrumb.bloodTestCenter.main'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'blood-packs'
          },
          {
            path: 'blood-packs',
            data: { breadcrumb: 'breadcrumb.bloodTestCenter.bloodPacks.main' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: BloodTestCenterBloodPackManagerComponent
              },
              {
                path: 'update',
                component: BloodTestCenterBloodPackManagerUpdateResultComponent,
                data: { breadcrumb: 'breadcrumb.bloodTestCenter.bloodPacks.updateTestResult' }
              },
              {
                path: 'transfer',
                component: BloodTestCenterBloodPackManagerTransferBloodPackComponent,
                data: { breadcrumb: 'breadcrumb.bloodTestCenter.bloodPacks.transferBloodPacks' }
              }
            ]
          }
        ]
      },
      {
        path: 'blood-separation-center',
        canActivate: [HasRoleGuard],
        data: {
          roles: [RoleName.BLOOD_SEPARATION_CENTER],
          breadcrumb: 'breadcrumb.bloodSeparationCenter.main'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'blood-packs'
          },
          {
            path: 'blood-packs',
            data: { breadcrumb: 'breadcrumb.bloodSeparationCenter.bloodPacks.main' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: BloodSeparationCenterBloodPackManagerComponent
              },
              {
                path: 'update',
                component: BloodSeparationCenterBloodPackManagerUpdateResultComponent,
                data: { breadcrumb: 'breadcrumb.bloodSeparationCenter.bloodPacks.updateSeparationResult' }
              }
            ]
          },
          {
            path: 'blood-products',
            data: { breadcrumb: 'breadcrumb.bloodSeparationCenter.bloodProducts.main' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: BloodSeparationCenterBloodProductManagerComponent
              },
              {
                path: 'transfer',
                component: BloodSeparationCenterBloodProductManagerTransferBloodProductComponent,
                data: { breadcrumb: 'breadcrumb.bloodSeparationCenter.bloodProducts.transferBloodProducts' }
              }
            ]
          }
        ]
      },
      {
        path: 'blood-bank',
        canActivate: [HasRoleGuard],
        data: {
          roles: [RoleName.BLOOD_BANK],
          breadcrumb: 'breadcrumb.bloodBank.main'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'blood-products'
          },
          {
            path: 'blood-products',
            data: { breadcrumb: 'breadcrumb.bloodBank.bloodProducts.main' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: BloodBankBloodProductManagerComponent
              },
              {
                path: 'transfer',
                component: BloodBankBloodProductManagerTransferBloodProductComponent,
                data: { breadcrumb: 'breadcrumb.bloodBank.bloodProducts.transferBloodProducts' }
              }
            ]
          }
        ]
      },
      {
        path: 'hospital',
        canActivate: [HasRoleGuard],
        data: {
          roles: [RoleName.HOSPITAL],
          breadcrumb: 'breadcrumb.hospital.main'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'blood-products'
          },
          {
            path: 'blood-products',
            data: { breadcrumb: 'breadcrumb.hospital.bloodProducts.main' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: HospitalBloodProductManagerComponent
              },
              {
                path: 'transfer',
                component: HospitalBloodProductManagerTransferBloodProductComponent,
                data: { breadcrumb: 'breadcrumb.bloodBank.bloodProducts.transferBloodProducts' }
              }
            ]
          }
        ]
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

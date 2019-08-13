import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { ProgressAnimationType, ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { SharedModule } from '../shared/shared.module';
import { HasRoleGuard } from './guards/has-role.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { BloodBankResolver } from './resolvers/blood-bank.resolver';
import { BloodCampResolver } from './resolvers/blood-camp.resolver';
import { BloodPackResolver } from './resolvers/blood-pack.resolver';
import { BloodProductResolver } from './resolvers/blood-product.resolver';
import { BloodSeparationCenterResolver } from './resolvers/blood-separation-center.resolver';
import { BloodTestCenterResolver } from './resolvers/blood-test-center.resolver';
import { CampaignResolver } from './resolvers/campaign.resolver';
import { HospitalResolver } from './resolvers/hospital.resolver';
import { MyUserResolver } from './resolvers/my-user.resolver';
import { TestTypesResolver } from './resolvers/test-types.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { AwardService } from './services/award.service';
import { BloodBankService } from './services/blood-bank.service';
import { BloodCampService } from './services/blood-camp.service';
import { BloodPackService } from './services/blood-pack.service';
import { BloodProductTypeService } from './services/blood-product-type.service';
import { BloodProductService } from './services/blood-product.service';
import { BloodSeparationCenterService } from './services/blood-separation-center.service';
import { BloodTestCenterService } from './services/blood-test-center.service';
import { CampaignService } from './services/campaign.service';
import { HospitalService } from './services/hospital.service';
import { RoleService } from './services/role.service';
import { StatisticService } from './services/statistic.service';
import { TestTypeService } from './services/test-type.service';
import { UserService } from './services/user.service';

export function tokenGetter() {
  return localStorage.getItem(environment.authTokenName);
}

const jwtOptions = {
  config: {
    tokenGetter,
    whitelistedDomains: environment.whitelistedDomains,
    blacklistedRoutes: environment.blacklistedRoutes
  }
};

const toastrOptions = {
  timeOut: 5000,
  positionClass: 'toast-bottom-right',
  progressBar: true,
  progressAnimation: 'increasing' as ProgressAnimationType
};

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forChild([]),
    BrowserAnimationsModule,
    JwtModule.forRoot(jwtOptions),
    ToastrModule.forRoot(toastrOptions),
    SharedModule
  ],
  providers: [
    AuthService,
    NotLoggedInGuard,
    HasRoleGuard,
    AlertService,
    UserService,
    RoleService,
    TestTypeService,
    BloodProductTypeService,
    BloodCampService,
    BloodTestCenterService,
    BloodSeparationCenterService,
    BloodBankService,
    HospitalService,
    BloodPackService,
    BloodProductService,
    CampaignService,
    AwardService,
    StatisticService,
    TestTypesResolver,
    UserResolver,
    MyUserResolver,
    BloodCampResolver,
    BloodTestCenterResolver,
    BloodSeparationCenterResolver,
    BloodBankResolver,
    HospitalResolver,
    CampaignResolver,
    BloodPackResolver,
    BloodProductResolver,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}

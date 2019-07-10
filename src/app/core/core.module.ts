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
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { BloodBankService } from './services/blood-bank.service';
import { BloodCampService } from './services/blood-camp.service';
import { BloodPackService } from './services/blood-pack.service';
import { BloodSeparationCenterService } from './services/blood-separation-center.service';
import { BloodTestCenterService } from './services/blood-test-center.service';
import { HospitalService } from './services/hospital.service';
import { RoleService } from './services/role.service';
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
    BloodCampService,
    BloodTestCenterService,
    BloodSeparationCenterService,
    BloodBankService,
    HospitalService,
    BloodPackService,
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

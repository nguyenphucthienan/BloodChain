import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { SidebarModule } from 'ng-sidebar';
import { ProgressAnimationType, ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { SharedModule } from '../shared/shared.module';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

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
    SidebarModule.forRoot(),
    SharedModule
  ],
  providers: [
    AuthService,
    NotLoggedInGuard,
    AlertService
  ],
  exports:[
    SidebarModule.forRoot().ngModule
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}

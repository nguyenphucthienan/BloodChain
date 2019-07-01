import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HasRoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private translate: TranslateService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const roles = route.data.roles as Array<string>;
      if (roles) {
        if (this.authService.isRoleMatch(roles)) {
          return true;
        } else {
          this.translate.get('common.alert.cannotAccess')
            .subscribe(cannotAccess => this.alertService.error(cannotAccess));

          this.router.navigate(['/']);
          return false;
        }
      }

      return false;
    } else {
      this.translate.get('common.alert.cannotAccess')
        .subscribe(cannotAccess => this.alertService.error(cannotAccess));

      this.router.navigate(['/']);
      return false;
    }
  }

}

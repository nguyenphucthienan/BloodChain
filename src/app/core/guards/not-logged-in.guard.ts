import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotLoggedInGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private translate: TranslateService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      this.translate.get('common.alert.alreadyLoggedIn')
        .subscribe(alreadyLoggedIn => this.alertService.info(alreadyLoggedIn));

      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}

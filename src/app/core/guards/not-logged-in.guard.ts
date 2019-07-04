import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotLoggedInGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      this.alertService.info('common.alert.alreadyLoggedIn');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}

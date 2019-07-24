import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';

import { AuthService } from '../services/auth.service';

@Injectable()
export class MyUserResolver implements Resolve<User> {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.authService.getMyUserInfo()
      .pipe(
        catchError(error => {
          this.alertService.error('common.alert.getDataFailed');
          this.router.navigate(['/404']);
          return of(null);
        })
      );
  }

}

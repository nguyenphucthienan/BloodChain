import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserService } from 'src/app/core/services/user.service';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const userId = route.paramMap.get('id');
    return this.userService.getUser(userId)
      .pipe(
        catchError(error => {
          this.alertService.error('common.alert.getDataFailed');
          this.router.navigate(['/manager', 'users']);
          return of(null);
        })
      );
  }

}

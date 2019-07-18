import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';

@Injectable()
export class BloodPackResolver implements Resolve<BloodPack> {

  constructor(
    private router: Router,
    private bloodPackService: BloodPackService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<BloodPack> {
    const bloodPackId = route.paramMap.get('id');
    return this.bloodPackService.getBloodPack(bloodPackId)
      .pipe(
        catchError(error => {
          this.alertService.error('common.alert.getDataFailed');
          this.router.navigate(['/404']);
          return of(null);
        })
      );
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

import { BloodTestCenter } from '../models/blood-test-center.interface';
import { BloodTestCenterService } from '../services/blood-test-center.service';

@Injectable()
export class BloodTestCenterResolver implements Resolve<BloodTestCenter> {

  constructor(
    private router: Router,
    private bloodTestCenterService: BloodTestCenterService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<BloodTestCenter> {
    const bloodTestCenterId = route.paramMap.get('id');
    return this.bloodTestCenterService.getBloodTestCenter(bloodTestCenterId)
      .pipe(
        catchError(error => {
          this.alertService.error('common.alert.getDataFailed');
          this.router.navigate(['/404']);
          return of(null);
        })
      );
  }

}

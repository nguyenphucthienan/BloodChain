import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

import { BloodSeparationCenter } from '../models/blood-separation-center.interface';
import { BloodSeparationCenterService } from '../services/blood-separation-center.service';

@Injectable()
export class BloodSeparationCenterResolver implements Resolve<BloodSeparationCenter> {

  constructor(
    private router: Router,
    private bloodSeparationCenterService: BloodSeparationCenterService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<BloodSeparationCenter> {
    const bloodSeparationCenterId = route.paramMap.get('id');
    return this.bloodSeparationCenterService.getBloodSeparationCenter(bloodSeparationCenterId)
      .pipe(
        catchError(error => {
          this.alertService.error('common.alert.getDataFailed');
          this.router.navigate(['/404']);
          return of(null);
        })
      );
  }

}

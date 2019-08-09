import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

import { BloodCamp } from '../models/blood-camp.interface';
import { BloodCampService } from '../services/blood-camp.service';

@Injectable()
export class BloodCampResolver implements Resolve<BloodCamp> {

  constructor(
    private router: Router,
    private bloodCampService: BloodCampService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<BloodCamp> {
    const bloodCampId = route.paramMap.get('id');
    return this.bloodCampService.getBloodCamp(bloodCampId)
      .pipe(
        catchError(error => {
          this.alertService.error('common.alert.getDataFailed');
          this.router.navigate(['/404']);
          return of(null);
        })
      );
  }

}

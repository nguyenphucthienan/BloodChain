import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Hospital } from '../models/hospital.interface';
import { AlertService } from '../services/alert.service';
import { HospitalService } from '../services/hospital.service';

@Injectable()
export class HospitalResolver implements Resolve<Hospital> {

  constructor(
    private router: Router,
    private hospitalService: HospitalService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Hospital> {
    const hospitalId = route.paramMap.get('id');
    return this.hospitalService.getHospital(hospitalId)
      .pipe(
        catchError(error => {
          this.alertService.error('common.alert.getDataFailed');
          this.router.navigate(['/404']);
          return of(null);
        })
      );
  }

}

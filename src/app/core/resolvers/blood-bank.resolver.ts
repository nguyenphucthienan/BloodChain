import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

import { BloodBank } from '../models/blood-bank.interface';
import { BloodBankService } from '../services/blood-bank.service';

@Injectable()
export class BloodBankResolver implements Resolve<BloodBank> {

  constructor(
    private router: Router,
    private bloodBankService: BloodBankService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<BloodBank> {
    const bloodBankId = route.paramMap.get('id');
    return this.bloodBankService.getBloodBank(bloodBankId)
      .pipe(
        catchError(error => {
          this.alertService.error('common.alert.getDataFailed');
          this.router.navigate(['/404']);
          return of(null);
        })
      );
  }

}

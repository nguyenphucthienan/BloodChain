import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BloodProduct } from 'src/app/core/models/blood-product.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { BloodProductService } from 'src/app/core/services/blood-product.service';

@Injectable()
export class BloodProductResolver implements Resolve<BloodProduct> {

  constructor(
    private router: Router,
    private bloodProductService: BloodProductService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<BloodProduct> {
    const bloodPackId = route.paramMap.get('id');
    return this.bloodProductService.getBloodProduct(bloodPackId)
      .pipe(
        catchError(error => {
          this.alertService.error('common.alert.getDataFailed');
          this.router.navigate(['/404']);
          return of(null);
        })
      );
  }

}

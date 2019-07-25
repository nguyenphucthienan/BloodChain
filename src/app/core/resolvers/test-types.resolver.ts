import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

import { TestType } from '../models/test-type.interface';
import { TestTypeService } from '../services/test-type.service';

@Injectable()
export class TestTypesResolver implements Resolve<TestType[]> {

  constructor(
    private router: Router,
    private testTypeService: TestTypeService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<TestType[]> {
    return this.testTypeService.getAllTestTypes()
      .pipe(
        catchError(error => {
          this.alertService.error('common.alert.getDataFailed');
          this.router.navigate(['/404']);
          return of(null);
        })
      );
  }

}

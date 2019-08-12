import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

import { Campaign } from '../models/campaign.interface';
import { CampaignService } from '../services/campaign.service';

@Injectable()
export class CampaignResolver implements Resolve<Campaign> {

  constructor(
    private router: Router,
    private campaignService: CampaignService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Campaign> {
    const campaignId = route.paramMap.get('id');
    return this.campaignService.getCampaign(campaignId)
      .pipe(
        catchError(error => {
          this.alertService.error('common.alert.getDataFailed');
          this.router.navigate(['/404']);
          return of(null);
        })
      );
  }

}

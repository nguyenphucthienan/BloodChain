import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class StatisticService {

  private readonly landingStatisticsUrl = `${environment.apiUrl}/statistics/landing`;

  constructor(private http: HttpClient) { }

  getLandingStatistics(): Observable<any> {
    return this.http.get<any>(this.landingStatisticsUrl);
  }

}

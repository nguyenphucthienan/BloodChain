import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { BloodPack } from '../models/blood-pack.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';

@Injectable()
export class BloodPackService {

  private readonly bloodPacksUrl = `${environment.apiUrl}/blood-packs`;
  private readonly bloodPackUrl = `${environment.apiUrl}/blood-packs/{id}`;
  private readonly transferToBloodTestCenterUrl = `${environment.apiUrl}/blood-packs/transfer/blood-test-center`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getBloodPacks(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<BloodPack[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<BloodPack[]>(`${this.bloodPacksUrl}`, { params });
  }

  getBloodPack(id: string): Observable<BloodPack> {
    const url = UrlUtils.resolvePathVariables(this.bloodPackUrl, { id });
    return this.http.get<BloodPack>(url);
  }

  createBloodPack(bloodPack: BloodPack): Observable<BloodPack> {
    return this.http.post<BloodPack>(`${this.bloodPacksUrl}`, bloodPack);
  }

  updateBloodPack(id: string, bloodPack: BloodPack): Observable<BloodPack> {
    const url = UrlUtils.resolvePathVariables(this.bloodPackUrl, { id });
    return this.http.put<BloodPack>(url, bloodPack);
  }

  deleteBloodPack(id: string): Observable<BloodPack> {
    const url = UrlUtils.resolvePathVariables(this.bloodPackUrl, { id });
    return this.http.delete<BloodPack>(url);
  }

  transferBloodPacksToBloodTestCenter(transferModel: any): Observable<any> {
    return this.http.post<any>(this.transferToBloodTestCenterUrl, transferModel);
  }

}

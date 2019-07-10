import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { BloodTestCenter } from '../models/blood-test-center.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { User } from '../models/user.interface';

@Injectable()
export class BloodTestCenterService {

  private readonly bloodTestCentersUrl = `${environment.apiUrl}/blood-test-centers`;
  private readonly bloodTestCenterUrl = `${environment.apiUrl}/blood-test-centers/{id}`;
  private readonly bloodTestCenterStaffsUrl = `${environment.apiUrl}/blood-test-centers/{id}/staffs`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getBloodTestCenters(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<BloodTestCenter[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<BloodTestCenter[]>(`${this.bloodTestCentersUrl}`, { params });
  }

  getBloodTestCenter(id: string): Observable<BloodTestCenter> {
    const url = UrlUtils.resolvePathVariables(this.bloodTestCenterUrl, { id });
    return this.http.get<BloodTestCenter>(url);
  }

  createBloodTestCenter(bloodTestCenter: BloodTestCenter): Observable<BloodTestCenter> {
    return this.http.post<BloodTestCenter>(`${this.bloodTestCentersUrl}`, bloodTestCenter);
  }

  updateBloodTestCenter(id: string, bloodTestCenter: BloodTestCenter): Observable<BloodTestCenter> {
    const url = UrlUtils.resolvePathVariables(this.bloodTestCenterUrl, { id });
    return this.http.put<BloodTestCenter>(url, bloodTestCenter);
  }

  deleteBloodTestCenter(id: string): Observable<BloodTestCenter> {
    const url = UrlUtils.resolvePathVariables(this.bloodTestCenterUrl, { id });
    return this.http.delete<BloodTestCenter>(url);
  }

  getStaffsOfBloodTestCenter(id: string): Observable<User[]> {
    const url = UrlUtils.resolvePathVariables(this.bloodTestCenterStaffsUrl, { id });
    return this.http.get<User[]>(url);
  }

  searchBloodTestCenters(name: string): Observable<BloodTestCenter[]> {
    const params = new ParamsBuilder()
      .setParam('name', name)
      .applySort({ sortBy: 'name', isSortAscending: true })
      .build();

    return this.http.get<BloodTestCenter[]>(this.bloodTestCentersUrl, { params });
  }

}

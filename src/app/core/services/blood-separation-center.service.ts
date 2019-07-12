import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { BloodSeparationCenter } from '../models/blood-separation-center.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class BloodSeparationCenterService {

  private readonly bloodSeparationCentersUrl = `${environment.apiUrl}/blood-separation-centers`;
  private readonly bloodSeparationCenterUrl = `${environment.apiUrl}/blood-separation-centers/{id}`;
  private readonly bloodSeparationCenterStaffsUrl = `${environment.apiUrl}/blood-separation-centers/{id}/staffs`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getBloodSeparationCenters(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<BloodSeparationCenter[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<BloodSeparationCenter[]>(`${this.bloodSeparationCentersUrl}`, { params });
  }

  getBloodSeparationCenter(id: string): Observable<BloodSeparationCenter> {
    const url = UrlUtils.resolvePathVariables(this.bloodSeparationCenterUrl, { id });
    return this.http.get<BloodSeparationCenter>(url);
  }

  createBloodSeparationCenter(bloodSeparationCenter: BloodSeparationCenter): Observable<BloodSeparationCenter> {
    return this.http.post<BloodSeparationCenter>(`${this.bloodSeparationCentersUrl}`, bloodSeparationCenter);
  }

  updateBloodSeparationCenter(id: string, bloodSeparationCenter: BloodSeparationCenter): Observable<BloodSeparationCenter> {
    const url = UrlUtils.resolvePathVariables(this.bloodSeparationCenterUrl, { id });
    return this.http.put<BloodSeparationCenter>(url, bloodSeparationCenter);
  }

  deleteBloodSeparationCenter(id: string): Observable<BloodSeparationCenter> {
    const url = UrlUtils.resolvePathVariables(this.bloodSeparationCenterUrl, { id });
    return this.http.delete<BloodSeparationCenter>(url);
  }

  getStaffsOfBloodSeparationCenter(id: string): Observable<User[]> {
    const url = UrlUtils.resolvePathVariables(this.bloodSeparationCenterStaffsUrl, { id });
    return this.http.get<User[]>(url);
  }

  searchBloodSeparationCenters(name: string): Observable<BloodSeparationCenter[]> {
    const params = new ParamsBuilder()
      .setParam('name', name)
      .applySort({ sortBy: 'name', isSortAscending: true })
      .build();

    return this.http.get<BloodSeparationCenter[]>(this.bloodSeparationCentersUrl, { params });
  }

}

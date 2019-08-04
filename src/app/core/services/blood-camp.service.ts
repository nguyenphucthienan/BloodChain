import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { BloodCamp } from '../models/blood-camp.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { User } from '../models/user.interface';

@Injectable()
export class BloodCampService {

  private readonly bloodCampsUrl = `${environment.apiUrl}/blood-camps`;
  private readonly bloodCampUrl = `${environment.apiUrl}/blood-camps/{id}`;
  private readonly bloodCampStaffsUrl = `${environment.apiUrl}/blood-camps/{id}/staffs`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getBloodCamps(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<BloodCamp[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<BloodCamp[]>(this.bloodCampsUrl, { params });
  }

  getBloodCamp(id: string): Observable<BloodCamp> {
    const url = UrlUtils.resolvePathVariables(this.bloodCampUrl, { id });
    return this.http.get<BloodCamp>(url);
  }

  createBloodCamp(bloodCamp: BloodCamp): Observable<BloodCamp> {
    return this.http.post<BloodCamp>(this.bloodCampsUrl, bloodCamp);
  }

  updateBloodCamp(id: string, bloodCamp: BloodCamp): Observable<BloodCamp> {
    const url = UrlUtils.resolvePathVariables(this.bloodCampUrl, { id });
    return this.http.put<BloodCamp>(url, bloodCamp);
  }

  deleteBloodCamp(id: string): Observable<BloodCamp> {
    const url = UrlUtils.resolvePathVariables(this.bloodCampUrl, { id });
    return this.http.delete<BloodCamp>(url);
  }

  getStaffsOfBloodCamp(id: string): Observable<User[]> {
    const url = UrlUtils.resolvePathVariables(this.bloodCampStaffsUrl, { id });
    return this.http.get<User[]>(url);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Hospital } from '../models/hospital.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { User } from '../models/user.interface';

@Injectable()
export class HospitalService {

  private readonly hospitalsUrl = `${environment.apiUrl}/hospitals`;
  private readonly hospitalUrl = `${environment.apiUrl}/hospitals/{id}`;
  private readonly hospitalStaffsUrl = `${environment.apiUrl}/hospitals/{id}/staffs`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getHospitals(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<Hospital[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Hospital[]>(this.hospitalsUrl, { params });
  }

  getHospital(id: string): Observable<Hospital> {
    const url = UrlUtils.resolvePathVariables(this.hospitalUrl, { id });
    return this.http.get<Hospital>(url);
  }

  createHospital(hospital: Hospital): Observable<Hospital> {
    return this.http.post<Hospital>(this.hospitalsUrl, hospital);
  }

  updateHospital(id: string, hospital: Hospital): Observable<Hospital> {
    const url = UrlUtils.resolvePathVariables(this.hospitalUrl, { id });
    return this.http.put<Hospital>(url, hospital);
  }

  deleteHospital(id: string): Observable<Hospital> {
    const url = UrlUtils.resolvePathVariables(this.hospitalUrl, { id });
    return this.http.delete<Hospital>(url);
  }

  getStaffsOfHospital(id: string): Observable<User[]> {
    const url = UrlUtils.resolvePathVariables(this.hospitalStaffsUrl, { id });
    return this.http.get<User[]>(url);
  }

  searchHospitals(name: string): Observable<Hospital[]> {
    const params = new ParamsBuilder()
      .setParam('name', name)
      .applySort({ sortBy: 'name', isSortAscending: true })
      .build();

    return this.http.get<Hospital[]>(this.hospitalsUrl, { params });
  }

}

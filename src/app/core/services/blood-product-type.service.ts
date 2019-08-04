import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { BloodProductType } from '../models/blood-product-type.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';

@Injectable()
export class BloodProductTypeService {

  private readonly allBloodProductTypesUrl = `${environment.apiUrl}/blood-product-types/all`;
  private readonly bloodProductTypesUrl = `${environment.apiUrl}/blood-product-types`;
  private readonly bloodProductTypeUrl = `${environment.apiUrl}/blood-product-types/{id}`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getAllBloodProductTypes(): Observable<BloodProductType[]> {
    return this.http.get<BloodProductType[]>(this.allBloodProductTypesUrl);
  }

  getBloodProductTypes(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<BloodProductType[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<BloodProductType[]>(this.bloodProductTypesUrl, { params });
  }

  getBloodProductType(id: string): Observable<BloodProductType> {
    const url = UrlUtils.resolvePathVariables(this.bloodProductTypeUrl, { id });
    return this.http.get<BloodProductType>(url);
  }

  createBloodProductType(bloodProductType: BloodProductType): Observable<BloodProductType> {
    return this.http.post<BloodProductType>(this.bloodProductTypesUrl, bloodProductType);
  }

  updateBloodProductType(id: string, bloodProductType: BloodProductType): Observable<BloodProductType> {
    const url = UrlUtils.resolvePathVariables(this.bloodProductTypeUrl, { id });
    return this.http.put<BloodProductType>(url, bloodProductType);
  }

  deleteBloodProductType(id: string): Observable<BloodProductType> {
    const url = UrlUtils.resolvePathVariables(this.bloodProductTypeUrl, { id });
    return this.http.delete<BloodProductType>(url);
  }

}

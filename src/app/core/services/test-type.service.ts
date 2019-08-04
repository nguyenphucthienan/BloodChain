import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { TestType } from '../models/test-type.interface';

@Injectable()
export class TestTypeService {

  private readonly allTestTypesUrl = `${environment.apiUrl}/test-types/all`;
  private readonly testTypesUrl = `${environment.apiUrl}/test-types`;
  private readonly testTypeUrl = `${environment.apiUrl}/test-types/{id}`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getAllTestTypes(): Observable<TestType[]> {
    return this.http.get<TestType[]>(this.allTestTypesUrl);
  }

  getTestTypes(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<TestType[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<TestType[]>(this.testTypesUrl, { params });
  }

  getTestType(id: string): Observable<TestType> {
    const url = UrlUtils.resolvePathVariables(this.testTypeUrl, { id });
    return this.http.get<TestType>(url);
  }

  createTestType(testType: TestType): Observable<TestType> {
    return this.http.post<TestType>(this.testTypesUrl, testType);
  }

  updateTestType(id: string, testType: TestType): Observable<TestType> {
    const url = UrlUtils.resolvePathVariables(this.testTypeUrl, { id });
    return this.http.put<TestType>(url, testType);
  }

  deleteTestType(id: string): Observable<TestType> {
    const url = UrlUtils.resolvePathVariables(this.testTypeUrl, { id });
    return this.http.delete<TestType>(url);
  }

}

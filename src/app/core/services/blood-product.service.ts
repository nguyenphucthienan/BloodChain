import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { RoleName } from '../constant/role-name';
import { BloodProduct } from '../models/blood-product.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';

@Injectable()
export class BloodProductService {

  private readonly bloodProductsUrl = `${environment.apiUrl}/blood-products`;
  private readonly bloodProductUrl = `${environment.apiUrl}/blood-products/{id}`;
  private readonly transferProductsUrl = `${environment.apiUrl}/blood-products/transfer`;
  private readonly useProductsUrl = `${environment.apiUrl}/blood-products/use`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getBloodProducts(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<BloodProduct[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<BloodProduct[]>(`${this.bloodProductsUrl}`, { params });
  }

  getBloodProduct(id: string): Observable<BloodProduct> {
    const url = UrlUtils.resolvePathVariables(this.bloodProductUrl, { id });
    return this.http.get<BloodProduct>(url);
  }

  updateBloodProduct(id: string, bloodProduct: BloodProduct): Observable<BloodProduct> {
    const url = UrlUtils.resolvePathVariables(this.bloodProductUrl, { id });
    return this.http.put<BloodProduct>(url, bloodProduct);
  }

  deleteBloodProduct(id: string): Observable<BloodProduct> {
    const url = UrlUtils.resolvePathVariables(this.bloodProductUrl, { id });
    return this.http.delete<BloodProduct>(url);
  }

  transferBloodProducts(
    fromOrganizationType: RoleName,
    toOrganizationType: RoleName,
    transferModel: any
  ): Observable<any> {
    const model = { ...transferModel, fromOrganizationType, toOrganizationType };
    return this.http.post<any>(this.transferProductsUrl, model);
  }

  useBloodProducts(transferModel: any): Observable<any> {
    return this.http.post<any>(this.useProductsUrl, transferModel);
  }

}

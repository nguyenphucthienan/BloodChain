import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { BloodBank } from '../models/blood-bank.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { User } from '../models/user.interface';

@Injectable()
export class BloodBankService {

  private readonly bloodBanksUrl = `${environment.apiUrl}/blood-banks`;
  private readonly bloodBankUrl = `${environment.apiUrl}/blood-banks/{id}`;
  private readonly bloodBankStaffsUrl = `${environment.apiUrl}/blood-banks/{id}/staffs`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getBloodBanks(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<BloodBank[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<BloodBank[]>(`${this.bloodBanksUrl}`, { params });
  }

  getBloodBank(id: string): Observable<BloodBank> {
    const url = UrlUtils.resolvePathVariables(this.bloodBankUrl, { id });
    return this.http.get<BloodBank>(url);
  }

  createBloodBank(bloodBank: BloodBank): Observable<BloodBank> {
    return this.http.post<BloodBank>(`${this.bloodBanksUrl}`, bloodBank);
  }

  updateBloodBank(id: string, bloodBank: BloodBank): Observable<BloodBank> {
    const url = UrlUtils.resolvePathVariables(this.bloodBankUrl, { id });
    return this.http.put<BloodBank>(url, bloodBank);
  }

  deleteBloodBank(id: string): Observable<BloodBank> {
    const url = UrlUtils.resolvePathVariables(this.bloodBankUrl, { id });
    return this.http.delete<BloodBank>(url);
  }

  getStaffsOfBloodBank(id: string): Observable<User[]> {
    const url = UrlUtils.resolvePathVariables(this.bloodBankStaffsUrl, { id });
    return this.http.get<User[]>(url);
  }

}

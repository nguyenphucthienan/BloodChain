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
import { TransferHistory } from '../models/transfer-history.interface';

@Injectable()
export class BloodPackService {

  private readonly bloodPacksUrl = `${environment.apiUrl}/blood-packs`;
  private readonly myBloodPacksUrl = `${environment.apiUrl}/blood-packs/my-blood-packs`;
  private readonly bloodPackUrl = `${environment.apiUrl}/blood-packs/{id}`;
  private readonly bloodPackTransferHisoriesUrl = `${environment.apiUrl}/blood-packs/{id}/transfer-histories`;
  private readonly updateTestResultsUrl = `${environment.apiUrl}/blood-packs/{id}/test-results`;
  private readonly updateSeparationResultsUrl = `${environment.apiUrl}/blood-packs/{id}/separation-results`;
  private readonly transferToBloodTestCenterUrl = `${environment.apiUrl}/blood-packs/transfer/blood-test-center`;
  private readonly transferToBloodSeparationCenterUrl = `${environment.apiUrl}/blood-packs/transfer/blood-separation-center`;
  private readonly disposeUrl = `${environment.apiUrl}/blood-packs/dispose`;

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

    return this.http.get<BloodPack[]>(this.bloodPacksUrl, { params });
  }

  getMyBloodPacks(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<BloodPack[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<BloodPack[]>(this.myBloodPacksUrl, { params });
  }

  getBloodPack(id: string): Observable<BloodPack> {
    const url = UrlUtils.resolvePathVariables(this.bloodPackUrl, { id });
    return this.http.get<BloodPack>(url);
  }

  createBloodPack(bloodPack: BloodPack): Observable<BloodPack> {
    return this.http.post<BloodPack>(this.bloodPacksUrl, bloodPack);
  }

  updateBloodPack(id: string, bloodPack: BloodPack): Observable<BloodPack> {
    const url = UrlUtils.resolvePathVariables(this.bloodPackUrl, { id });
    return this.http.put<BloodPack>(url, bloodPack);
  }

  deleteBloodPack(id: string): Observable<BloodPack> {
    const url = UrlUtils.resolvePathVariables(this.bloodPackUrl, { id });
    return this.http.delete<BloodPack>(url);
  }

  getBloodPackTransferHistories(id: string): Observable<TransferHistory[]> {
    const url = UrlUtils.resolvePathVariables(this.bloodPackTransferHisoriesUrl, { id });
    return this.http.get<TransferHistory[]>(url);
  }

  updateBloodPackTestResults(id: string, updateTestResultModel: any): Observable<BloodPack> {
    const url = UrlUtils.resolvePathVariables(this.updateTestResultsUrl, { id });
    return this.http.put<BloodPack>(url, updateTestResultModel);
  }

  updateBloodPackSeparationResults(id: string, updateSeparationResultModel: any): Observable<BloodPack> {
    const url = UrlUtils.resolvePathVariables(this.updateSeparationResultsUrl, { id });
    return this.http.put<BloodPack>(url, updateSeparationResultModel);
  }

  transferBloodPacksToBloodTestCenter(transferModel: any): Observable<any> {
    return this.http.post<any>(this.transferToBloodTestCenterUrl, transferModel);
  }

  transferBloodPacksToBloodSeparationCenter(transferModel: any): Observable<any> {
    return this.http.post<any>(this.transferToBloodSeparationCenterUrl, transferModel);
  }

  disposeBloodPack(disposeModel: any): Observable<BloodPack> {
    return this.http.post<BloodPack>(this.disposeUrl, disposeModel);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { Campaign } from '../models/campaign.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';

@Injectable()
export class CampaignService {

  private readonly campaignsUrl = `${environment.apiUrl}/campaigns`;
  private readonly campaignUrl = `${environment.apiUrl}/campaigns/{id}`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getCampaigns(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<Campaign[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Campaign[]>(this.campaignsUrl, { params });
  }

  getCampaign(id: string): Observable<Campaign> {
    const url = UrlUtils.resolvePathVariables(this.campaignUrl, { id });
    return this.http.get<Campaign>(url);
  }

  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(this.campaignsUrl, campaign);
  }

  updateCampaign(id: string, campaign: Campaign): Observable<Campaign> {
    const url = UrlUtils.resolvePathVariables(this.campaignUrl, { id });
    return this.http.put<Campaign>(url, campaign);
  }

  deleteCampaign(id: string): Observable<Campaign> {
    const url = UrlUtils.resolvePathVariables(this.campaignUrl, { id });
    return this.http.delete<Campaign>(url);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { Reward } from '../models/reward.interface';
import { SortMode } from '../models/sort-mode.interface';

@Injectable()
export class RewardService {

  private readonly rewardsUrl = `${environment.apiUrl}/rewards`;
  private readonly rewardUrl = `${environment.apiUrl}/rewards/{id}`;
  private readonly deleteRewardPhotoUrl = `${environment.apiUrl}/rewards/{id}/photos/{photoId}`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getRewards(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<Reward[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Reward[]>(this.rewardsUrl, { params });
  }

  getReward(id: string): Observable<Reward> {
    const url = UrlUtils.resolvePathVariables(this.rewardUrl, { id });
    return this.http.get<Reward>(url);
  }

  createReward(reward: Reward): Observable<Reward> {
    return this.http.post<Reward>(this.rewardsUrl, reward);
  }

  updateReward(id: string, reward: Reward): Observable<Reward> {
    const url = UrlUtils.resolvePathVariables(this.rewardUrl, { id });
    return this.http.put<Reward>(url, reward);
  }

  deleteReward(id: string): Observable<Reward> {
    const url = UrlUtils.resolvePathVariables(this.rewardUrl, { id });
    return this.http.delete<Reward>(url);
  }

  deleteRewardPhoto(id: string, photoId: string): Observable<Reward> {
    const url = UrlUtils.resolvePathVariables(this.deleteRewardPhotoUrl, { id, photoId });
    return this.http.delete<Reward>(url);
  }

}

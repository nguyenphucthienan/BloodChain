import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { Award } from '../models/award.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';

@Injectable()
export class AwardService {

  private readonly awardsUrl = `${environment.apiUrl}/awards`;
  private readonly awardUrl = `${environment.apiUrl}/awards/{id}`;
  private readonly deleteAwardPhotoUrl = `${environment.apiUrl}/awards/{id}/photos/{photoId}`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getAwards(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<Award[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Award[]>(this.awardsUrl, { params });
  }

  getAward(id: string): Observable<Award> {
    const url = UrlUtils.resolvePathVariables(this.awardUrl, { id });
    return this.http.get<Award>(url);
  }

  createAward(award: Award): Observable<Award> {
    return this.http.post<Award>(this.awardsUrl, award);
  }

  updateAward(id: string, award: Award): Observable<Award> {
    const url = UrlUtils.resolvePathVariables(this.awardUrl, { id });
    return this.http.put<Award>(url, award);
  }

  deleteAward(id: string): Observable<Award> {
    const url = UrlUtils.resolvePathVariables(this.awardUrl, { id });
    return this.http.delete<Award>(url);
  }

  deleteAwardPhoto(id: string, photoId: string): Observable<Award> {
    const url = UrlUtils.resolvePathVariables(this.deleteAwardPhotoUrl, { id, photoId });
    return this.http.delete<Award>(url);
  }

}

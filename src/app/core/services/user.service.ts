import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';
import { User } from '../models/user.interface';
import { RoleName } from '../constant/role-name';

@Injectable()
export class UserService {

  private readonly usersUrl = `${environment.apiUrl}/users`;
  private readonly userUrl = `${environment.apiUrl}/users/{id}`;
  private readonly userAssignOrganizationUrl = `${environment.apiUrl}/users/organizations`;

  private readonly defaultPagination: Pagination = {
    page: 1,
    size: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getUsers(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<User[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<User[]>(`${this.usersUrl}`, { params });
  }

  getUser(id: string): Observable<User> {
    const url = UrlUtils.resolvePathVariables(this.userUrl, { id });
    return this.http.get<User>(url);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}`, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    const url = UrlUtils.resolvePathVariables(this.userUrl, { id });
    return this.http.put<User>(url, user);
  }

  deleteUser(id: string): Observable<User> {
    const url = UrlUtils.resolvePathVariables(this.userUrl, { id });
    return this.http.delete<User>(url);
  }

  searchUsers(username: string): Observable<User[]> {
    const params = new ParamsBuilder()
      .setParam('username', username)
      .applySort({ sortBy: 'username', isSortAscending: true })
      .build();

    return this.http.get<User[]>(this.usersUrl, { params });
  }

  assignOrganization(userIds: any[], roleName: RoleName, organizationId: string): Observable<any> {
    return this.http.post<User[]>(this.userAssignOrganizationUrl, {
      userIds,
      roleName,
      organizationId
    });
  }

}

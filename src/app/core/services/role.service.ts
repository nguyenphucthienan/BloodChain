import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';

import { RoleName } from '../constant/role-name';
import { Role } from '../models/role.interface';

@Injectable()
export class RoleService {

  private readonly rolesUrl = `${environment.apiUrl}/roles`;
  private readonly roleUrl = `${environment.apiUrl}/roles/{id}`;

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesUrl);
  }

  getRole(id: string): Observable<Role> {
    const url = UrlUtils.resolvePathVariables(this.roleUrl, { id });
    return this.http.get<Role>(url);
  }

  getRoleByRoleName(roleName: RoleName): Observable<Role> {
    const params = new ParamsBuilder()
      .applyFilter({ name: roleName })
      .build();

    return this.http.get<Role>(this.rolesUrl, { params })
      .pipe(
        map((response: any) => {
          if (response.items.length > 0) {
            return response.items[0];
          }

          return null;
        })
      );
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  private readonly AUTH_URL = `${environment.apiUrl}/auth`;

  private jwtHelper = new JwtHelperService();
  private decodedToken: any;
  private decodedTokenSubject = new BehaviorSubject(this.decodedToken);
  decodedToken$ = this.decodedTokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  readTokenFromStorage() {
    if (this.isLoggedIn()) {
      const token = localStorage.getItem(environment.authTokenName);
      this.changeDecodedToken(token);
    } else {
      this.logout();
    }
  }

  isLoggedIn() {
    const token = localStorage.getItem(environment.authTokenName);
    return !this.jwtHelper.isTokenExpired(token);
  }

  register({ username, password, email, firstName, lastName }: any) {
    const user = { username, password, email, firstName, lastName };
    return this.http.post(`${this.AUTH_URL}/register`, user);
  }

  login(model: { username: string, password: string }) {
    return this.http.post(`${this.AUTH_URL}/login`, model)
      .pipe(
        map(({ accessToken }: any) => {
          if (accessToken) {
            const decodedToken = this.jwtHelper.decodeToken(accessToken);
            const userRoleNames = decodedToken.roles;

            if (userRoleNames.length > 0) {
              localStorage.setItem(environment.authTokenName, accessToken);
              this.changeDecodedToken(accessToken);
            } else {
              throw new Error('Not User');
            }
          }
        })
      );
  }

  logout() {
    this.changeDecodedToken(null);
    localStorage.removeItem(environment.authTokenName);
  }

  private changeDecodedToken(token: string) {
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.decodedTokenSubject.next(this.decodedToken);
  }

  getMyUserInfo() {
    const token = localStorage.getItem(environment.authTokenName);
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.AUTH_URL}/me`, { headers });
  }

  isRoleMatch(allowedRoles: string[]): boolean {
    let result = false;
    if (this.decodedToken) {
      const userRoles = this.decodedToken.roles as Array<string>;
      allowedRoles.forEach(allowedRole => {
        if (userRoles.includes(allowedRole)) {
          result = true;
          return;
        }
      });
    }

    return result;
  }

}

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { ServiceUrlConstants } from '../utils/service-url-constants';
import { CustomTokenObtainPair, TokenRefresh, User } from '../models/security.model';
import { SharedService } from './shared.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  signinURL: string = ServiceUrlConstants.SIGN_IN;
  signupURL: string = ServiceUrlConstants.SIGN_UP;
  refreshTokenURL: string = ServiceUrlConstants.REFRESH_TOKEN;
  isLoggedIn: boolean = false;

  username: any = {};
  refreshTokenTimeout: any;

  private authenticationObs$: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(private http: HttpClient,
              private router: Router,
              private _sharedService: SharedService,
              public translate: TranslateService) { }

  loginUser(userInfo: CustomTokenObtainPair): Observable<any> {
    return this.http.post<any>(`${this.baseURL}${this.signinURL}`, userInfo).pipe(map(user => {
        sessionStorage.setItem('accessToken', user.access);
        sessionStorage.setItem('user_id', user.user_id);
        this.isLoggedIn = true;
        this.username = user?.first_name;
        this.startRefreshTokenTimer();
        this.setAuthenticationObs(true);
        return user;
      }));
  }

  registerUser(registerInfo: User): Observable<any> {
    return this.http.post<any>(`${this.baseURL}${this.signupURL}`, registerInfo);
  }

  checkLogin(): any {
    return (sessionStorage.getItem('accessToken'));
  }

  logout() {
    this.stopRefreshTokenTimer();
    this.router.navigate(['/login']);
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.setAuthenticationObs(false);
    this._sharedService.handleSuccess(this.translate.instant('logoutSuccessTitle_TC'));
  }

  startRefreshTokenTimer() {
    const timeout = (Date.now() + (10 * 60 * 1000)) - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  refreshToken(): any {
    const tokenRefresh: TokenRefresh = {
      refresh: sessionStorage.getItem('refresh')
    };
    return this.http.post<any>(`${this.baseURL}${this.refreshTokenURL}`, tokenRefresh);
  }

  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  getToken() {
    return sessionStorage.getItem('accessToken');
  }
  isAunthenticated() {
    return sessionStorage.getItem('accessToken') != null;
  }
  getUserDetails() {
    return this.username;
  }
  getAuthenticationObs(): Observable<boolean> {
    return this.authenticationObs$.asObservable();
  }
  setAuthenticationObs(isAuthenticated: boolean) {
    this.authenticationObs$.next(isAuthenticated);
  }
}

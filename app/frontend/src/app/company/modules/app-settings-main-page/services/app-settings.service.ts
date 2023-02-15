import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AppSettings } from 'src/app/shared/models/company.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  appSettingsCrudURL: string = ServiceUrlConstants.APP_SETTINGS_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getAppSettingsList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.appSettingsCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  getAppSettingsId(appSettingsId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.appSettingsCrudURL}${appSettingsId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  appSettingsModifier(appSettings: AppSettings) {
    if (appSettings?.id) {
      return this.http.put<any>(`${this.baseURL}${this.appSettingsCrudURL}${appSettings?.id}/`, appSettings).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )     
    } else {
      return this.http.post<any>(`${this.baseURL}${this.appSettingsCrudURL}`, appSettings).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
  }

  removeAppSettings(appSettingsId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.appSettingsCrudURL}${appSettingsId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

}

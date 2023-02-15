import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { SiteToSite } from 'src/app/shared/models/studymanage.model';

@Injectable({
  providedIn: 'root'
})
export class SiteToSiteService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  siteToSiteCrudURL: string = ServiceUrlConstants.SITE_TO_SITE_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getSiteToSiteList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.siteToSiteCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getSiteToSiteById(siteToSiteId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.siteToSiteCrudURL}${siteToSiteId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  siteToSiteModifier(siteToSite: SiteToSite) {
    if (siteToSite.id) {
      return this.http.put<any>(`${this.baseURL}${this.siteToSiteCrudURL}${siteToSite.id}/`, siteToSite).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.siteToSiteCrudURL}`, siteToSite).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeSiteToSite(siteToSiteId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.siteToSiteCrudURL}${siteToSiteId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

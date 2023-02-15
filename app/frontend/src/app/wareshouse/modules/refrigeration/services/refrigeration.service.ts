import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Refrigeration } from 'src/app/shared/models/wareshouse.model';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class RefrigerationService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  refrigerationCrudURL: string = ServiceUrlConstants.REFRIGERATION_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getRefrigerationList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.refrigerationCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getRefrigerationById(refrigerationId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.refrigerationCrudURL}${refrigerationId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  refrigerationModifier(refrigeration: Refrigeration) {
    if (refrigeration?.id) {
      return this.http.put<any>(`${this.baseURL}${this.refrigerationCrudURL}${refrigeration?.id}/`, refrigeration).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.refrigerationCrudURL}`, refrigeration).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeRefrigeration(refrigerationId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.refrigerationCrudURL}${refrigerationId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

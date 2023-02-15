import { Injectable } from '@angular/core';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { catchError, Observable, of } from 'rxjs';
import { ExpireDateChange } from 'src/app/shared/models/studymanage.model';

@Injectable({
  providedIn: 'root'
})
export class ExpireDateChangeService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  expireDateChangeCrudURL: string = ServiceUrlConstants.EXPIRE_DATE_CHANGE_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getExpireDateChangeList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.expireDateChangeCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getExpireDateChangeById(expireDateChangeId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.expireDateChangeCrudURL}${expireDateChangeId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  expireDateChangeModifier(expireDateChange: ExpireDateChange) {
    if (expireDateChange.id) {
      return this.http.put<any>(`${this.baseURL}${this.expireDateChangeCrudURL}${expireDateChange.id}/`, expireDateChange).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.expireDateChangeCrudURL}`, expireDateChange).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeExpireDateChange(expireDateChangeId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.expireDateChangeCrudURL}${expireDateChangeId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

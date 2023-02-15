import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { CMTRFCreation } from 'src/app/shared/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class CmtrfService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  ctmrfCrudURL: string = ServiceUrlConstants.CTMRF_CRUD;
  batchProductTaggingListCrudURL: string = ServiceUrlConstants.BATCH_PRODUCT_TAGGING_LIST_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getCtmrfList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.ctmrfCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  ctmrfModifier(ctmrf: CMTRFCreation) {
    if (ctmrf?.id) {
      return this.http.put<any>(`${this.baseURL}${this.ctmrfCrudURL}${ctmrf?.id}/`, ctmrf).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
    return this.http.post<any>(`${this.baseURL}${this.ctmrfCrudURL}`, ctmrf).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  removeCtmrf(ctmrfId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.ctmrfCrudURL}${ctmrfId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  getBatchProductTaggingList(data: any): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.batchProductTaggingListCrudURL}${'?batch='}${data}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

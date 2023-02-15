import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { GRNDetails } from 'src/app/shared/models/inventory.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class GrnDetailsService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  grnDetailsCrudURL: string = ServiceUrlConstants.GRN_DETAILS_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getGRNDetailsList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.grnDetailsCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  getGRNDetailsById(grnDetailsId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.grnDetailsCrudURL}${grnDetailsId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  grnDetailsModifier(grnDetails: GRNDetails) {
    if (grnDetails?.id) {
      return this.http.put<any>(`${this.baseURL}${this.grnDetailsCrudURL}${grnDetails?.id}/`, grnDetails).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    } else {
      return this.http.post<any>(`${this.baseURL}${this.grnDetailsCrudURL}`, grnDetails).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
  }

  removeGRNDetails(grnDetailsId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.grnDetailsCrudURL}${grnDetailsId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

}

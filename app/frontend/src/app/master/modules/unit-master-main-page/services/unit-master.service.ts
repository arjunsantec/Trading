import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { UnitMaster } from 'src/app/shared/models/party.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class UnitMasterService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  unitMasterCrudURL: string = ServiceUrlConstants.UNIT_MASTER_CRUD

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getUnitMasterList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.unitMasterCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  getUnitMasterById(unitMasterId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.unitMasterCrudURL}${unitMasterId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }
  
  unitMasterModifier(unitMaster: UnitMaster) {
    if (unitMaster?.id) {
      return this.http.put<any>(`${this.baseURL}${this.unitMasterCrudURL}${unitMaster?.id}/`, unitMaster).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    } else {
      return this.http.post<any>(`${this.baseURL}${this.unitMasterCrudURL}`, unitMaster).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
  }

  removeUnitMaster(unitMasterId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.unitMasterCrudURL}${unitMasterId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
  
}

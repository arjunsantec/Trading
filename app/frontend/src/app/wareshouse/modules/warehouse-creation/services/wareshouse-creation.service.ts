import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { WareHouseCreation } from 'src/app/shared/models/wareshouse.model';

@Injectable({
  providedIn: 'root'
})
export class WareshouseCreationService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  wareHouseCreationCrudURL: string = ServiceUrlConstants.WAREHOUSE_CREATION_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }


    getWareHouseCreationList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.wareHouseCreationCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

    
    getWareHouseCreationById(wareHouseCreationId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.wareHouseCreationCrudURL}${wareHouseCreationId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
  
    WareHouseCreationModifier(wareHouseCreation: WareHouseCreation) {
      if (wareHouseCreation?.id) {
        return this.http.put<any>(`${this.baseURL}${this.wareHouseCreationCrudURL}${wareHouseCreation?.id}/`, wareHouseCreation).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})    
          })  
        )
      }
      return this.http.post<any>(`${this.baseURL}${this.wareHouseCreationCrudURL}`, wareHouseCreation).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )
    }
  
    removeWareHouseCreation(wareHouseCreationId: string | undefined): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.wareHouseCreationCrudURL}${wareHouseCreationId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )
    }
}

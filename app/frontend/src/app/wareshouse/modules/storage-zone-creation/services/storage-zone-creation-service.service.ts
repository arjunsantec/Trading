import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ZoneCreation } from 'src/app/shared/models/wareshouse.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';


@Injectable({
  providedIn: 'root'
})
export class StorageZoneCreationServiceService {
baseURL: string = ServiceUrlConstants.BASE_URL;
storageZoneCreationCrudURL: string=ServiceUrlConstants.STORAGE_ZONE_CRUD;
  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

    getStorageZoneCreationList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.storageZoneCreationCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

    
  getStorageZoneCreationById(storageZoneCreationId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.storageZoneCreationCrudURL}${storageZoneCreationId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
  getStorageZoneCreationByWareHouse(WareHouseId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.storageZoneCreationCrudURL}${'?warehouse='}${WareHouseId}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  
    StorageZoneCreationModifier(storageZoneCreation: ZoneCreation) {
      if (storageZoneCreation?.id) {
        return this.http.put<any>(`${this.baseURL}${this.storageZoneCreationCrudURL}${storageZoneCreation?.id}/`, storageZoneCreation).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})    
          })  
        )
      }
      return this.http.post<any>(`${this.baseURL}${this.storageZoneCreationCrudURL}`, storageZoneCreation).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )
    }
  
    removeStorageZoneCreation(storageZoneCreationId: any| undefined): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.storageZoneCreationCrudURL}${storageZoneCreationId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )
    }



}

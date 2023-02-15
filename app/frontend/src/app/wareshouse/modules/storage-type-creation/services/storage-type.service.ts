import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { StorageTypeCreation } from 'src/app/shared/models/wareshouse.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class StorageTypeService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  storageTypeCrudURL: string = ServiceUrlConstants.STORAGE_TYPE_CREATION_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }
  
    getStorageTypeList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.storageTypeCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  
    getStorageTypeById(storageTypeId: string): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.storageTypeCrudURL}${storageTypeId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }

    getStorageTypeByName(storageTypeName: string): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.storageTypeCrudURL}${'?storage_type='}${storageTypeName}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  
    storageTypeModifier(storageType: StorageTypeCreation) {
      if (storageType?.id) {
        return this.http.put<any>(`${this.baseURL}${this.storageTypeCrudURL}${storageType?.id}/`, storageType).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})
          })
        );
      } else {
        return this.http.post<any>(`${this.baseURL}${this.storageTypeCrudURL}`, storageType).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})
          })
        );
      }
    }
  
    removeStorageType(storageTypeId: string | undefined): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.storageTypeCrudURL}${storageTypeId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
    
}

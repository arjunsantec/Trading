import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { zoneLevelCreation, zoneLevels } from 'src/app/shared/models/wareshouse.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';



@Injectable({
  providedIn: 'root'
})
export class ZoneLevelCreationService {
  baseURL: string = ServiceUrlConstants.BASE_URL;
  zoneLevelCreationCrudURL: string=ServiceUrlConstants.ZONE_LEVEL_CRUD ;
  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }


    getZoneLevelCreationList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.zoneLevelCreationCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

    
  getZoneLevelCreationById(zoneLevelCreationId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.zoneLevelCreationCrudURL}${zoneLevelCreationId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getZoneLevelCreationByStorageZone(storageZoneId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.zoneLevelCreationCrudURL}${'?storage_zone='}${storageZoneId}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
  
  zoneLevelCreationModifier(zoneLevelCreation: zoneLevelCreation) {
      if (zoneLevelCreation?.id) {
        return this.http.put<any>(`${this.baseURL}${this.zoneLevelCreationCrudURL}${zoneLevelCreation?.id}/`, zoneLevelCreation).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})    
          })  
        )
      }
      return this.http.post<any>(`${this.baseURL}${this.zoneLevelCreationCrudURL}`, zoneLevelCreation).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )
    }
  
    removeZoneLevelCreation(zoneLevelCreationId: string | undefined): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.zoneLevelCreationCrudURL}${zoneLevelCreationId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )
    }


}

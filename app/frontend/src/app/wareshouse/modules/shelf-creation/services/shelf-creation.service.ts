import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { ShelfCreation } from 'src/app/shared/models/wareshouse.model';

@Injectable({
  providedIn: 'root'
})
export class ShelfCreationService {
  baseURL: string = ServiceUrlConstants.BASE_URL;
  shelfCreationCrudURL: string = ServiceUrlConstants.SHELF_CREATION_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

    getShelfCreationList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.shelfCreationCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

    
    getShelfCreationById(shelfCreationId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.shelfCreationCrudURL}${shelfCreationId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getShelfCreationByZoneLevelID(zone_levelId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.shelfCreationCrudURL}${'?zone_level='}${zone_levelId}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getShelfCreationByZoneRackLevel(zone_levelId: string, rack:string, level:string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.shelfCreationCrudURL}${'?zone_level='}${level}&${'?Rack='}${rack}&${'?storage_zone='}${zone_levelId}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
  
  ShelfCreationModifier(shelfCreation: ShelfCreation) {
      if (shelfCreation?.id) {
        return this.http.put<any>(`${this.baseURL}${this.shelfCreationCrudURL}${shelfCreation?.id}/`, shelfCreation).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})    
          })  
        )
      }
      return this.http.post<any>(`${this.baseURL}${this.shelfCreationCrudURL}`, shelfCreation).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )
    }
  
    removeShelfCreation(shelfCreationId: string | undefined): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.shelfCreationCrudURL}${shelfCreationId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )
    }
}

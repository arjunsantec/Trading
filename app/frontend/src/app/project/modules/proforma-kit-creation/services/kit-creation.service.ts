import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ProformaKitCreation } from 'src/app/shared/models/project.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class KitCreationService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  kitCreationCrudURL: string = ServiceUrlConstants.KIT_CREATION_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getKitCreationList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.kitCreationCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getKitCreationById(kitCreationId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.kitCreationCrudURL}${kitCreationId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  kitCreationModifier(kitCreation: ProformaKitCreation) {
    if (kitCreation?.id) {
      return this.http.put<any>(`${this.baseURL}${this.kitCreationCrudURL}${kitCreation?.id}/`, kitCreation).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.kitCreationCrudURL}`, kitCreation).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeKitCreation(kitCreationId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.kitCreationCrudURL}${kitCreationId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

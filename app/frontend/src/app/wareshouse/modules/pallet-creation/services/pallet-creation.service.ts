import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PalletCreation } from 'src/app/shared/models/wareshouse.model';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class PalletCreationService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  palletCrudURL: string = ServiceUrlConstants.PALLET_CREATION_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getPalletList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.palletCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getPalletById(palletId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.palletCrudURL}${palletId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  palletModifier(pallet: PalletCreation) {
    if (pallet?.id) {
      return this.http.put<any>(`${this.baseURL}${this.palletCrudURL}${pallet?.id}/`, pallet).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.palletCrudURL}`, pallet).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removePallet(palletId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.palletCrudURL}${palletId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

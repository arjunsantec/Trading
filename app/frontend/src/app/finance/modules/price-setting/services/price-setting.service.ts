import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MaterialReceipt } from 'src/app/shared/models/inventory.model';
import { PriceSetting } from 'src/app/shared/models/finance.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class PriceSettingService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  priceSettingCrudURL: string = ServiceUrlConstants.PRICE_SETTING_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

    getPriceSettingList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.priceSettingCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

    getPricceSettingById(priceSettingId: string): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.priceSettingCrudURL}${priceSettingId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

    priceSettingModifier(priceSetting: PriceSetting) {
      if (priceSetting?.id) {
        return this.http.put<any>(`${this.baseURL}${this.priceSettingCrudURL}${priceSetting?.id}/`, priceSetting).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})
          })
        )
      } else {
        return this.http.post<any>(`${this.baseURL}${this.priceSettingCrudURL}`, priceSetting).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})
          })
        )
      }
    }

    removePriceSetting(priceSettingId: string | undefined): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.priceSettingCrudURL}${priceSettingId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
}

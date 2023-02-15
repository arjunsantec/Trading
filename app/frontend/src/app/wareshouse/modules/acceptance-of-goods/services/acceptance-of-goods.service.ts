import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { GoodsAcceptance } from 'src/app/shared/models/wareshouse.model';

@Injectable({
  providedIn: 'root'
})
export class AcceptanceOfGoodsService {
  baseURL: string = ServiceUrlConstants.BASE_URL;
  goodsAcceptanceCreationCrudURL: string = ServiceUrlConstants.GOODS_ACCEPTANCE_CREATION_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

    getGoodsAcceptanceList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.goodsAcceptanceCreationCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

    getGoodsAcceptanceById(goodsAcceptanceCreationId: string): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.goodsAcceptanceCreationCrudURL}${goodsAcceptanceCreationId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }

    GoodsAcceptanceModifier(acceptanceCreation: GoodsAcceptance) {
      if (acceptanceCreation?.id) {
        return this.http.put<any>(`${this.baseURL}${this.goodsAcceptanceCreationCrudURL}${acceptanceCreation?.id}/`, acceptanceCreation).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})    
          })  
        )
      }
      return this.http.post<any>(`${this.baseURL}${this.goodsAcceptanceCreationCrudURL}`, acceptanceCreation).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )
    }
  
    removeGoodsAcceptance(goodsAcceptanceCreationId: string | undefined): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.goodsAcceptanceCreationCrudURL}${goodsAcceptanceCreationId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )
    }
}

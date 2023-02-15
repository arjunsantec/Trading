import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MaterialReceipt } from 'src/app/shared/models/inventory.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class MaterialReceiptService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  materialReceiptCrudURL: string = ServiceUrlConstants.MATERIAL_RECEIPT_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

    getMaterialReceiptList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.materialReceiptCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
  
    getMaterialReceiptById(materialReceiptId: string): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.materialReceiptCrudURL}${materialReceiptId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
  
    materialReceiptModifier(materialReceipt: MaterialReceipt) {
      if (materialReceipt?.id) {
        return this.http.put<any>(`${this.baseURL}${this.materialReceiptCrudURL}${materialReceipt?.id}/`, materialReceipt).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})
          })
        )
      } else {
        return this.http.post<any>(`${this.baseURL}${this.materialReceiptCrudURL}`, materialReceipt).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})
          })
        )
      }
    }
  
    removeMaterialReceipt(materialReceiptId: string | undefined): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.materialReceiptCrudURL}${materialReceiptId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
    
}

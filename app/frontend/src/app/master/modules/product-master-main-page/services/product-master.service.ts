import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { productMaster } from 'src/app/shared/models/product.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class ProductMasterService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  productMasterCrudURL: string = ServiceUrlConstants.PRODUCT_MASTER_CRUD;
  grnDetailsGetURL: String = ServiceUrlConstants.GRN_DETAILS_CRUD;
  acceptanceGetURL: String = ServiceUrlConstants.GOODS_ACCEPTANCE_DETAILS_CREATION_CRUD;
  tagginglist:string = ServiceUrlConstants.PRODUCT_TAGGING_CRUD;
  productFileUploadCrudURL: string = ServiceUrlConstants.PRODUCT_FILE_UPLOAD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getProductMasterList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.productMasterCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  getGoodsAcceptanceDetailsList(productMasterCode: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.grnDetailsGetURL}?product_code=${productMasterCode}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  getAcceptanceDetailsList(productMasterCode: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.tagginglist}?product=${productMasterCode}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  getProductMasterById(productMasterId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.productMasterCrudURL}${productMasterId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  productMasterModifier(formData: FormData) {
    if (formData.get('id')) {
      return this.http.put<any>(`${this.baseURL}${this.productMasterCrudURL}${formData.get('id')}/`, formData).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    } else {
      return this.http.post<any>(`${this.baseURL}${this.productMasterCrudURL}`, formData).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
  }

  removeProductMaster(productMasterId: any): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.productMasterCrudURL}${productMasterId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  saveProductMaster(productMaster: productMaster) {
    return this.http.post<any>(`${this.baseURL}${this.productMasterCrudURL}`, productMaster).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  removeProductFile(fileId: any): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.productFileUploadCrudURL}${fileId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

}

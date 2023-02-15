import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ProductSubCategory } from 'src/app/shared/models/product.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class ProductSubCategoryService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  productSubCategoryCrudURL: string = ServiceUrlConstants.PRODUCT_SUB_CATEGORY_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getProductSubCategoryList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.productSubCategoryCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getProductSubCategoryById(productSubCategoryId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.productSubCategoryCrudURL}/${productSubCategoryId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  productSubCategoryModifier(formData: FormData) {
    if (formData.get('id')) {
      return this.http.put<any>(`${this.baseURL}${this.productSubCategoryCrudURL}${formData.get('id')}/`, formData).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.productSubCategoryCrudURL}`, formData).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeProductSubCategory(productSubCategoryId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.productSubCategoryCrudURL}${productSubCategoryId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

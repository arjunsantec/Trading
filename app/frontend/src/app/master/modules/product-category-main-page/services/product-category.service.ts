import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  productCategoryCrudURL: string = ServiceUrlConstants.PRODUCT_CATEGORY_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getProductCategoryList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.productCategoryCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getProductCategoryById(productCategoryId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.productCategoryCrudURL}/${productCategoryId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  productCategoryModifier(formData: FormData) {
    if (formData.get('id')) {
      return this.http.put<any>(`${this.baseURL}${this.productCategoryCrudURL}${formData.get('id')}/`, formData).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.productCategoryCrudURL}`, formData).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeProductCategory(productCategoryId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.productCategoryCrudURL}${productCategoryId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

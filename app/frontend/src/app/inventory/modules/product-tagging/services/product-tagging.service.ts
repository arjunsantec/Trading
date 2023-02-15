import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { ProductTagging } from 'src/app/shared/models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class ProductTaggingService {
  baseURL: string = ServiceUrlConstants.BASE_URL;
  productTaggingCrudURL: string = ServiceUrlConstants.PRODUCT_TAGGING_CRUD;
  productTaggingURL: string = ServiceUrlConstants.PRODUCT_TAGGING_PRODUCT;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

    getProductTaggingList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.productTaggingCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

      
    getProductTaggingByProductId(ProductId: string): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.productTaggingCrudURL}${'?product='}${ProductId}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

        
    getProductTaggingByShelfId(ShelfId: string): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.productTaggingCrudURL}${'?shelf='}${ShelfId}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
    getProductTaggingById(tagId: string): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.productTaggingCrudURL}${tagId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

    ProductTaggingModifier(ProductTagging: ProductTagging) {
      // if (ProductTagging?.id) {
        return this.http.put<any>(`${this.baseURL}${this.productTaggingCrudURL}${ProductTagging?.id}/`, ProductTagging).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})    
          })  
        )
      // }
    }

    removeProductTagging(taggingId: string | undefined): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.productTaggingCrudURL}${taggingId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )
    }

    getViewProductsList(project:number,load_date:any,unload_date:any,page:any){
      return this.http.get<any>(`${this.baseURL}${this.productTaggingURL}${'?project='}${project}&${'f_date='}${load_date}&${'to_date='}${unload_date}&${'page='}${page}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )

    }
}

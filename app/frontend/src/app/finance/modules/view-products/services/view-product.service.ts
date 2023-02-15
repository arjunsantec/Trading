import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { ProductTagging } from 'src/app/shared/models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class ViewProductService {
  baseURL: string = ServiceUrlConstants.BASE_URL;
  productTaggingCrudURL: string = ServiceUrlConstants.PRODUCT_TAGGING_PRODUCT;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

    getViewProductsList(project,load_date,unload_date){
      return this.http.get<any>(`${this.baseURL}${this.productTaggingCrudURL}${'?project='}${project}${'?load_date='}${load_date}${'?unload_date='}${unload_date}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })
      )

    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { zoneTozoneTransfer } from 'src/app/shared/models/wareshouse.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class ZoneToZoneService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  zoneToZoneTransferCrudURL: string = ServiceUrlConstants.ZONE_TO_ZONE_TRANSFER_CRUD;
  taggingZone: string = ServiceUrlConstants.PRODUCT_TAGGING_CRUD;
  tagproduct: string = ServiceUrlConstants.TAGGINGZONELIST;
  allproduct : string = ServiceUrlConstants.TAGGINGPRODUCTLIST;
  taggingBatch: string = ServiceUrlConstants.TAGGINGBATCH;
  productTaggingCrudURL:string = ServiceUrlConstants.PRODUCT_TAGGING_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getZoneToZoneTransferList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.zoneToZoneTransferCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }
  getproducts(z_id,w_id){
    return this.http.get<any>(`${this.baseURL}${this.tagproduct}${'?z_id='}${z_id}&${'w_id='}${w_id}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )

  }

  getallproducts(w_id){
    return this.http.get<any>(`${this.baseURL}${this.allproduct}${'?w_id='}${w_id}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )

  }

  getProductTaggingByBatchNo(batchno: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.productTaggingCrudURL}${'?batch_no='}${batchno}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  getBatchList(z_id,w_id,p_id){
    return this.http.get<any>(`${this.baseURL}${this.taggingBatch}${'?z_id='}${z_id}&${'w_id='}${w_id}&${'p_id='}${p_id}`)
    .pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )

  }

  getZoneList(warehouse: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.taggingZone}${'?ware_house='}${warehouse}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }


  getZoneToZoneTransferById(zoneTransferId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.zoneToZoneTransferCrudURL}${zoneTransferId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  zoneToZoneTransferModifier(zoneTransfer: zoneTozoneTransfer) {
    if (zoneTransfer?.id) {
      return this.http.put<any>(`${this.baseURL}${this.zoneToZoneTransferCrudURL}${zoneTransfer?.id}/`, zoneTransfer).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
    return this.http.post<any>(`${this.baseURL}${this.zoneToZoneTransferCrudURL}`, zoneTransfer).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  removeZoneToZoneTransfer(zoneTransferId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.zoneToZoneTransferCrudURL}${zoneTransferId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }
}

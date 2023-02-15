import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { rackToRackTransfer } from 'src/app/shared/models/wareshouse.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class RackToRackService {
  baseURL: string = ServiceUrlConstants.BASE_URL;
  rackToRackTransferCrudURL: string = ServiceUrlConstants.RACK_TO_RACK_TRANSFER_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getRackToRackTransferList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.rackToRackTransferCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }


  getRackToRackTransferById(rackTransferId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.rackToRackTransferCrudURL}${rackTransferId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  RackToRackTransferModifier(rackTransfer: rackToRackTransfer) {
    if (rackTransfer?.id) {
      return this.http.put<any>(`${this.baseURL}${this.rackToRackTransferCrudURL}${rackTransfer?.id}/`, rackTransfer).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
    return this.http.post<any>(`${this.baseURL}${this.rackToRackTransferCrudURL}`, rackTransfer).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  removeRackToRackTransfer(rackTransferId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.rackToRackTransferCrudURL}${rackTransferId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { InvoiceCreation } from 'src/app/shared/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceMainPageService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  invoiceCrudURL: string = ServiceUrlConstants.INVOICE_CREATION_CRUD;
  batchNumberListCrudURL: string = ServiceUrlConstants.BATCH_NUMBER_LIST_CRUD;
  quantityCountCrudURL: string = ServiceUrlConstants.QUANTITY_COUNT_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getInvoiceList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.invoiceCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  invoiceModifier(invoice: InvoiceCreation) {
    if (invoice?.id) {
      return this.http.put<any>(`${this.baseURL}${this.invoiceCrudURL}${invoice?.id}/`, invoice).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
    return this.http.post<any>(`${this.baseURL}${this.invoiceCrudURL}`, invoice).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  removeInvoice(invoiceId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.invoiceCrudURL}${invoiceId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  getBatchNumberList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.batchNumberListCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getQuantityCount(data: any): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.quantityCountCrudURL}${'?batch='}${data}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

}

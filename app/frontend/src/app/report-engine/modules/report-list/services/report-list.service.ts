import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class ReportListService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  reportCrudURL: string = ServiceUrlConstants.REPORT_ENGINE_CRUD;
  reportByIDCrudURL: string = ServiceUrlConstants.REPORT_ENGINE_ID_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

    getReports(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.reportCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }

    getReportbyIDAndType(id: any, from_date: any, to_date: any, filter_data: any): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.reportByIDCrudURL}?id=${id}&from_date=${from_date}&to_date=${to_date}&filter=${filter_data}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }

}

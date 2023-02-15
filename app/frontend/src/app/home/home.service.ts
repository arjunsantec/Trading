import { Injectable } from '@angular/core';
import { ServiceUrlConstants } from '../shared/utils/service-url-constants';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  projectCrudURL: string = ServiceUrlConstants.COUNT_PROJECT_CRUD;
  rackCrudURL: string = ServiceUrlConstants.COUNT_RACK_CRUD;
  shelfCrudURL: string = ServiceUrlConstants.COUNT_SHELF_CRUD;
  closedShelfCrudURL: string = ServiceUrlConstants.COUNT_CLOSED_SHELF_CRUD;
  warehouseCrudURL: string = ServiceUrlConstants.COUNT_WAREHOUSE_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getProjectCount(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.projectCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getRackCount(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.rackCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getShelfCount(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.shelfCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getWarehouseCount(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.warehouseCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getClosedShelfCount(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.closedShelfCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

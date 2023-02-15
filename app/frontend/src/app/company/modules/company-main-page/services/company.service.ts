import { HttpClient } from '@angular/common/http';
import { Injectable, resolveForwardRef } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Company } from 'src/app/shared/models/company.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  companyCrudURL: string = ServiceUrlConstants.COMPANY_CRUD;
  companyUserCrudURL: string = ServiceUrlConstants.COMPANY_USER_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getUserCompanyList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.companyUserCrudURL}?user=${sessionStorage.getItem("user_id")}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getCompanyList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.companyCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getCompanyById(companyId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.companyCrudURL}${companyId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  companyModifier(formData: FormData) {
    if (formData.get('id')) {
      return this.http.put<any>(`${this.baseURL}${this.companyCrudURL}${formData.get('id')}/`, formData).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.companyCrudURL}`, formData).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeCompany(companyId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.companyCrudURL}${companyId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

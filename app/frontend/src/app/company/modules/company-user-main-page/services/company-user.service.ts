import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CompanyUser } from 'src/app/shared/models/company.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class CompanyUserService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  companyUserCrudURL: string = ServiceUrlConstants.COMPANY_USER_CRUD;
  userManagerCrudURL: string = ServiceUrlConstants.USER_CRUD;
 
  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

    getCompanyUserList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.companyUserCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

    getUserManagerList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.userManagerCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
  
    getCompanyUserId(companyUserId: string): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.companyUserCrudURL}${companyUserId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }
  
    companyUserModifier(companyUser: CompanyUser) {
      if (companyUser?.id) {
        return this.http.put<any>(`${this.baseURL}${this.companyUserCrudURL}${companyUser?.id}/`, companyUser).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})
          })
        )     
      } else {
        return this.http.post<any>(`${this.baseURL}${this.companyUserCrudURL}`, companyUser).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})
          })
        )
      }
    }
  
    removeCompanyUser(companyUserId: string | undefined): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.companyUserCrudURL}${companyUserId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      )
    }

}

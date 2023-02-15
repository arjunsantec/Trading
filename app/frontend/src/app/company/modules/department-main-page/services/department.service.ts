import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Department } from 'src/app/shared/models/company.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  departmentCrudURL: string = ServiceUrlConstants.DEPARTMENT_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getDepartmentList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.departmentCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

  departmentModifier(department: Department) {
    if (department?.id) {
      return this.http.put<any>(`${this.baseURL}${this.departmentCrudURL}${department?.id}/`, department).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})    
        })  
      )
    }
    return this.http.post<any>(`${this.baseURL}${this.departmentCrudURL}`, department).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})    
      })
    )
  }

  removeDepartment(departmentId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.departmentCrudURL}${departmentId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})    
      })
    )
  }
}

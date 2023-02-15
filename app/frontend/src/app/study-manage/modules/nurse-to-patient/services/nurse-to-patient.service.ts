import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { NurseToPatient } from 'src/app/shared/models/studymanage.model';

@Injectable({
  providedIn: 'root'
})
export class NurseToPatientService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  nurseToPatientCrudURL: string = ServiceUrlConstants.NURSE_TO_PATIENT_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getNurseToPatientList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.nurseToPatientCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getNurseToPatientById(nurseToPatientId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.nurseToPatientCrudURL}${nurseToPatientId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  nurseToPatientModifier(nurseToPatient: NurseToPatient) {
    if (nurseToPatient.id) {
      return this.http.put<any>(`${this.baseURL}${this.nurseToPatientCrudURL}${nurseToPatient.id}/`, nurseToPatient).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.nurseToPatientCrudURL}`, nurseToPatient).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeNurseToPatient(nurseToPatientId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.nurseToPatientCrudURL}${nurseToPatientId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

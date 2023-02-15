import { Injectable } from '@angular/core';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { catchError, Observable, of } from 'rxjs';
import { DeliverySitePatient } from 'src/app/shared/models/studymanage.model';

@Injectable({
  providedIn: 'root'
})
export class DeliverySiteToPatientService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  deliverySiteToPatientCrudURL: string = ServiceUrlConstants.SITE_PATIENT_DELIVERY_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getDeliverySiteToPatientList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.deliverySiteToPatientCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getDeliverySiteToPatientById(deliverySiteToPatientId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.deliverySiteToPatientCrudURL}${deliverySiteToPatientId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  deliverySiteToPatientModifier(deliverySiteToPatient: DeliverySitePatient) {
    if (deliverySiteToPatient.id) {
      return this.http.put<any>(`${this.baseURL}${this.deliverySiteToPatientCrudURL}${deliverySiteToPatient.id}/`, deliverySiteToPatient).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.deliverySiteToPatientCrudURL}`, deliverySiteToPatient).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeDeliverySiteToPatient(deliverySiteToPatient: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.deliverySiteToPatientCrudURL}${deliverySiteToPatient}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

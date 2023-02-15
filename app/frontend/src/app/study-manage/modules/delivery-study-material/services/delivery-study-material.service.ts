import { Injectable } from '@angular/core';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { catchError, Observable, of } from 'rxjs';
import { StudyMaterialDelivery } from 'src/app/shared/models/studymanage.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryStudyMaterialService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  deliveryStudyMaterialCrudURL: string = ServiceUrlConstants.STUDY_MATERIAL_DELIVERY_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getDeliveryStudyMaterialList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.deliveryStudyMaterialCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getDeliveryStudyMaterialById(deliveryStudyMaterialId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.deliveryStudyMaterialCrudURL}${deliveryStudyMaterialId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  deliveryStudyMaterialModifier(deliveryStudyMaterial: StudyMaterialDelivery) {
    if (deliveryStudyMaterial.id) {
      return this.http.put<any>(`${this.baseURL}${this.deliveryStudyMaterialCrudURL}${deliveryStudyMaterial.id}/`, deliveryStudyMaterial).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.deliveryStudyMaterialCrudURL}`, deliveryStudyMaterial).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeDeliveryStudyMaterial(deliveryStudyMaterialId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.deliveryStudyMaterialCrudURL}${deliveryStudyMaterialId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

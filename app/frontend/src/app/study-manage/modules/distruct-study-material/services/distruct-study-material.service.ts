import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { StudyMaterialDestruction } from 'src/app/shared/models/studymanage.model';

@Injectable({
  providedIn: 'root'
})
export class DistructStudyMaterialService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
 studyMaterialDistructionCrudURL: string = ServiceUrlConstants.STUDY_MATERIAL_DISTRUCTION_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

    getStudyMaterialDistructionList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.studyMaterialDistructionCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  
    getStudyMaterialDistructionById(materialDistructId: string): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.studyMaterialDistructionCrudURL}${materialDistructId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }

    studyMaterialReturnModifier(materialDistruct: StudyMaterialDestruction) {
      if (materialDistruct?.id) {
        return this.http.put<any>(`${this.baseURL}${this.studyMaterialDistructionCrudURL}${materialDistruct?.id}/`, materialDistruct).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})
          })
        );
      } else {
        return this.http.post<any>(`${this.baseURL}${this.studyMaterialDistructionCrudURL}`, materialDistruct).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})    
          })
        );
      }
    }

    removeStudyMaterialReturn(materialDistructId: string | undefined ): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.studyMaterialDistructionCrudURL}${materialDistructId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
}

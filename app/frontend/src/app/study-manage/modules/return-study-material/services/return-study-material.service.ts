import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
// import { PartyMaster } from 'src/app/shared/models/party.model';
import { StudyMaterialReturn } from 'src/app/shared/models/studymanage.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class ReturnStudyMaterialService {
  baseURL: string = ServiceUrlConstants.BASE_URL;
 studyMaterialReturnCrudURL: string = ServiceUrlConstants.STUDY_MATERIAL_RETURN_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

    getStudyMaterialReturnList(): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.studyMaterialReturnCrudURL}`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  
    getStudyMaterialReturnById(studyMaterialId: string): Observable<any> {
      return this.http.get<any>(`${this.baseURL}${this.studyMaterialReturnCrudURL}${studyMaterialId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  
    studyMaterialReturnModifier(studyMaterialReturn: StudyMaterialReturn) {
      if (studyMaterialReturn?.id) {
        return this.http.put<any>(`${this.baseURL}${this.studyMaterialReturnCrudURL}${studyMaterialReturn?.id}/`, studyMaterialReturn).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})
          })
        );
      } else {
        return this.http.post<any>(`${this.baseURL}${this.studyMaterialReturnCrudURL}`, studyMaterialReturn).pipe(
          catchError((error) => {
            this._sharedService.handleError(error);
            return of({})
          })
        );
      }
    }
  
    removeStudyMaterialReturn(studyMaterialId: string | undefined ): Observable<any> {
      return this.http.delete<any>(`${this.baseURL}${this.studyMaterialReturnCrudURL}${studyMaterialId}/`).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
}

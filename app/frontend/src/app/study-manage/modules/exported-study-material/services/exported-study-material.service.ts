import { Injectable } from '@angular/core';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { catchError, Observable, of } from 'rxjs';
import { StudyMaterialExported } from 'src/app/shared/models/studymanage.model';

@Injectable({
  providedIn: 'root'
})
export class ExportedStudyMaterialService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  exportedStudyMaterialCrudURL: string = ServiceUrlConstants.STUDY_MATERIAL_EXPORTED_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getStudyMaterialExportedList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.exportedStudyMaterialCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getStudyMaterialExportedById(studyMaterialExportedId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.exportedStudyMaterialCrudURL}${studyMaterialExportedId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  studyMaterialExportedModifier(studyMaterialExported: StudyMaterialExported) {
    if (studyMaterialExported.id) {
      return this.http.put<any>(`${this.baseURL}${this.exportedStudyMaterialCrudURL}${studyMaterialExported.id}/`, studyMaterialExported).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.exportedStudyMaterialCrudURL}`, studyMaterialExported).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeStudyMaterialExported(studyMaterialExportedId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.exportedStudyMaterialCrudURL}${studyMaterialExportedId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
}

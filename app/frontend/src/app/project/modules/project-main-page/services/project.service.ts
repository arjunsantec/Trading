import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';
import { ProjectCreation } from 'src/app/shared/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  projectCrudURL: string = ServiceUrlConstants.PROJECT_CRUD;
  projectFileUploadCrudURL: string = ServiceUrlConstants.PROJECT_FILE_UPLOAD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getProjectList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.projectCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getProjectById(projectCreationId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.projectCrudURL}${projectCreationId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  // projectModifier(projectCreation: ProjectCreation) {
  //   if (projectCreation?.id) {
  //     return this.http.put<any>(`${this.baseURL}${this.projectCrudURL}${projectCreation?.id}/`, projectCreation).pipe(
  //       catchError((error) => {
  //         this._sharedService.handleError(error);
  //         return of({})
  //       })
  //     );
  //   } else {
  //     return this.http.post<any>(`${this.baseURL}${this.projectCrudURL}`, projectCreation).pipe(
  //       catchError((error) => {
  //         this._sharedService.handleError(error);
  //         return of({})
  //       })
  //     );
  //   }
  // }

  projectModifier(formData: FormData) {
    if (formData.get('id')) {
      console.log("updation")
      return this.http.put<any>(`${this.baseURL}${this.projectCrudURL}${formData.get('id')}/`, formData).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      console.log("creaton")
      return this.http.post<any>(`${this.baseURL}${this.projectCrudURL}`, formData).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removeProject(projectCreationId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.projectCrudURL}${projectCreationId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  removeProjectFileUpload(fileId: string | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.projectFileUploadCrudURL}${fileId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

}

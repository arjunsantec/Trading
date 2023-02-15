import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ServiceUrlConstants } from 'src/app/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class PartyMasterService {

  baseURL: string = ServiceUrlConstants.BASE_URL;
  partyMasterCrudURL: string = ServiceUrlConstants.PARTY_MASTER_CRUD;

  constructor(private http: HttpClient,
    private _sharedService: SharedService) { }

  getPartyMasterList(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.partyMasterCrudURL}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }
  getPartyMasterLists(pageNumber): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.partyMasterCrudURL}${'?page='}${pageNumber}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getPartyMasterById(partyMasterId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.partyMasterCrudURL}${partyMasterId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  partyModifier(partyMaster: PartyMaster) {
    if (partyMaster?.id) {
      return this.http.put<any>(`${this.baseURL}${this.partyMasterCrudURL}${partyMaster?.id}/`, partyMaster).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    } else {
      return this.http.post<any>(`${this.baseURL}${this.partyMasterCrudURL}`, partyMaster).pipe(
        catchError((error) => {
          this._sharedService.handleError(error);
          return of({})
        })
      );
    }
  }

  removePartyMaster(partyMasterId: string | undefined ): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}${this.partyMasterCrudURL}${partyMasterId}/`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    );
  }

  getGlobalSearchList(key): Observable<any> {
    return this.http.get<any>(`${this.baseURL}${this.partyMasterCrudURL}${'?search='}${key}`).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({})
      })
    )
  }

}

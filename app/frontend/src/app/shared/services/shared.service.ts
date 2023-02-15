import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private _httpClient: HttpClient,
    private _messageService: MessageService
  ) {}

  public getJSON(url: string): Observable<any> {
    return this._httpClient.get(url).pipe(
      catchError((err) => {
        this.handleError();
        return err;
      })
    );
  }

  handleSuccess(title?: any, description?: any) {
    let successTitle = title ? title : 'SUCCESS';
    let successText = description ? description : '';

    this._messageService.add({
      key: 'toaster',
      severity: 'success',
      summary: successTitle,
      detail: successText,
      life: 1000,
    });
  }

  handleError(error?: any) {
    let errorTitle = 'ERROR';
    let errorText = 'Unable to process your request.';
    console.log('error', error);
    if (error) {
      errorTitle = error?.statusText;
      var keyjson = ''
      if (error.error) {
        // console.log('error.error', error.error);
        for (var key in error?.error) {
          // console.log('error.error[key]', error.error[key]);
          keyjson = error.error[key];
        }
      }
      errorText = keyjson;
    }

    this._messageService.add({
      key: 'toaster',
      severity: 'error',
      summary: errorTitle,
      detail: errorText,
      life: 5000,
    });
  }

  
  handleWarning(error?: any) {
    let errorTitle = 'WARNING';
    let errorText = 'Unable to process your request.';

    if (error) {
      // errorTitle = error;
      errorText = error;

    }

    this._messageService.add({
      key: 'toaster',
      severity: 'warn',
      summary: errorTitle,
      detail: errorText,
      life: 5000,
    });
  }

  clear() {
    this._messageService.clear();
  }
}

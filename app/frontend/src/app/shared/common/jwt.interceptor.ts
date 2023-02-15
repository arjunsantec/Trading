import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  c_id: string|null = "";
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('accessToken');
    if (currentUser && token) {
      
      this.c_id =  sessionStorage.getItem('c_id') ;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        params: (request.params ? request.params : new HttpParams())
                   .set('c_id', this.c_id) /*.... add new params here .....*/
      });
    }
    return next.handle(request);
  }
}

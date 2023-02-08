import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import localStorageVar from '../../constants/local-storage-var';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log(request);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ` + localStorage.getItem(localStorageVar.token),
      },
    });
    return next.handle(request);
  }
}

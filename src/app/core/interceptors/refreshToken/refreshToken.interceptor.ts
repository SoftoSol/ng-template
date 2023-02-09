import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  /// indicates to prevent multiple refresh token requests
  /// when token is refreshing, all requests will be queued
  isRefreshingToken = false;

  /// queue of requests to be sent after token is refreshed
  requestQueue: HttpRequest<any>[] = [];
  constructor(private auth:AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err=>this.handleError(err, request, next)));
  }

  //Error handling function
  handleError(error: HttpErrorResponse, request: HttpRequest<any>, next:HttpHandler): Observable<any> {
    console.log('Error Occurred: ' + error);

    if (error.status == 401) {

      if (!this.isRefreshingToken) {
        this.isRefreshingToken = true;
        return new Observable(observer => {
          this.auth.refreshToken()
            .then((res) => {
              this.isRefreshingToken = false;
              this.requestQueue.forEach(req => {
                this.intercept(req.clone({
                  headers: req.headers.set('authorization', `bearer ${this.auth.token.value}`),
                }),next);
              });
              this.requestQueue = [];
            })
            .finally(() => {
              this.isRefreshingToken = false;
            });
        });
      }
      else {
        return new Observable(observer => {
          this.requestQueue.push(request);
        });
      }
    }
    else {
      return throwError(error);
    }
  }
}
import { Injectable } from '@angular/core';
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

  constructor(private auth:AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => this.handleError(err)
    ));
  }

  //Error handling function
  handleError(error: HttpErrorResponse) {
    console.log('Error Occurred: ' + error);
    if (error.status == 401) {
      this.auth.logout();
      return throwError("Invalid Username or Password!");
    }
    else {
      return throwError(error);
    }
  }
}

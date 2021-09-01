import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'app/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   * @param {AuthService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          this._router.navigate(['/not-authorized']);
          this._authenticationService.logout();
          location.reload(true);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}

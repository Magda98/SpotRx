import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BASE_URL } from '../../utils/config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.token;
    if (token) {
      let modifiedReq = req;
      if (!req.url.includes('/token')) {
        // add authorization header to request if we not requesting /token path
        modifiedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
          url: `${BASE_URL}${req.url}`,
        });
      }

      return next.handle(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          // refresh token if 401 error
          if (error.status === 401)
            return this.handle401Error(modifiedReq, next)(error);

          // if other error logout user
          this.authService.logout();
          return throwError(() => error);
        })
      );
    }

    return next.handle(req).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  handle401Error(req: HttpRequest<unknown>, next: HttpHandler) {
    return (error: any) => {
      if (req.url.includes('/token')) {
        this.authService.logout();
        return throwError(() => error);
      }

      return this.authService.getRefreshToken().pipe(
        switchMap((authData) => {
          const modifiedReq = req.clone({
            headers: req.headers.set(
              'Authorization',
              `Bearer ${authData.access_token}`
            ),
            url: req.url,
          });
          return next.handle(modifiedReq);
        }),
        catchError((error) => {
          this.authService.logout();
          return throwError(() => error);
        })
      );
    };
  }
}

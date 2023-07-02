import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.retriveToken().pipe(
      take(1),
      switchMap((token) => {
        if (token) {
          let modifiedReq = req;

          if (!req.url.includes('/token')) {
            modifiedReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`),
              url: `https://api.spotify.com/v1/${req.url}`,
            });
          }

          return next
            .handle(modifiedReq)
            .pipe(catchError(this.handle401Error(modifiedReq, next)));
        }

        return next.handle(req);
      })
    );
  }

  handle401Error(req: HttpRequest<unknown>, next: HttpHandler) {
    return (error: any) => {
      if (req.url.includes('/token')) return throwError(() => error);

      return this.authService.getRefreshToken().pipe(
        switchMap((token) => {
          this.authService.token.next(token.access_token);
          this.authService.tokenObj.next(token);
          this.authService.loggedIn.next(true);

          const modifiedReq = req.clone({
            headers: req.headers.set(
              'Authorization',
              `Bearer ${token.access_token}`
            ),
            url: `https://api.spotify.com/v1/${req.url}`,
          });
          return next.handle(modifiedReq);
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
    };
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(this.authService.token.getValue());

    if (this.authService.token.getValue()) {
      let modifiedReq = request;

      if (!request.url.includes('/token')) {
        modifiedReq = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${this.authService.token.getValue()}`),
          url: `https://api.spotify.com/v1/${request.url}`
        });
      }

      return next.handle(modifiedReq).pipe(catchError(error => {
        if (modifiedReq.url.includes('/token')) return throwError(() => error);
        
        return this.authService.getRefreshToken().pipe(
          switchMap(token => {
            console.log('udalo sie');
            
            this.authService.token.next(token.access_token);
            this.authService.tokenObj.next(token);
            this.authService.loggedIn.next(true);
              
            const modifiedReq = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${token.access_token}`),
              url: `https://api.spotify.com/v1/${request.url}` 
            });
              return next.handle(modifiedReq)
          }),
          catchError((error) => {
            console.log('blad');
            return throwError(() => error);
          })
        );

        
      }));
    }

    return next.handle(request);
  }
}

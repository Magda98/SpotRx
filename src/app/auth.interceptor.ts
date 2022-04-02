import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(this.authService.token.getValue())
    if (this.authService.token.getValue()) {
      const modifiedReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authService.token.getValue()}`),
        url: `https://api.spotify.com/v1/${request.url}` 
      });
      return next.handle(modifiedReq);
    }

    return next.handle(request);
  }
}

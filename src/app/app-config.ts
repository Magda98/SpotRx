import { routes } from './app-routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerService } from './services/player.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([HttpClientModule, BrowserAnimationsModule]),
    provideRouter(routes),
    provideAngularQuery(new QueryClient()),
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (authService: AuthService) => {
        return new AuthInterceptor(authService);
      },
      multi: true,
      deps: [AuthService],
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    PlayerService
  ],
};

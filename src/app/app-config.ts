import { routes } from './app-routes';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AuthService } from './shared/services/auth.service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {
  QueryClient,
  keepPreviousData,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerService } from './shared/services/player.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([BrowserAnimationsModule]),
    provideRouter(routes),
    provideAngularQuery(
      new QueryClient({
        defaultOptions: { queries: { placeholderData: keepPreviousData } },
      }),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => {
        return new AuthInterceptor();
      },
      multi: true,
      deps: [AuthService],
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    PlayerService,
  ],
};

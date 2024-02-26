import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { AuthData } from './interfaces/authData';
import { NavComponent } from './nav/nav.component';
import { IconComponent } from './icon/icon.component';
import { PlayerComponent } from './player/player.component';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { CommonModule } from '@angular/common';
import { render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockBackendInterceptor } from './interceptors/mock-backend.interceptor';

describe('AppComponent', () => {
  const mockAuthService = createMockWithValues(AuthService, {
    loggedIn: new ReplaySubject<boolean>(),
    authData: new BehaviorSubject<AuthData | undefined>(undefined),
  });

  test('should render loggin screen', async () => {
    mockAuthService.loggedIn.next(false);
    await render(AppComponent, {
      componentProviders: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
      componentImports: [
        RouterModule,
        NavComponent,
        IconComponent,
        PlayerComponent,
        AngularQueryDevtools,
        CommonModule,
      ],
      imports: [HttpClientTestingModule],
      providers: [provideAngularQuery(new QueryClient())],
    });
    expect(screen.getByText('Spotrx')).toBeInTheDocument();
  });

  test('should render main app container', async () => {
    mockAuthService.loggedIn.next(false);
    const component = await render(AppComponent, {
      componentProviders: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
      componentImports: [
        RouterModule,
        NavComponent,
        IconComponent,
        PlayerComponent,
        AngularQueryDevtools,
        CommonModule,
      ],
      imports: [HttpClientTestingModule],
      providers: [
        provideAngularQuery(new QueryClient()),

        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockBackendInterceptor,
          multi: true,
        },
      ],
    });
    component.detectChanges();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

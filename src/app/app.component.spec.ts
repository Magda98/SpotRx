import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { RouterModule, provideRouter } from '@angular/router';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { AuthData } from './interfaces/authData';
import { NavComponent } from './nav/nav.component';
import { IconComponent } from './icon/icon.component';
import { PlayerComponent } from './player/player.component';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { CommonModule } from '@angular/common';
import { fireEvent, render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockBackendInterceptor } from './interceptors/mock-backend.interceptor';
import { routes } from './app-routes';

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

  test('should navigate', async () => {
    mockAuthService.loggedIn.next(true);
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
      imports: [HttpClientTestingModule, RouterModule],
      providers: [
        provideRouter(routes),
        provideAngularQuery(new QueryClient()),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockBackendInterceptor,
          multi: true,
        },
      ],
    });
    jest.useFakeTimers();
    component.detectChanges();
    expect(screen.queryByText(/Saved tracks/i)).not.toBeInTheDocument();

    await fireEvent.click(screen.getByRole('link', { name: /Saved/i }));
    expect(
      await screen.findByRole('heading', { name: /Saved tracks/i })
    ).toBeInTheDocument();

    await fireEvent.click(screen.getByRole('link', { name: /Home/i }));
    expect(
      await screen.findByRole('heading', { name: /Home/i })
    ).toBeInTheDocument();

    await fireEvent.click(screen.getByRole('link', { name: /Home/i }));
    expect(
      await screen.findByRole('heading', { name: /Home/i })
    ).toBeInTheDocument();

    jest.advanceTimersByTime(300);
    component.detectChanges();
    await fireEvent.click(screen.getByRole('link', { name: /Dua Lipa/i }));
    expect(
      await screen.findByRole('heading', { name: /Dua Lipa/i })
    ).toBeInTheDocument();
  });
});

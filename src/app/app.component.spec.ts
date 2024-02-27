import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { AuthData } from './interfaces/authData';
import { fireEvent, render, screen } from '@testing-library/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockBackendInterceptor } from './interceptors/mock-backend.interceptor';
import { routes } from './app-routes';
import { provideRouter } from '@angular/router';

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
      imports: [HttpClientTestingModule],
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
    component.detectChanges();
    expect(screen.queryByText(/Saved tracks/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /Saved/i }));
    expect(
      await screen.findByRole('heading', { name: /Saved tracks/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /Home/i }));
    expect(
      await screen.findByRole('heading', { name: /Home/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /Home/i }));
    expect(
      await screen.findByRole('heading', { name: /Home/i })
    ).toBeInTheDocument();

    fireEvent.click(await screen.findByRole('link', { name: /Dua Lipa/i }));
    component.detectChanges();
    expect(
      await screen.findByRole('heading', { name: /Dua Lipa/i })
    ).toBeInTheDocument();
  });
});

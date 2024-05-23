import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { User } from '../shared/interfaces/user';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/icon/icon.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MockBackendInterceptor } from '../../tests/mock-backend.interceptor';
import { user } from '../../tests/mocks';
import { createMock } from '@testing-library/angular/jest-utils';
import { UserService } from '../shared/services/user.service';

describe('NavComponent', () => {
  const userData: User = user;
  const renderComponent = () =>
    render(NavbarComponent, {
      componentInputs: { userData: userData },
      componentImports: [
        IconComponent,
        RouterModule,
        MatIconModule,
        CommonModule,
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideAngularQuery(new QueryClient()),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockBackendInterceptor,
          multi: true,
        },
      ],
    });

  test('should render', async () => {
    const component = await renderComponent();
    component.detectChanges();
    await screen.findByAltText('święta swięta 🎄');
    expect(component.container).toMatchSnapshot();
  });

  test('should contain user-name', async () => {
    await render(NavbarComponent, {
      componentInputs: { userData: userData },
      componentImports: [
        IconComponent,
        RouterModule,
        MatIconModule,
        CommonModule,
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideAngularQuery(new QueryClient()),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockBackendInterceptor,
          multi: true,
        },
      ],
    });

    expect(screen.getByText(userData.display_name)).toBeInTheDocument();
  });

  test('should display user avatar', async () => {
    await renderComponent();
    expect(screen.getByAltText('user avatar')).toBeInTheDocument();
  });

  test('should display user playlist', async () => {
    const component = await renderComponent();
    component.detectChanges();
    expect(await screen.findByAltText('święta swięta 🎄')).toBeInTheDocument();
  });
});

import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav.component';
import { User } from '../interfaces/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockBackendInterceptor } from '../../tests/mock-backend.interceptor';
import { user } from 'src/tests/mocks';

describe('NavComponent', () => {
  const userData: User = user;
  const renderComponent = () =>
    render(NavComponent, {
      componentInputs: { userData: userData },
      componentImports: [
        IconComponent,
        RouterModule,
        MatIconModule,
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

  test('should render', async () => {
    const component = await renderComponent();
    component.detectChanges();
    expect(component.container).toMatchSnapshot();
  });

  test('should contain user-name', async () => {
    await render(NavComponent, {
      componentInputs: { userData: userData },
      componentImports: [
        IconComponent,
        RouterModule,
        MatIconModule,
        CommonModule,
      ],
      imports: [HttpClientTestingModule],
      providers: [provideAngularQuery(new QueryClient())],
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
    expect(screen.getByAltText('święta swięta 🎄')).toBeInTheDocument();
  });
});

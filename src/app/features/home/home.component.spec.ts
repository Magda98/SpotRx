import { render } from '@testing-library/angular';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { screen } from '@testing-library/angular';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MockBackendInterceptor } from '@tests/mock-backend.interceptor';

describe('HomeComponent', () => {
  const renderComponent = () =>
    render(HomeComponent, {
      componentImports: [
        RouterModule,
        CommonModule,
        NgOptimizedImage,
        NgxSkeletonLoaderModule,
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
    expect(component.container).toMatchSnapshot();
  });

  test('should render title', async () => {
    await renderComponent();
    expect(
      await screen.findByRole('heading', { name: /Home/i }),
    ).toBeInTheDocument();
  });
});

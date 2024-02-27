import { render } from '@testing-library/angular';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { screen } from '@testing-library/angular';

describe('HomeComponent', () => {
  test('should render title', async () => {
    await render(HomeComponent, {
      componentImports: [
        RouterModule,
        CommonModule,
        NgOptimizedImage,
        NgxSkeletonLoaderModule,
      ],
      imports: [HttpClientTestingModule],
      providers: [provideAngularQuery(new QueryClient())],
    });

    expect(
      await screen.findByRole('heading', { name: /Home/i })
    ).toBeInTheDocument();
  });
});

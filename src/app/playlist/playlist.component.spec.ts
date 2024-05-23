import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/angular';
import { PlaylistComponent } from './playlist.component';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MockBackendInterceptor } from '../../tests/mock-backend.interceptor';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PlayerService } from '../shared/services/player.service';

describe('PlaylistComponent', () => {
  test('should render', async () => {
    const component = await render(PlaylistComponent, {
      componentProviders: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '50Gsv3p7qLLPVzfPBu8UcO' })),
          },
        },
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAngularQuery(new QueryClient()),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockBackendInterceptor,
          multi: true,
        },
        PlayerService,
      ],
    });

    await waitForElementToBeRemoved(await screen.findAllByRole('progressbar'));
    expect(component.container).toMatchSnapshot();
  });
});

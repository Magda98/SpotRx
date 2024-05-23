import {
  render,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/angular';
import { TopTracksComponent } from './top-tracks.component';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { PlayerService } from '../shared/services/player.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockBackendInterceptor } from '../../tests/mock-backend.interceptor';
import {} from '@angular/common/http/testing';

describe('TopTracksComponent', () => {
  test('should render', async () => {
    const component = await render(TopTracksComponent, {
      imports: [HttpClientTestingModule],
      providers: [
        provideAngularQuery(new QueryClient()),
        PlayerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockBackendInterceptor,
          multi: true,
        },
      ],
    });
    component.detectChanges();
    await waitForElementToBeRemoved(await screen.findAllByRole('progressbar'));
    expect(component.container).toMatchSnapshot();
  });
});

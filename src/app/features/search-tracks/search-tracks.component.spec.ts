import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/angular';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { SearchTracksComponent } from './search-tracks.component';
import userEvent from '@testing-library/user-event';
import { PlayerService } from '@app/shared/services/player.service';
import { MockBackendInterceptor } from '@tests/mock-backend.interceptor';

describe('SearchComponent', () => {
  const renderComponent = () =>
    render(SearchTracksComponent, {
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideAngularQuery(new QueryClient()),
        PlayerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockBackendInterceptor,
          multi: true,
        },
      ],
    });

  test('should render', async () => {
    const component = await renderComponent();
    const user = userEvent.setup();
    const searchControl = await screen.findByRole('textbox', {
      name: /search/i,
    });
    await user.type(searchControl, 'Maryla');
    await waitForElementToBeRemoved(await screen.findAllByRole('progressbar'));
    component.detectChanges();
    expect(component.container).toMatchSnapshot();
  });
});

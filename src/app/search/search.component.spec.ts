import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockBackendInterceptor } from '../../tests/mock-backend.interceptor';
import { SearchComponent } from './search.component';
import { PlayerService } from '../services/player.service';
import userEvent from '@testing-library/user-event';

describe('SearchComponent', () => {
  const renderComponent = () =>
    render(SearchComponent, {
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

  test('should render', async () => {
    jest.useFakeTimers();
    const component = await renderComponent();
    const user = userEvent.setup({
      delay: 0,
      advanceTimers: jest.advanceTimersByTime,
    });
    const searchControl = await screen.findByRole('textbox', {
      name: /search/i,
    });
    await user.type(searchControl, 'Maryla');
    jest.advanceTimersByTime(600);
    component.detectChanges();
    expect(component.container).toMatchSnapshot();
  });
});

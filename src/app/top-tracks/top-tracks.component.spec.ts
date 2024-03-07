import { render } from '@testing-library/angular';
import { TopTracksComponent } from './top-tracks.component';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { PlayerService } from '../services/player.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockBackendInterceptor } from '../../tests/mock-backend.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
    jest.advanceTimersByTime(300);
    component.detectChanges();
    expect(component.container).toMatchSnapshot();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});

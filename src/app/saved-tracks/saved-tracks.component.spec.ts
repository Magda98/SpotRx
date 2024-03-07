import { render } from '@testing-library/angular';
import { SavedTracksComponent } from './saved-tracks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockBackendInterceptor } from '../../tests/mock-backend.interceptor';
import { PlayerService } from '../shared/services/player.service';

describe('SavedComponent', () => {
  test('should render', async () => {
    jest.useFakeTimers();
    const component = await render(SavedTracksComponent, {
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

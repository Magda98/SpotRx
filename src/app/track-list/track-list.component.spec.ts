import { render, screen } from '@testing-library/angular';
import { TrackListComponent } from './track-list.component';
import { PlayerComponent } from '../player/player.component';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockBackendInterceptor } from '../../tests/mock-backend.interceptor';
import { savedTracks } from '../../tests/mocks';
import { PlayerService } from '../services/player.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrackListComponent', () => {
  test('should render', async () => {
    const component = await render(TrackListComponent, {
      providers: [PlayerService],
      imports: [HttpClientTestingModule],
      componentInputs: {
        tracksList: savedTracks,
        isLoading: false,
        total: savedTracks.total,
      },
    });

    await screen.findByAltText('Saturn');
    expect(component.container).toMatchSnapshot();
  });
});

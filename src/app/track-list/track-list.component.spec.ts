import { render, screen } from '@testing-library/angular';
import { TrackListComponent } from './track-list.component';
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

import { toSignal } from '@angular/core/rxjs-interop';
import { TrackService } from './../services/track.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public featuredPlaylists = toSignal(this.trackService.getFeaturedPlaylists());
  readonly skeletonLoadingArray = Array.from({ length: 12 }, () => null);

  constructor(private trackService: TrackService) {}
}

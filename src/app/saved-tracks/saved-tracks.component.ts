import { Component, inject, signal } from '@angular/core';
import { TrackService } from '../shared/services/track.service';
import { PageEvent } from '@angular/material/paginator';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TrackListComponent } from '../shared/track-list/track-list.component';

@Component({
  selector: 'app-saved-tracks',
  templateUrl: './saved-tracks.component.html',
  styleUrls: ['./saved-tracks.component.scss'],
  standalone: true,
  imports: [TrackListComponent],
})
export class SavedTracksComponent {
  trackService = inject(TrackService);
  offset = signal(0);
  savedTracksQuery = injectQuery(() =>
    this.trackService.getSavedTracks(this.offset()),
  );
  getNextPage(page: PageEvent) {
    this.offset.set(page.pageSize * page.pageIndex);
  }
}

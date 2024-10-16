import { Component, inject, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TrackListComponent } from 'src/app/shared/components/track-list/track-list.component';
import { TrackService } from 'src/app/shared/services/track.service';

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

import { TrackService } from './../services/track.service';
import { ActivatedRoute } from '@angular/router';
import { Component, computed, signal } from '@angular/core';
import { map } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TrackListComponent } from '../track-list/track-list.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss'],
  standalone: true,
  imports: [TrackListComponent, NgxSkeletonLoaderModule],
})
export class PlaylistTracksComponent {
  offset = signal(0);
  playlistId = toSignal(
    this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')))
  );
  tracksQuery = injectQuery(() =>
    this.trackService.getPlaylistTracks(this.playlistId() ?? '', this.offset())
  );
  playlistInfo = injectQuery(() =>
    this.trackService.getPlaylistInfo(this.playlistId() ?? '')
  );
  total = computed(() => {
    const total = this.tracksQuery.data()?.total;
    return total ? total : 0;
  });

  constructor(
    private route: ActivatedRoute,
    public trackService: TrackService
  ) {}

  getNextPage(page: PageEvent) {
    this.offset.set(page.pageSize * page.pageIndex);
  }
}

import { TrackService } from '../services/track.service';
import { ActivatedRoute } from '@angular/router';
import { Component, computed, signal } from '@angular/core';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TrackListComponent } from '../track-list/track-list.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  standalone: true,
  imports: [TrackListComponent, NgxSkeletonLoaderModule],
})
export class PlaylistComponent {
  offset = signal(0);
  playlistId = toSignal(
    this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      distinctUntilChanged(),
      tap(() => {
        this.offset.set(0);
      })
    )
  );
  tracksQuery = injectQuery(() =>
    this.trackService.getPlaylistTracks(this.playlistId() ?? '', this.offset())
  );
  playlistInfo = injectQuery(() =>
    this.trackService.getPlaylistInfo(this.playlistId() ?? '')
  );

  constructor(
    private route: ActivatedRoute,
    public trackService: TrackService
  ) {}

  getNextPage(page: PageEvent) {
    this.offset.set(page.pageSize * page.pageIndex);
  }
}
import { TrackService } from './../services/track.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Signal, signal } from '@angular/core';
import { EMPTY, map, switchMap, zip } from 'rxjs';
import { Item } from '../interfaces/track';
import { PageEvent } from '@angular/material/paginator';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss'],
})
export class PlaylistTracksComponent implements OnInit {
  tracks: Signal<Item[]> = toSignal(this.trackService.getPlaylistTracks(), {
    initialValue: [],
  });
  playlistId: string | undefined;
  title = toSignal(
    this.trackService.getPlaylistInfo().pipe(map((val) => val.name))
  );
  total = toSignal(this.trackService.totalTracks, { requireSync: true });
  playlistData$ = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('id')),
    switchMap((playlistId) => {
      if (!playlistId) return EMPTY;

      this.playlistId = playlistId;
      this.trackService.currentPage.next(0);
      return zip(
        this.trackService.retrivePlaylistTracks(playlistId),
        this.trackService.retrivePlaylist(playlistId)
      );
    }),
    takeUntilDestroyed()
  );

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService
  ) {}

  ngOnInit(): void {
    this.playlistData$.subscribe();
  }

  getNextPage(page: PageEvent) {
    if (!this.playlistId) return;
    this.trackService
      .retrivePlaylistTracks(this.playlistId, page.pageSize * page.pageIndex)
      .subscribe();
  }
}

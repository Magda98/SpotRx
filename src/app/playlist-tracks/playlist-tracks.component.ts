import { TrackService } from './../services/track.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, filter, forkJoin, map, switchMap, tap } from 'rxjs';
import { Item } from '../interfaces/track';
import { PageEvent } from '@angular/material/paginator';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss']
})
export class PlaylistTracksComponent implements OnInit {
  tracks = this.trackService.getPlaylistTracks();
  playlistId = '';
  title = toSignal(this.trackService.playlisInfo.pipe(map((val) => val.name)))
  total = toSignal(this.trackService.totalTracks, {requireSync: true})
  playlistData$ = this.route.paramMap.pipe(
    takeUntilDestroyed(),
    switchMap((paramMap) => {
      const playlistId = paramMap.get('id');
      if (playlistId) {
        this.playlistId = playlistId;
        this.trackService.currentPage.next(0);
        this.trackService.retrivePlaylistTracks(playlistId);
        this.trackService.retrivePlaylist(playlistId);
      }

      return EMPTY
    })
  );

  constructor(private route: ActivatedRoute, private trackService: TrackService) { }

  ngOnInit(): void {
    this.playlistData$.subscribe()
  }

  getNextPage(page: PageEvent) {
    this.trackService.retrivePlaylistTracks(this.playlistId, page.pageSize * page.pageIndex);
  }
}

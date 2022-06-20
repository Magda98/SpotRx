import { TrackService } from './../services/track.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/track';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss']
})
export class PlaylistTracksComponent implements OnInit {
  tracks = new Observable<Item[]>();

  playlistId = '';

  title = ''

  total = 0

  constructor(private route: ActivatedRoute, private trackService: TrackService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const playlistId = paramMap.get('id');
      if (playlistId) {
        this.trackService.retrivePlaylistTracks(playlistId);
        this.trackService.retrivePlaylist(playlistId);
        this.playlistId = playlistId;
        this.trackService.currentPage.next(0);
      }
    })

    this.tracks = this.trackService.getPlaylistTracks();

    this.trackService.playlisInfo.subscribe(val => {
      this.title = val.name;
    })

    this.trackService.totalTracks.subscribe((total) => {
      this.total = total
    })
  }

  getNextPage(page: PageEvent) {
    console.log(page)
    this.trackService.retrivePlaylistTracks(this.playlistId, page.pageSize * page.pageIndex);
  }
}

import { TrackService } from './../services/track.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/track';

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss']
})
export class PlaylistTracksComponent implements OnInit {
  tracks = new Observable<Item[]>();
  title = ''

  constructor(private route: ActivatedRoute, private trackService: TrackService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const playlistId = paramMap.get('id');
      if (playlistId) {
        this.trackService.retrivePlaylistTracks(playlistId);
      }
    })

    this.tracks = this.trackService.getPlaylistTracks();

    this.trackService.playlisInfo.subscribe(val => {
      this.title = val.name;
    })
  }
}

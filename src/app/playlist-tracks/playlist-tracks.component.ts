import { TrackService } from './../services/track.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss']
})
export class PlaylistTracksComponent implements OnInit {

  constructor(private router: Router,  private route: ActivatedRoute, private trackService: TrackService) { }

  ngOnInit(): void {
    const playlistId = this.route.snapshot.paramMap.get('id');

    if (playlistId) {
      this.trackService.retrivePlaylistTracks(playlistId);
    }
  }

}

import { PlayerService } from './../services/player.service';
import { Item } from './../interfaces/track';
import { Observable } from 'rxjs';
import { TrackService } from './../services/track.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  savedTracks = new Observable<Item[]>();

  constructor(private trackService: TrackService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.savedTracks = this.trackService.getSavedTracks();
  }

  play(uri: string) {
    this.playerService.playSong(uri);
  }

}

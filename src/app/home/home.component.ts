import { Playlist } from './../interfaces/playlist';
import { PlayerService } from './../services/player.service';
import { Observable } from 'rxjs';
import { TrackService } from './../services/track.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public trackService: TrackService, private playerService: PlayerService) { }
}

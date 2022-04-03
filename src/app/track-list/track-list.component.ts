import { PlayerService } from './../services/player.service';
import { Item } from './../interfaces/track';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {
  @Input() tracksList = new Observable<Item[]>();

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  play(uri: string) {
    this.playerService.playSong(uri);
  }

}

import { PlayerService } from './../services/player.service';
import { Item } from './../interfaces/track';
import { from, map, Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {
  @Input() tracksList = new Observable<Item[]>();

  constructor(private playerService: PlayerService) { 
 
  }

  ngOnInit(): void {
  }

  play(index: number) {
    this.tracksList.pipe(map((items) => {
      this.playerService.playSong(items.map((item) => item.track.uri), index)
    }) ).subscribe()
  }

  durationTime(durationMs: number) {
    let duration = durationMs / (1000);
    const m = Math.floor(duration / 60);
    const s = Math.floor((duration % 60));
    return `${m}:${s}`;
  }

}

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
  currentItems: string[] = [];

  constructor(private playerService: PlayerService) { 
 
  }

  ngOnInit(): void {
    this.tracksList.subscribe(items => {
      this.currentItems = items.map(val => val.track.uri)
    })
  }

  play(index: number) {
    console.log(this.currentItems)
    this.playerService.playSong(this.currentItems, index);
  }

  durationTime(durationMs: number) {
    let duration = durationMs / 1000;
    duration = duration / 60;
    const m = Math.floor(duration);
    const s = Math.round((duration % m)*100);
    return `${m}:${s}`;
  }

}

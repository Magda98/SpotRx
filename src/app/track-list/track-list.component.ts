import { PlayerService } from './../services/player.service';
import { Item } from './../interfaces/track';
import { debounceTime, fromEvent, map, Observable, Subscription } from 'rxjs';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit, OnDestroy {
  @Input() tracksList = new Observable<Item[]>();

  @Output() getItems = new EventEmitter<number>();

  currentPage = 1;

  tracks: Item[] = [];

  subscriptions = new Subscription();

  constructor(private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.tracksList.subscribe((val) => {
      this.tracks = [...this.tracks, ...val]
    }))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.tracks = []
  }

  play(index: number) {
    const queue = this.tracks.map((item) => item.track.uri)
    this.playerService.queue.next({ queue, index })
  }

}

import { TrackService } from './../services/track.service';
import { PlayerService } from './../services/player.service';
import { Item } from './../interfaces/track';
import { debounceTime, fromEvent, map, Observable, Subscription } from 'rxjs';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
})
export class TrackListComponent implements OnInit, OnDestroy {
  @Input() tracksList = new Observable<Item[]>();

  @Input() total = 0;

  @Output() getNextPage = new EventEmitter<PageEvent>();

  currentPage = 0;

  pageSize = 4;

  tracks: Item[] = [];

  subscriptions = new Subscription();

  constructor(private playerService: PlayerService, private trackService: TrackService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.tracksList.subscribe((val) => {
      this.tracks = val
    }))

    this.trackService.currentPage.subscribe((val) => {
      this.currentPage = val
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.tracks = []
    this.currentPage = 0;
  }

  play(index: number) {
    const queue = this.tracks.map((item) => item.track.uri)
    this.playerService.queue.next({ queue, index })
  }

  handlePageEvent(page: PageEvent) {
    this.trackService.currentPage.next(page.pageIndex)
    this.getNextPage.emit(page);
  }
}

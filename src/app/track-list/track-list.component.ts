import { TrackService } from './../services/track.service';
import { PlayerService } from './../services/player.service';
import { Item } from './../interfaces/track';
import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
})
export class TrackListComponent {
  @Input() tracksList!: Signal<Item[]>;
  @Input() total = 0;
  @Output() getNextPage = new EventEmitter<PageEvent>();
  currentPage = toSignal(this.trackService.currentPage);
  pageSize = this.trackService.pageSize;
  readonly skeletonLoadingArray = Array.from({ length: 6 }, () => null);

  constructor(
    private playerService: PlayerService,
    private trackService: TrackService
  ) {}

  play(index: number) {
    const queue = this.tracksList()?.map((item) => item.track.uri);
    if (queue) this.playerService.queue.next({ queue, index });
  }

  handlePageEvent(page: PageEvent) {
    this.trackService.currentPage.next(page.pageIndex);
    this.getNextPage.emit(page);
  }
}

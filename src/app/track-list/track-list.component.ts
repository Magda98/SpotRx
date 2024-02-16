import { TrackService } from './../services/track.service';
import { PlayerService } from './../services/player.service';
import { TracksResponse } from './../interfaces/track';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  inject,
  input,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CreateQueryResult } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
})
export class TrackListComponent {
  private playerService = inject(PlayerService);
  private trackService = inject(TrackService);
  @Input() tracksListQuery!: CreateQueryResult<TracksResponse>;
  total = input(0);
  @Output() getNextPage = new EventEmitter<PageEvent>();
  pageSize = this.trackService.pageSize;
  readonly skeletonLoadingArray = Array.from({ length: 6 }, () => null);
  currentPage = computed(() => {
    const offset = this.tracksListQuery.data()?.offset;
    return offset ? offset / this.pageSize : 1;
  });

  play(index: number) {
    const queue = this.tracksListQuery
      .data()
      ?.items.map((item) => item.track.uri);
    if (queue) this.playerService.queue.next({ queue, index });
  }

  handlePageEvent(page: PageEvent) {
    this.getNextPage.emit(page);
  }
}

import { TrackService } from '../services/track.service';
import { PlayerService } from '../services/player.service';
import { TracksResponse } from '../interfaces/track';
import {
  Component,
  EventEmitter,
  Output,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgOptimizedImage } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DurationPipe } from './duration.pipe';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    NgOptimizedImage,
    NgxSkeletonLoaderModule,
    DurationPipe,
  ],
})
export class TrackListComponent {
  private playerService = inject(PlayerService);
  private trackService = inject(TrackService);
  tracksList = input.required<TracksResponse | undefined>();
  isLoading = input.required<boolean>();
  total = input.required();
  totalTracks = toSignal(
    toObservable(this.total).pipe(filter(Boolean), distinctUntilChanged())
  );
  @Output() getNextPage = new EventEmitter<PageEvent>();
  pageSize = this.trackService.pageSize;
  readonly skeletonLoadingArray = Array.from({ length: 6 }, () => null);
  private offset = toSignal(
    toObservable(this.tracksList).pipe(
      map((data) => data?.offset),
      filter(Boolean)
    )
  );
  currentPage = computed(() => {
    const offset = this.offset();
    if (!offset) return;
    return offset / this.pageSize;
  });

  play(index: number) {
    const queue = this.tracksList()?.items.map((item) => item.track.uri);
    if (queue) this.playerService.queue.next({ queue, index });
  }

  handlePageEvent(page: PageEvent) {
    this.getNextPage.emit(page);
  }
}

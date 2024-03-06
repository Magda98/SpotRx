import { TrackService } from '../../services/track.service';
import { PlayerService } from '../../services/player.service';
import { TracksResponse } from '../../interfaces/track';
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
  @Output() getNextPage = new EventEmitter<PageEvent>();
  pageSize = this.trackService.pageSize;
  readonly skeletonLoadingArray = Array.from({ length: 6 }, () => null);
  currentPage = computed(() => {
    const offset = this.tracksList()?.offset;
    return offset ? offset / this.pageSize : 0;
  });

  play(index: number) {
    const queue = this.tracksList()?.items.map((item) => item.track.uri);
    if (queue) this.playerService.queue.next({ queue, index });
  }

  handlePageEvent(page: PageEvent) {
    this.getNextPage.emit(page);
  }
}

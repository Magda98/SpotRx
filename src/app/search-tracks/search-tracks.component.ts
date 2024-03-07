import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TrackService } from '../shared/services/track.service';
import { PlayerService } from '../shared/services/player.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgOptimizedImage } from '@angular/common';
import { DurationPipe } from '../shared/track-list/duration.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-search-tracks',
  templateUrl: './search-tracks.component.html',
  styleUrls: ['./search-tracks.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
    DurationPipe,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
  ],
})
export class SearchTracksComponent {
  public trackService = inject(TrackService);
  private playerService = inject(PlayerService);
  public searchFromControl = new FormControl('');
  search = toSignal(
    this.searchFromControl.valueChanges.pipe(
      debounceTime(300),
      filter((searchValue) => !!searchValue?.length),
      distinctUntilChanged(),
      takeUntilDestroyed()
    )
  );
  searchQuery = injectQuery(() =>
    this.trackService.getSearchResults(this.search() ?? '')
  );
  readonly skeletonLoadingArray = Array.from({ length: 6 }, () => null);

  play(uri: string) {
    this.playerService.playSong([uri], 0);
  }
}

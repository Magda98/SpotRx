import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  EMPTY,
  tap,
} from 'rxjs';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TrackService } from '../services/track.service';
import { PlayerService } from '../services/player.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Track } from '../interfaces/track';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public searchFromControl = new FormControl('');
  private search = toSignal(
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

  constructor(
    public trackService: TrackService,
    private playerService: PlayerService
  ) {}

  play(uri: string) {
    this.playerService.playSong([uri], 0);
  }
}

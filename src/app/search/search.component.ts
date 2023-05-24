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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Track } from '../interfaces/track';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchFromControl = new FormControl('');
  public searchResults = signal<Track[]>([]);
  public isLoading = signal(false);
  private search$ = this.searchFromControl.valueChanges.pipe(
    debounceTime(300),
    filter((searchValue) => (searchValue?.length ? true : false)),
    distinctUntilChanged(),
    takeUntilDestroyed()
  );
  readonly skeletonLoadingArray = Array.from({ length: 6 }, () => null);

  constructor(
    public trackService: TrackService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.search$
      .pipe(
        tap(() => {
          this.isLoading.set(true);
        }),
        switchMap((searchValue) => {
          if (searchValue)
            return this.trackService.retriveSearchResults(searchValue);
          return EMPTY;
        })
      )
      .subscribe((searchResults) => {
        this.searchResults.set(searchResults.tracks.items);
        this.isLoading.set(false);
      });
  }

  play(uri: string) {
    this.playerService.playSong([uri], 0);
  }
}

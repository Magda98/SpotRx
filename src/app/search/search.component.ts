import { debounceTime, Subject, takeUntil, distinctUntilChanged, filter } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TrackService } from '../services/track.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchFromControl = new FormControl('');

  private destroy$: Subject<boolean> = new Subject();

  constructor(public trackService: TrackService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.searchFromControl.valueChanges.pipe(debounceTime(300), filter(val => val.length), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((val) => {
      this.trackService.retriveSearchResults(val)
    })
  }

  play(uri: string) {
    this.playerService.playSong([uri], 0)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

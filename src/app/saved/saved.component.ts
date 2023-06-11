import { Component, OnInit, Signal } from '@angular/core';
import { Item } from '../interfaces/track';
import { TrackService } from '../services/track.service';
import { PageEvent } from '@angular/material/paginator';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent implements OnInit {
  savedTracks: Signal<Item[]> = toSignal(this.trackService.getSavedTracks(), {
    initialValue: [],
  });
  total = toSignal(this.trackService.totalTracks, { initialValue: 0 });

  constructor(private trackService: TrackService) {}

  ngOnInit() {
    this.trackService.retriveSavedTracks().subscribe();
  }

  getNextPage(page: PageEvent) {
    this.trackService
      .retriveSavedTracks(page.pageSize * page.pageIndex)
      .subscribe();
  }
}

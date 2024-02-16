import {
  Component,
  OnInit,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Item } from '../interfaces/track';
import { TrackService } from '../services/track.service';
import { PageEvent } from '@angular/material/paginator';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent {
  trackService = inject(TrackService);
  offset = signal(0);
  savedTracksQuery = injectQuery(() =>
    this.trackService.getSavedTracks(this.offset())
  );

  getNextPage(page: PageEvent) {
    this.offset.set(page.pageSize * page.pageIndex);
  }
}

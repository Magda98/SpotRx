import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Item } from '../interfaces/track';
import { TrackService } from '../services/track.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  savedTracks!: Observable<Item[]>;

  total!: number;

  constructor(private trackService: TrackService) {
  }

  ngOnInit() {
    this.trackService.retriveSavedTracks();
    this.savedTracks = this.trackService.getSavedTracks();
    this.trackService.totalTracks.subscribe((total) => {
      this.total = total
    })
  }

  getNextPage(page: PageEvent) {
    this.trackService.retriveSavedTracks(page.pageSize * page.pageIndex);
  }
}

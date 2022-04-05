import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Item } from '../interfaces/track';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  savedTracks = new Observable<Item[]>();

  constructor(private trackService: TrackService) { 
  }

  ngOnInit(): void {
    this.savedTracks = this.trackService.getSavedTracks();

  }

}

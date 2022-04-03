import { Item, TracksResponse } from './../interfaces/track';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  savedTracks = new Subject<Item[]>();

  constructor(private http: HttpClient) { }

  getSavedTracks() {
    return this.savedTracks.asObservable();
  }

  retriveSavedTracks() {
    this.http.get<TracksResponse>(`me/tracks`).subscribe(val => {
      this.savedTracks.next(val.items)
    })
  }
}
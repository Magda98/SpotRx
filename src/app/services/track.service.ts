import { Playlist, PlaylistResponse } from './../interfaces/playlist';
import { Item, TracksResponse } from './../interfaces/track';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  savedTracks = new BehaviorSubject<Item[]>([]);
  userPlaylists = new BehaviorSubject<Playlist[]>([]);

  constructor(private http: HttpClient) { }

  getSavedTracks() {
    return this.savedTracks.asObservable();
  }

  getUserPlaylists() {
    return this.userPlaylists.asObservable();
  }

  retriveSavedTracks() {
    this.http.get<TracksResponse>(`me/tracks`).subscribe(val => {
      this.savedTracks.next(val.items)
    })
  }

  retriveUserPlaylists() {
    this.http.get<PlaylistResponse>(`me/playlists`).subscribe(val => {
      this.userPlaylists.next(val.items)
    })
  }
}

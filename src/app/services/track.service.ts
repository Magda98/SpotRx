import { Playlist, PlaylistResponse } from './../interfaces/playlist';
import { Item, TracksResponse } from './../interfaces/track';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  savedTracks = new BehaviorSubject<Item[]>([]);

  playlistTracks = new BehaviorSubject<Item[]>([]);

  playlisInfo = new Subject<Playlist>();

  userPlaylists = new BehaviorSubject<Playlist[]>([]);

  constructor(private http: HttpClient) { }

  getSavedTracks() {
    return this.savedTracks.asObservable();
  }

  getPlaylistTracks() {
    return this.playlistTracks.asObservable();
  }

  getUserPlaylists() {
    return this.userPlaylists.asObservable();
  }

  retriveSavedTracks() {
    let params = new HttpParams();
    params = params.append('limit', 50);

    this.http.get<TracksResponse>(`me/tracks`, { params }).subscribe(val => {
      this.savedTracks.next(val.items)
    })
  }

  retriveUserPlaylists() {
    this.http.get<PlaylistResponse>(`me/playlists`).subscribe(val => {
      this.userPlaylists.next(val.items)
    })
  }

  retrivePlaylistTracks(id: string) {
    this.http.get<Playlist>(`playlists/${id}`).subscribe(val => {
      this.playlistTracks.next(val.tracks.items)
      this.playlisInfo.next(val)
    })
  }
}

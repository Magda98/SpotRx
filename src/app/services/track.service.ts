import { Playlist, PlaylistResponse } from './../interfaces/playlist';
import { Item, TracksResponse } from './../interfaces/track';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, bufferToggle, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  savedTracks = new BehaviorSubject<Item[]>([]);

  playlistTracks = new BehaviorSubject<Item[]>([]);

  totalTracks = new BehaviorSubject<number>(0);

  currentPage = new BehaviorSubject<number>(0);

  playlisInfo = new Subject<Playlist>();

  userPlaylists = new BehaviorSubject<Playlist[]>([]);

  params = new HttpParams();

  constructor(private http: HttpClient) {
    this.params = this.params.append('limit', 4);
  }

  getSavedTracks() {
    return this.savedTracks.asObservable();
  }

  getPlaylistTracks() {
    return this.playlistTracks.asObservable();
  }

  getUserPlaylists() {
    return this.userPlaylists.asObservable();
  }

  retriveSavedTracks(offset: number = 0) {
    const params = this.params.append('offset', offset);

    this.http.get<TracksResponse>(`me/tracks`, { params }).subscribe(val => {
      this.savedTracks.next(val.items)
      this.totalTracks.next(val.total)
    })
  }

  retriveUserPlaylists() {
    this.http.get<PlaylistResponse>(`me/playlists`).subscribe(val => {
      this.userPlaylists.next(val.items)
    })
  }

  retrivePlaylist(id: string, offset: number = 0) {
    const params = this.params.append('offset', offset);

    this.http.get<Playlist>(`playlists/${id}`, { params }).subscribe(val => {
      this.playlisInfo.next(val)
    })
  }

  retrivePlaylistTracks(id: string, offset: number = 0) {
    const params = this.params.append('offset', offset);

    this.http.get<TracksResponse>(`playlists/${id}/tracks`, { params }).subscribe(val => {
      this.playlistTracks.next(val.items)
      this.totalTracks.next(val.total)
    })
  }
}

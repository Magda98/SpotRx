import { FeaturedPlaylistResponse, Playlist, PlaylistResponse } from './../interfaces/playlist';
import { Item, TracksResponse, Track, SearchResponse } from './../interfaces/track';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  savedTracks = new BehaviorSubject<Item[]>([]);
  searchResultTracks = new BehaviorSubject<Track[]>([]);
  playlistTracks = new BehaviorSubject<Item[]>([]);
  totalTracks = new BehaviorSubject<number>(0);
  currentPage = new BehaviorSubject<number>(0);
  playlisInfo = new Subject<Playlist>();
  userPlaylists = new BehaviorSubject<Playlist[]>([]);
  featuredPlaylists = new BehaviorSubject<Playlist[]>([]);
  params = new HttpParams();
  pageSize = 6;

  constructor(private http: HttpClient) {
    this.params = this.params.append('limit', this.pageSize);
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

  getFeaturedPlaylists() {
    return this.featuredPlaylists.asObservable();
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

  retriveFeaturedPlaylists() {
    let params = new HttpParams();
    params = params.append('limit', 12);

    this.http.get<FeaturedPlaylistResponse>(`browse/featured-playlists`, { params }).subscribe(val => {
      this.featuredPlaylists.next(val.playlists.items)
    })
  }

  retriveSearchResults(query: string) {
    this.http.get<SearchResponse>(`search`, { params: { q: query, type: ["track"], limit: 10 } }).subscribe(val => {
      this.searchResultTracks.next(val.tracks.items)
    })
  }
}

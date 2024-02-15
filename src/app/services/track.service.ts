import {
  FeaturedPlaylistResponse,
  Playlist,
  PlaylistResponse,
} from './../interfaces/playlist';
import { Item, TracksResponse, SearchResponse } from './../interfaces/track';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, tap } from 'rxjs';
import { LoaderBaseService } from './loader-base.service';
import { createQuery } from 'src/utils/createQuery';

@Injectable({
  providedIn: 'root',
})
export class TrackService extends LoaderBaseService {
  private savedTracks = new BehaviorSubject<Item[]>([]);
  private userPlaylists = new BehaviorSubject<Playlist[]>([]);
  private playlisInfo = new ReplaySubject<Playlist>();
  private playlistTracks = new BehaviorSubject<Item[]>([]);
  totalTracks = new BehaviorSubject<number>(0);
  currentPage = new BehaviorSubject<number>(0);
  private params = new HttpParams();
  pageSize = 6;

  constructor(private http: HttpClient) {
    super();
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
    return createQuery(
      ['featuredPlaylists'] as const,
      this.retriveFeaturedPlaylists()
    );
  }

  getPlaylistInfo() {
    return this.playlisInfo.asObservable();
  }

  retriveSavedTracks(offset: number = 0) {
    const params = this.params.append('offset', offset);
    const getData$ = this.http
      .get<TracksResponse>(`me/tracks`, { params })
      .pipe(
        tap((val) => {
          this.savedTracks.next(val.items);
          this.totalTracks.next(val.total);
        })
      );
    return this.getDataWithLoader(getData$);
  }

  retriveUserPlaylists() {
    return this.http.get<PlaylistResponse>(`me/playlists`).pipe(
      tap((val) => {
        this.userPlaylists.next(val.items);
      })
    );
  }

  retrivePlaylist(id: string, offset: number = 0) {
    const params = this.params.append('offset', offset);

    return this.http.get<Playlist>(`playlists/${id}`, { params }).pipe(
      tap((val) => {
        this.playlisInfo.next(val);
      })
    );
  }

  retrivePlaylistTracks(id: string, offset: number = 0) {
    const params = this.params.append('offset', offset);
    const getData$ = this.http
      .get<TracksResponse>(`playlists/${id}/tracks`, { params })
      .pipe(
        tap((val) => {
          this.playlistTracks.next(val.items);
          this.totalTracks.next(val.total);
        })
      );
    return this.getDataWithLoader(getData$);
  }

  retriveFeaturedPlaylists() {
    let params = new HttpParams();
    params = params.append('limit', 12);

    return this.http.get<FeaturedPlaylistResponse>(
      `browse/featured-playlists`,
      { params }
    );
  }

  retriveSearchResults(query: string) {
    return this.http.get<SearchResponse>(`search`, {
      params: { q: query, type: ['track'], limit: 10 },
    });
  }

  checkUserSavedTrack(trackId: string) {
    return this.http.get<boolean[]>(`me/tracks/contains`, {
      params: {
        ids: trackId,
      },
    });
  }

  saveTrack(trackId: string) {
    return this.http.put<void>(`me/tracks`, { ids: [trackId] });
  }

  deleteTrack(trackId: string) {
    return this.http.delete<void>(`me/tracks`, {
      body: {
        ids: [trackId],
      },
    });
  }

  toggleShuffle(state: boolean) {
    return this.http.put<void>(`me/player/shuffle?state=${state}`, {});
  }
}

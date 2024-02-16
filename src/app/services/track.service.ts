import {
  FeaturedPlaylistResponse,
  Playlist,
  PlaylistResponse,
} from './../interfaces/playlist';
import { TracksResponse, SearchResponse } from './../interfaces/track';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createQuery } from 'src/utils/createQuery';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private params = new HttpParams();
  readonly pageSize = 6;

  constructor(private http: HttpClient) {
    this.params = this.params.append('limit', this.pageSize);
  }

  getSavedTracks(offset: number) {
    return createQuery(
      ['savedTracks', { page: offset }] as const,
      this.retriveSavedTracks(offset)
    );
  }

  retriveSavedTracks(offset: number = 0) {
    const params = this.params.append('offset', offset);
    return this.http.get<TracksResponse>(`me/tracks`, { params });
  }

  getPlaylistTracks(id: string, offset: number) {
    return createQuery(
      ['playlistTracks', { id, offset }] as const,
      this.retrivePlaylistTracks(id, offset)
    );
  }

  retrivePlaylistTracks(id: string, offset: number = 0) {
    const params = this.params.append('offset', offset);
    return this.http.get<TracksResponse>(`playlists/${id}/tracks`, { params });
  }

  getUserPlaylists() {
    return createQuery(
      ['userPlaylists'],
      this.http.get<PlaylistResponse>(`me/playlists`)
    );
  }

  getFeaturedPlaylists() {
    return createQuery(
      ['featuredPlaylists'] as const,
      this.retriveFeaturedPlaylists()
    );
  }

  retriveFeaturedPlaylists() {
    let params = new HttpParams();
    params = params.append('limit', 12);

    return this.http.get<FeaturedPlaylistResponse>(
      `browse/featured-playlists`,
      { params }
    );
  }

  getPlaylistInfo(id: string) {
    return createQuery(
      ['playlistInfo', { id }] as const,
      this.retrivePlaylist(id)
    );
  }

  retrivePlaylist(id: string, offset: number = 0) {
    const params = this.params.append('offset', offset);
    return this.http.get<Playlist>(`playlists/${id}`, { params });
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

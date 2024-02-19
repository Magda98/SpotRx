import {
  FeaturedPlaylistResponse,
  Playlist,
  PlaylistResponse,
} from './../interfaces/playlist';
import { TracksResponse, SearchResponse } from './../interfaces/track';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createQuery } from 'src/app/utils/createQuery';

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
    const params = this.params.append('offset', offset);
    return createQuery(
      ['savedTracks', { page: offset }] as const,
      this.http.get<TracksResponse>(`me/tracks`, { params })
    );
  }

  getPlaylistTracks(id: string, offset: number) {
    const params = this.params.append('offset', offset);
    return createQuery(
      ['playlistTracks', { id, offset }] as const,
      this.http.get<TracksResponse>(`playlists/${id}/tracks`, { params })
    );
  }

  getUserPlaylists() {
    return createQuery(
      ['userPlaylists'],
      this.http.get<PlaylistResponse>(`me/playlists`)
    );
  }

  getFeaturedPlaylists() {
    const params = this.params.set('limit', 12);
    return createQuery(
      ['featuredPlaylists'] as const,
      this.http.get<FeaturedPlaylistResponse>(`browse/featured-playlists`, {
        params,
      })
    );
  }

  getPlaylistInfo(id: string) {
    return createQuery(
      ['playlistInfo', { id }] as const,
      this.http.get<Playlist>(`playlists/${id}`)
    );
  }

  getSearchResults(query: string) {
    return createQuery(
      ['searchResults', { query }] as const,
      this.http.get<SearchResponse>(`search`, {
        params: { q: query, type: ['track'], limit: 10 },
      }),
      !!query
    );
  }

  checkUserSavedTracks(trackIds: string[]) {
    return createQuery(['isSavedTrack', {trackIds}] as const, this.http.get<boolean[]>(`me/tracks/contains`, {
      params: {
        ids: trackIds,
      },
    }), !!trackIds.length);
  }

  saveTrack(trackId: string) {
    // TODO: use queryMutation
    return this.http.put<void>(`me/tracks`, { ids: [trackId] });
  }

  deleteTrack(trackId: string) {
    // TODO: use queryMutation
    return this.http.delete<void>(`me/tracks`, {
      body: {
        ids: [trackId],
      },
    });
  }

  toggleShuffle(state: boolean) {
    // TODO: use queryMutation
    return this.http.put<void>(`me/player/shuffle?state=${state}`, {});
  }
}

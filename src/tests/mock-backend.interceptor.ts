import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { User } from '../app/shared/interfaces/user';
import {
  FeaturedPlaylistResponse,
  Playlist,
  PlaylistResponse,
} from '../app/shared/interfaces/playlist';
import {
  featuredPlaylists,
  playlist,
  playlistTracks,
  playlistsResponse,
  savedTracks,
  searchResponse,
  user,
} from './mocks';
import {
  SearchResponse,
  Track,
  TracksResponse,
} from 'src/app/shared/interfaces/track';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    if (req.url.endsWith('me') && req.method == 'GET') {
      return new Observable<HttpResponse<User>>((observer) => {
        observer.next(
          new HttpResponse<User>({
            body: user,
            status: 200,
          })
        );
        observer.complete();
      }).pipe(delay(200));
    }

    if (req.url.endsWith('playlists') && req.method == 'GET') {
      return new Observable<HttpResponse<PlaylistResponse>>((observer) => {
        observer.next(
          new HttpResponse<PlaylistResponse>({
            body: playlistsResponse,
            status: 200,
          })
        );
        observer.complete();
      }).pipe(delay(200));
    }

    if (
      req.url.endsWith('playlists/50Gsv3p7qLLPVzfPBu8UcO') &&
      req.method == 'GET'
    ) {
      return new Observable<HttpResponse<Playlist>>((observer) => {
        observer.next(
          new HttpResponse<Playlist>({
            body: playlist,
            status: 200,
          })
        );
        observer.complete();
      }).pipe(delay(200));
    }

    if (req.url.endsWith('browse/featured-playlists') && req.method == 'GET') {
      return new Observable<HttpResponse<FeaturedPlaylistResponse>>(
        (observer) => {
          observer.next(
            new HttpResponse<FeaturedPlaylistResponse>({
              body: featuredPlaylists,
              status: 200,
            })
          );
          observer.complete();
        }
      ).pipe(delay(200));
    }

    if (req.url.endsWith('me/tracks') && req.method == 'GET') {
      return new Observable((observer) => {
        observer.next(
          new HttpResponse<TracksResponse>({
            body: savedTracks,
            status: 200,
          })
        );
        observer.complete();
      });
    }

    if (req.url.endsWith('search') && req.method == 'GET') {
      return new Observable<HttpResponse<SearchResponse>>((observer) => {
        observer.next(
          new HttpResponse<SearchResponse>({
            body: searchResponse,
            status: 200,
          })
        );
        observer.complete();
      }).pipe(delay(200));
    }

    if (req.url.match(/playlists\/.*\/tracks/)) {
      return new Observable<HttpResponse<TracksResponse>>((observer) => {
        observer.next(
          new HttpResponse<TracksResponse>({
            body: playlistTracks,
            status: 200,
          })
        );
        observer.complete();
      }).pipe(delay(200));
    }

    if (req.url.endsWith('me/top/tracks')) {
      return new Observable<HttpResponse<TracksResponse<Track>>>((observer) => {
        observer.next(
          new HttpResponse<TracksResponse<Track>>({
            body: {
              ...savedTracks,
              items: savedTracks.items.map((item) => ({
                ...item.track,
              })),
            },
            status: 200,
          })
        );
        observer.complete();
      }).pipe(delay(200));
    }
    // pass through other requests.
    return next.handle(req);
  }
}

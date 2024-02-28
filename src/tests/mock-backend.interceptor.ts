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
import { Observable } from 'rxjs';
import { User } from '../app/interfaces/user';
import { Playlist, PlaylistResponse } from '../app/interfaces/playlist';
import { playlist, playlistsResponse, user } from './mocks';

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
      return new Observable((observer) => {
        observer.next(
          new HttpResponse<User>({
            body: user,
            status: 200,
          })
        );
        observer.complete();
      });
    }

    if (req.url.endsWith('playlists') && req.method == 'GET') {
      return new Observable((observer) => {
        observer.next(
          new HttpResponse<PlaylistResponse>({
            body: playlistsResponse,
            status: 200,
          })
        );
        observer.complete();
      });
    }

    if (
      req.url.endsWith('playlists/50Gsv3p7qLLPVzfPBu8UcO') &&
      req.method == 'GET'
    ) {
      return new Observable((observer) => {
        observer.next(
          new HttpResponse<Playlist>({
            body: playlist,
            status: 200,
          })
        );
        observer.complete();
      });
    }
    // browse/featured-playlists
    if (req.url.endsWith('browse/featured-playlists') && req.method == 'GET') {
    }
    // pass through other requests.
    return next.handle(req);
  }
}

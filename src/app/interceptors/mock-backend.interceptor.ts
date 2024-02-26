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
import { User } from '../interfaces/user';

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
            body: {
              display_name: 'pieceofsth7',
              external_urls: {
                spotify:
                  'https://open.spotify.com/user/f2o7vc8wi9351bcn76igbhe2i',
              },
              href: 'https://api.spotify.com/v1/users/f2o7vc8wi9351bcn76igbhe2i',
              id: 'f2o7vc8wi9351bcn76igbhe2i',
              images: [
                {
                  url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2046809475373475&height=50&width=50&ext=1711003338&hash=AfrKCTPEXL-APstaCRqb6iOzqjl5RHKOwdXRP0WTcNeYdQ',
                  height: 64,
                  width: 64,
                },
                {
                  url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2046809475373475&height=300&width=300&ext=1711003338&hash=AfqKpNyFIAuS_M4gwqL8eAZNp2fgALFMnqTRsvVRRG4E5g',
                  height: 300,
                  width: 300,
                },
              ],
              type: 'user',
              uri: 'spotify:user:f2o7vc8wi9351bcn76igbhe2i',
              followers: {
                total: 7,
              },
              country: 'PL',
              product: 'premium',
              explicit_content: {
                filter_enabled: false,
                filter_locked: false,
              },
              email: 'magdakochman7@gmail.com',
            },
            status: 200,
          })
        );
        observer.complete();
      });
    }

    // pass through other requests.
    return next.handle(req);
  }
}

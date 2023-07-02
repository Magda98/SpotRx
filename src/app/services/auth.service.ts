import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';
import { base64url, generateCodeChallenge, randomBytes } from 'src/utils';
import { Token } from '../interfaces/token';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HEADER_CONFIG, SPORIFY_SCOPES } from '../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = new BehaviorSubject<string | undefined>(undefined);
  tokenObj = new Subject<Token>();
  loggedIn = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService
  ) {
    const data = this.storage.getData('token');

    if (data) {
      this.token.next(data?.access_token);
      this.tokenObj.next(data);
    }

    this.tokenObj.asObservable().subscribe((token) => {
      if (token) {
        this.storage.setData('token', token);
      }
    });
  }

  retriveToken() {
    return this.token.asObservable();
  }

  async login() {
    const code_verifier = base64url(randomBytes(96));
    const code = await generateCodeChallenge(code_verifier);
    const baseUrl = 'https://accounts.spotify.com/authorize';
    const clientId = '57a795ef5d9a4ccca747877d47fbc61d';
    const scope = SPORIFY_SCOPES.join('%20');
    const responseType = 'code';

    window.sessionStorage.setItem('code_verifier', code_verifier);
    window.location.href = `${baseUrl}?client_id=${clientId}&scope=${scope}&redirect_uri=${environment.redirectUri}&response_type=${responseType}&code_challenge_method=S256&code_challenge=${code}`;
  }

  getToken() {
    const code_verifier = window.sessionStorage.getItem('code_verifier') ?? '';
    const url = location.search;
    const code = new URLSearchParams(url).get('code') ?? '';
    const urlParams = new URLSearchParams();

    urlParams.append('grant_type', 'authorization_code');
    urlParams.append('code', code);
    urlParams.append('redirect_uri', environment.redirectUri);
    urlParams.append('client_id', '57a795ef5d9a4ccca747877d47fbc61d');
    urlParams.append('code_verifier', code_verifier);

    return this.http
      .post<Token>(
        'https://accounts.spotify.com/api/token',
        urlParams,
        HEADER_CONFIG
      )
      .pipe(
        tap((token) => {
          this.token.next(token.access_token);
          this.tokenObj.next(token);
          this.loggedIn.next(true);
          this.router.navigate(['']);
        })
      );
  }

  getRefreshToken() {
    return this.tokenObj.pipe(
      switchMap((token) => {
        const refreshToken = token?.refresh_token ?? '';
        const urlParams = new URLSearchParams();

        urlParams.append('grant_type', 'refresh_token');
        urlParams.append('refresh_token', refreshToken);
        urlParams.append('client_id', '57a795ef5d9a4ccca747877d47fbc61d');

        return this.http.post<Token>(
          'https://accounts.spotify.com/api/token',
          urlParams,
          HEADER_CONFIG
        );
      })
    );
  }
}

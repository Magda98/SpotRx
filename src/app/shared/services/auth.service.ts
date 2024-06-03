import { AuthData } from './../interfaces/authData';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {
  base64url,
  generateCodeChallenge,
  randomBytes,
} from '../../utils/utils';
import { CLIENT_ID, HEADER_CONFIG, SPORIFY_SCOPES } from '../../utils/config';
import { injectStore } from '@ceski23/stan-js-angular';
import { authStore } from '../store/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authTokenUrl = 'https://accounts.spotify.com/api/token';
  private readonly authUrl = 'https://accounts.spotify.com/authorize';
  private readonly authDataSotrageKey = 'authData';
  authData = new BehaviorSubject<AuthData | undefined>(undefined);
  refreshToken = new BehaviorSubject<string | undefined>(undefined);
  loggedIn = new ReplaySubject<boolean>();
  state = injectStore(authStore)

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService
  ) {
    const data: AuthData | null = this.storage.getData(this.authDataSotrageKey);
    if (data) {
      this.state.token.set(data.access_token)
      this.authData.next(data ?? undefined);
      this.refreshToken.next(data.refresh_token);
    }
    if (!data) this.loggedIn.next(false);

    this.syncAuthDataInStorage().subscribe();
  }

  /**
   * Auth data should be synced with local storage
   * over the life of the app
   * @returns Observable<AuthData | undefined>
   */
  syncAuthDataInStorage() {
    return this.authData.pipe(
      tap((authData) => {
        if (authData) this.storage.setData(this.authDataSotrageKey, authData);
      })
    );
  }

  logout() {
    this.storage.removeData(this.authDataSotrageKey);
    window.location.reload();
  }

  async login() {
    const code_verifier = base64url(randomBytes(96));
    const code = await generateCodeChallenge(code_verifier);
    const scope = SPORIFY_SCOPES.join('%20');
    const responseType = 'code';

    window.sessionStorage.setItem('code_verifier', code_verifier);
    window.location.href = `${this.authUrl}?client_id=${CLIENT_ID}&scope=${scope}&redirect_uri=${environment.redirectUri}&response_type=${responseType}&code_challenge_method=S256&code_challenge=${code}`;
  }

  getToken() {
    const code_verifier = window.sessionStorage.getItem('code_verifier') ?? '';
    const url = location.search;
    const code = new URLSearchParams(url).get('code') ?? '';
    const urlParams = new URLSearchParams();

    urlParams.append('grant_type', 'authorization_code');
    urlParams.append('code', code);
    urlParams.append('redirect_uri', environment.redirectUri);
    urlParams.append('client_id', CLIENT_ID);
    urlParams.append('code_verifier', code_verifier);

    return this.http
      .post<AuthData>(this.authTokenUrl, urlParams, HEADER_CONFIG)
      .pipe(
        tap((authData) => {
          this.state.token.set(authData.access_token)
          this.authData.next(authData);
          this.loggedIn.next(true);
          this.router.navigate(['']);
        })
      );
  }

  getRefreshToken() {
    return this.refreshToken.pipe(
      switchMap((refreshToken) => {
        const urlParams = new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken ?? '',
          client_id: CLIENT_ID,
        });

        return this.http.post<AuthData>(
          this.authTokenUrl,
          urlParams,
          HEADER_CONFIG
        );
      }),
      tap((authData) => {
        this.state.token.set(authData.access_token)
        this.authData.next(authData);
        this.loggedIn.next(true);
        // TODO: initialize script after making sure that token is valid
        // reload to properly initialize Spotify WebPlayer SDK
        window.location.reload();
      })
    );
  }
}

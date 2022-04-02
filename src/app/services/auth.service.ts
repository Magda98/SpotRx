import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { base64url, generateCodeChallenge, randomBytes } from 'src/utils';
import { Token } from '../interfaces/token';
import {Router} from '@angular/router';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   token = new BehaviorSubject<string | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router, private storage: StorageService) { 
    const data = this.storage.getData("token");
    
    if (data) {
      this.token.next(data);
    }

    this.retriveToekn().subscribe(token => {
      if (token) {
        this.storage.setData("token", token)
      }
    })
  }

  retriveToekn() {
    return this.token.asObservable();
  }

    async login() {
    const code_verifier = base64url(randomBytes(96));
    const code = await generateCodeChallenge(code_verifier);

    const baseUrl = 'https://accounts.spotify.com/authorize';
    const clientId = '57a795ef5d9a4ccca747877d47fbc61d';
    const redirectUri = "http://localhost:4200/";

    const scopes = new Array(
      'user-read-private',
      'user-read-email',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-modify-playback-state',
      'streaming',
      'user-library-modify',
      'user-library-read',
      'user-top-read',
    );

    const scope = scopes.join('%20');
    const responseType = 'code';

    window.sessionStorage.setItem('code_verifier', code_verifier);
    window.location.href = `${baseUrl}?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=${responseType}&code_challenge_method=S256&code_challenge=${code}`;
  }

  getToken() {
    const code_verifier = window.sessionStorage.getItem('code_verifier') ?? "";
    
    const url = location.search;
    const code = new URLSearchParams(url).get("code") ?? "";

    const urlParams = new URLSearchParams();
    urlParams.append('grant_type', 'authorization_code');
    urlParams.append('code', code);
    urlParams.append(
      'redirect_uri',
      "http://localhost:4200/"
    );
    urlParams.append('client_id', '57a795ef5d9a4ccca747877d47fbc61d');
    urlParams.append('code_verifier', code_verifier);

    this.http.post<Token>("https://accounts.spotify.com/api/token", urlParams, config).subscribe(val => {
      this.token.next(val.access_token);
      this.router.navigate([""]);
    })
  }
}

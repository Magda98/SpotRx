import { AuthInterceptor } from './../auth.interceptor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { base64url, randomBytes, generateCodeChallenge } from 'src/utils';
import { Token } from 'src/app/interfaces/token';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://api.spotify.com/v1/';

  constructor(private http: HttpClient) { }



  retriveUserData() {
    this.http.get(`${this.baseUrl}me`).subscribe(val => console.log(val))
  }
}

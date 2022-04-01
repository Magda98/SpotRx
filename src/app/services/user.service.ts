import { User } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://api.spotify.com/v1/';
  userData = new Subject<User>();

  constructor(private http: HttpClient) { }

  getUserData() {
    return this.userData.asObservable();
  }

  retriveUserData() {
    this.http.get<User>(`${this.baseUrl}me`).subscribe(val => {
      this.userData.next(val);
    })
  }
}

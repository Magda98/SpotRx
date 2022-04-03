import { AuthService } from './auth.service';
import { User } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData = new Subject<User>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserData() {
    return this.userData.asObservable();
  }

  retriveUserData() {
    this.http.get<User>(`me`).subscribe(val => {
      this.userData.next(val);
      this.authService.loggedIn.next(true);
    })
  }
}

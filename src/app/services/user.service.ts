import { AuthService } from './auth.service';
import { User } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData = new ReplaySubject<User>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserData() {
    return this.userData.asObservable();
  }

  retriveUserData() {
    return this.http.get<User>(`me`).pipe(
      tap((val) => {
        this.userData.next(val);
        this.authService.loggedIn.next(true);
      })
    );
  }
}

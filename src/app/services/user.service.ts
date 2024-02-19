import { AuthService } from './auth.service';
import { User } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createQuery } from '../utils/createQuery';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserData() {
    return createQuery(['userData'] as const ,this.http.get<User>(`me`).pipe(
      tap(() => {
        this.authService.loggedIn.next(true);
      })
    ));
  }
}

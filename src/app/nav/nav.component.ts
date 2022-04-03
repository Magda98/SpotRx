import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userData: Observable<User>;
  loggedIn: Observable<boolean>;

  constructor(private userService: UserService, private authService: AuthService) { 
    this.userData = userService.getUserData();
    this.loggedIn = authService.loggedIn.asObservable();
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login();
  }

}

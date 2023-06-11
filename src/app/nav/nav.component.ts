import { TrackService } from './../services/track.service';
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  userData = this.userService.getUserData();
  loggedIn = this.authService.loggedIn.asObservable();
  userPlaylists = this.trackService.getUserPlaylists();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private trackService: TrackService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login();
  }
}

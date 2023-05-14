import { TrackService } from './../services/track.service';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { Playlist } from '../interfaces/playlist';

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

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
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userData: Observable<User>;
  loggedIn: Observable<boolean>;
  userPlaylists: Observable<Playlist[]>;

  constructor(private userService: UserService, private authService: AuthService, private trackService: TrackService) { 
    this.userData = userService.getUserData();
    this.loggedIn = authService.loggedIn.asObservable();
    this.userPlaylists = trackService.getUserPlaylists();
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login();
  }

}

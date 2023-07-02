import { EMPTY, switchMap, zip } from 'rxjs';
import { TrackService } from './services/track.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PlayerService } from './services/player.service';
import { icons } from './icons';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn = this.authService.loggedIn.asObservable();
  private auth = this.authService.retriveToken().pipe(
    switchMap((token) => {
      if (!token) return EMPTY;
      this.playerService.initializePlayer(token);
      return zip(
        this.userService.retriveUserData(),
        this.trackService.retriveUserPlaylists(),
        this.trackService.retriveFeaturedPlaylists()
      );
    })
  );

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private playerService: PlayerService,
    private trackService: TrackService
  ) {}

  ngOnInit() {
    if (location.search) {
      this.authService.getToken().subscribe();
    }
    this.auth.subscribe();
  }

  login() {
    this.authService.login();
  }
}

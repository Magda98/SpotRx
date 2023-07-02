import { EMPTY, switchMap, zip } from 'rxjs';
import { TrackService } from './services/track.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from './services/player.service';
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
      // this.playerService.initializePlayer(token);
      this.initSpotifyScript(token);
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

  initSpotifyScript(token: string) {
    this.playerService.initializePlayer(token);

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);
  }

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

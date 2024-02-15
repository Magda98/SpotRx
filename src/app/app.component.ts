import { toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, switchMap, zip } from 'rxjs';
import { TrackService } from './services/track.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Component, OnInit, signal } from '@angular/core';
import { PlayerService } from './services/player.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn = toSignal(this.authService.loggedIn);
  menuOpen = signal(false);
  private auth = this.authService.retriveToken().pipe(
    switchMap((token) => {
      if (!token) {
        this.authService.loggedIn.next(false);
        return EMPTY;
      }
      this.initSpotifyScript(token);
      return zip(
        this.userService.retriveUserData(),
        this.trackService.retriveUserPlaylists(),
        this.trackService.retriveFeaturedPlaylists()
      );
    })
  );
  playerState = this.playerService.getPlayerState();
  isProductionMode = environment.production;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private playerService: PlayerService,
    private trackService: TrackService
  ) {}

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

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

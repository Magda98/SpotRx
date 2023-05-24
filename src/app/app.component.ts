import {
  EMPTY,
  interval,
  of,
  switchMap,
  zip,
} from 'rxjs';
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
  title = 'spotrx';
  private auth = this.authService.retriveToekn().pipe(
    switchMap((value) => {
      if (!value) return EMPTY;
      this.playerService.initializePlayer();
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
      this.authService.getToken();
    }
    this.auth.subscribe();

    const x = of(1);

    const y = x.pipe(switchMap(() => interval(500)));
  }
}

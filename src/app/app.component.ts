import { Subscription } from 'rxjs';
import { TrackService } from './services/track.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  title = 'spotrx'

  constructor(private authService: AuthService, private userService: UserService, private playerService: PlayerService, private trackService: TrackService) {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    if (location.search) {
      this.authService.getToken();
    }

    this.subscriptions.add(this.authService.retriveToekn().subscribe((val) => {
      if (val) {
        this.userService.retriveUserData();
        this.playerService.initializePlayer();
        this.trackService.retriveUserPlaylists();
        this.trackService.retriveFeaturedPlaylists()
      }
    }))
  }



}

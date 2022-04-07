import { TrackService } from './services/track.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Component } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotrx';

  constructor(private authService: AuthService, private userService: UserService, private playerService: PlayerService,private trackService: TrackService) {
    
  }

  ngOnInit() {
    if (location.search) {
      this.authService.getToken();
    }

    this.authService.retriveToekn().subscribe((val) => {
      if (val) {
        this.userService.retriveUserData();
        this.playerService.initializePlayer();
        this.trackService.retriveSavedTracks();
        this.trackService.retriveUserPlaylists();
      }
    });
  }



}

import { toSignal } from '@angular/core/rxjs-interop';
import { TrackService } from './../services/track.service';
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  userData = toSignal(this.userService.getUserData());
  userPlaylists = this.trackService.getUserPlaylists();
  @Input() open = signal(false);

  constructor(
    private userService: UserService,
    private trackService: TrackService
  ) {
    this.userService.retriveUserData();
  }
}

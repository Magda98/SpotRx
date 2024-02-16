import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { toSignal } from '@angular/core/rxjs-interop';
import { TrackService } from './../services/track.service';
import { UserService } from './../services/user.service';
import { Component, Input, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [IconComponent, RouterModule, MatIconModule, CommonModule],
})
export class NavComponent {
  userData = toSignal(this.userService.getUserData());
  userPlaylists = injectQuery(() => this.trackService.getUserPlaylists());
  @Input() open = signal(false);

  constructor(
    private userService: UserService,
    private trackService: TrackService
  ) {
    this.userService.retriveUserData();
  }
}

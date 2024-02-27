import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TrackService } from './../services/track.service';
import { UserService } from './../services/user.service';
import {
  Component,
  inject,
  input,
  EventEmitter,
  Output,
  effect,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [IconComponent, RouterModule, MatIconModule, CommonModule],
})
export class NavComponent {
  userService = inject(UserService);
  trackService = inject(TrackService);
  userData = input.required<User>();
  userPlaylists = injectQuery(() => this.trackService.getUserPlaylists());
  open = input(false);
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeMenu() {
    this.toggleMenu.emit(false);
  }
}

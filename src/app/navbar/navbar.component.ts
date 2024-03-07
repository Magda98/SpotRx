import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TrackService } from '../shared/services/track.service';
import { UserService } from '../shared/services/user.service';
import { Component, inject, input, EventEmitter, Output } from '@angular/core';
import { IconComponent } from '../shared/icon/icon.component';
import { CommonModule } from '@angular/common';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IconComponent, RouterModule, MatIconModule, CommonModule],
})
export class NavbarComponent {
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

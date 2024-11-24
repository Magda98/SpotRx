import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Component, inject, input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@app/shared/components/icon/icon.component';
import { UserService } from '@app/shared/services/user.service';
import { TrackService } from '@app/shared/services/track.service';
import { User } from '@app/shared/interfaces/user';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
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

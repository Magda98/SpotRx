import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Component, OnInit, signal, inject } from '@angular/core';
import { PlayerService } from './services/player.service';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { IconComponent } from './icon/icon.component';
import { PlayerComponent } from './player/player.component';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { CommonModule } from '@angular/common';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    NavComponent,
    IconComponent,
    PlayerComponent,
    AngularQueryDevtools,
    CommonModule,
  ],
  providers: [PlayerService],
})
export class AppComponent implements OnInit {
  /**
   * TODO:
   * - add unit test
   * * feature: rewrite paginated list to infinine scroll
   */
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private playerService = inject(PlayerService);
  loggedIn = toSignal(this.authService.loggedIn);
  menuOpen = signal(false);
  userData = injectQuery(() => this.userService.getUserData());

  private auth = this.authService.authData.pipe(
    tap((authData) => {
      if (!authData) return;
      this.initSpotifyScript(authData.access_token);
    }),
    takeUntilDestroyed()
  );
  playerState = this.playerService.getPlayerState();
  isProductionMode = environment.production;

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
      this.authService
        .getToken()
        .subscribe(() => setTimeout(() => window.location.reload(), 0));
    }
    this.auth.subscribe();
  }

  login() {
    this.authService.login();
  }
}

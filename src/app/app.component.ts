import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import {
  Component,
  OnInit,
  signal,
  inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { PlayerService } from './shared/services/player.service';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { IconComponent } from './shared/components/icon/icon.component';
import { PlayerComponent } from './shared/components/player/player.component';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { CommonModule, DOCUMENT } from '@angular/common';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { ButtonDirective } from './shared/directives/button/button.directive';
import { appFade } from './shared/animations/fade.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    IconComponent,
    PlayerComponent,
    AngularQueryDevtools,
    CommonModule,
    ButtonDirective,
  ],
  providers: [PlayerService],
  animations: [appFade],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private document = inject(DOCUMENT);
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
    takeUntilDestroyed(),
  );
  playerState = this.playerService.getPlayerState();
  isProductionMode = environment.production;

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  private initSpotifyScript(token: string) {
    this.playerService.initializePlayer(token);
    const script = this.document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.type = 'text/javascript';
    this.document.head.appendChild(script);
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


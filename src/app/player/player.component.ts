import { Observable, tap } from 'rxjs';
import { PlayerService } from './../services/player.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  playerState: Observable<Spotify.PlaybackState>;
  // paused = false;

  constructor(private playerService: PlayerService, private cdr: ChangeDetectorRef) { 
    this.playerState = this.playerService.getPlayerState().pipe(tap(() => {
        cdr.detectChanges();
      }
    ));
  }

  ngOnInit(): void {
  }

  togglePlay() {
    this.playerService.tooglePlay();
  }

}

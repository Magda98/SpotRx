import { Observable, tap } from 'rxjs';
import { PlayerService } from './../services/player.service';
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  playerState: Observable<Spotify.PlaybackState>;

  constructor(public playerService: PlayerService) { 
    this.playerState = this.playerService.getPlayerState();
  }

  ngOnInit(): void {
  }

  togglePlay() {
    this.playerService.tooglePlay();
  }

  skipNext() {
    this.playerService.skipNext();
  }

  skipPrev() {
    this.playerService.skipPrev();
  }

  setVolume(volumeSlider: MatSliderChange) {
    if (volumeSlider.value) {
      this.playerService.setVolume(volumeSlider.value)
    }
  }

  setPosition(positionSlider: MatSliderChange) { 
    if (positionSlider.value) {
      this.playerService.setPosition(positionSlider.value)
    }
  }

}

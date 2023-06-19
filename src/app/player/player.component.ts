import { PlayerService } from './../services/player.service';
import { Component } from '@angular/core';
import { MatSliderDragEvent } from '@angular/material/slider';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  playerState = this.playerService.getPlayerState();

  constructor(public playerService: PlayerService) {}

  setVolume(volumeSlider: MatSliderDragEvent) {
    this.playerService.setVolume(volumeSlider.value);
  }

  setPosition(positionSlider: MatSliderDragEvent) {
    this.playerService.setPosition(positionSlider.value);
  }
}

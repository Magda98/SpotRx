import { PlayerService } from './../services/player.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSliderDragEvent } from '@angular/material/slider';
import {
  EMPTY,
  Subscription,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  playerState = this.playerService.getPlayerState();
  player?: Spotify.PlaybackState;
  isSavedTrack?: boolean;
  subscription = new Subscription();
  toggleTrackSubscription?: Subscription;

  constructor(
    public playerService: PlayerService,
    private trackService: TrackService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.playerState
        .pipe(
          tap((player) => {
            this.player = player;
          }),
          map((player) => player.track_window.current_track.id),
          distinctUntilChanged(),
          switchMap((id) => {
            if (id) return this.trackService.checkUserSavedTrack(id);
            return EMPTY;
          })
        )
        .subscribe((data) => {
          const [isSavedTrack] = data;
          this.isSavedTrack = isSavedTrack;
        })
    );
  }

  toggleSavedTrack() {
    // TODO: delete track from saved
    if (!this.player?.track_window?.current_track?.id) return;
    if (this.isSavedTrack) return;
    this.toggleTrackSubscription?.unsubscribe();
    this.toggleTrackSubscription = this.trackService
      .saveTrack(this.player.track_window.current_track.id)
      .subscribe(() => {
        this.isSavedTrack = true;
      });
  }

  setVolume(volumeSlider: MatSliderDragEvent) {
    this.playerService.setVolume(volumeSlider.value);
  }

  setPosition(positionSlider: MatSliderDragEvent) {
    this.playerService.setPosition(positionSlider.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

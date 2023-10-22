import { PlayerService } from './../services/player.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSliderDragEvent } from '@angular/material/slider';
import {
  EMPTY,
  Subscription,
  distinctUntilChanged,
  finalize,
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
  public playerState = this.playerService.getPlayerState();
  public player?: Spotify.PlaybackState;
  public isSavedTrack?: boolean;
  private subscription = new Subscription();
  private toggleTrackSubscription?: Subscription;
  private isFetching = false;

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
    if (!this.player?.track_window?.current_track?.id) return;

    if (this.isSavedTrack) {
      this.toggleTrackSubscription?.unsubscribe();
      return (this.toggleTrackSubscription = this.trackService
        .deleteTrack(this.player.track_window.current_track.id)
        .subscribe(() => {
          this.isSavedTrack = false;
        }));
    }

    this.toggleTrackSubscription?.unsubscribe();
    return (this.toggleTrackSubscription = this.trackService
      .saveTrack(this.player.track_window.current_track.id)
      .subscribe(() => {
        this.isSavedTrack = true;
      }));
  }

  setVolume(volumeSlider: MatSliderDragEvent) {
    this.playerService.setVolume(volumeSlider.value);
  }

  setPosition(positionSlider: MatSliderDragEvent) {
    this.playerService.setPosition(positionSlider.value);
  }

  toggleShuffle() {
    if (!this.player) return;
    if (this.isFetching) return;

    this.isFetching = true;
    this.player.shuffle = !this.player.shuffle;
    this.subscription.add(
      this.trackService
        .toggleShuffle(this.player.shuffle)
        .pipe(
          finalize(() => {
            this.isFetching = false;
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.toggleTrackSubscription?.unsubscribe();
  }
}

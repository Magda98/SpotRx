import { PlayerService } from './../services/player.service';
import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { MatSliderDragEvent, MatSliderModule } from '@angular/material/slider';
import {
  EMPTY,
  Subscription,
  distinctUntilChanged,
  firstValueFrom,
  map,
  tap,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrackService } from '../services/track.service';
import { MatIcon } from '@angular/material/icon';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: true,
  imports: [
    MatSliderModule,
    MatIcon,
    IconComponent,
    CommonModule,
    HttpClientModule,
  ],
})
export class PlayerComponent implements OnInit, OnDestroy {
  public playerState$ = this.playerService.getPlayerState();
  public player?: Spotify.PlaybackState;
  private subscription = new Subscription();
  private trackId = signal<string | null>(null)
  private isSavedTrackQuery = injectQuery(() => {
    const trackId = this.trackId()
    return this.trackService.checkUserSavedTracks(trackId ? [trackId] : [])
  })
  public isSavedTrack = computed(()=> this.isSavedTrackQuery.data()?.[0])
  private addToFav = injectMutation((client)=> ({
    mutationFn: (trackId: string) => firstValueFrom(this.trackService.saveTrack(trackId)),
    onSuccess: ()=> {
      this.snackBarService.open('Added to Liked Songs.');
      client.invalidateQueries({ queryKey: ['isSavedTrack'] })}
  }))
  private deleteFromFav = injectMutation((client)=> ({
    mutationFn: (trackId: string) => firstValueFrom(this.trackService.deleteTrack(trackId)),
    onSuccess: ()=> {
      this.snackBarService.open('Removed form Liked Songs.');
      client.invalidateQueries({ queryKey: ['isSavedTrack'] })}
  }))

  constructor(
    public playerService: PlayerService,
    private trackService: TrackService,
    private snackBarService: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.palyerStateChange$().subscribe()
    );
  }

  private palyerStateChange$(){
    return this.playerState$.pipe(
      tap((player) => {
        this.player = player;
      }),
      map((player) => player.track_window.current_track.id),
      distinctUntilChanged(),
      tap((id) => {
        if (id) this.trackId.set(id);
      })
    )
  }

  toggleSavedTrack() {
    const trackId = this.trackId()
    if (!trackId) return;
    if (this.isSavedTrack()) return this.deleteFromFav.mutate(trackId)
    return this.addToFav.mutate(trackId)
  }

  setVolume(volumeSlider: MatSliderDragEvent) {
    this.playerService.setVolume(volumeSlider.value);
  }

  setPosition(positionSlider: MatSliderDragEvent) {
    this.playerService.setPosition(positionSlider.value);
  }

  toggleShuffle() {
    if (!this.player) return;

    this.player.shuffle = !this.player.shuffle;
    this.subscription.add(
      this.trackService
        .toggleShuffle(this.player.shuffle).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

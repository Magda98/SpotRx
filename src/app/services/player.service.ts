import { AuthService } from './auth.service';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player?: Spotify.Player;
  playerState = new Subject<Spotify.PlaybackState>();
  deviceId = "";

  constructor(private authService: AuthService, private http: HttpClient, private ngZone: NgZone) { 
    this.initializePlayer();

  }

  initializePlayer() {

      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = '[My access token]';
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: (cb: Function) => { cb(this.authService.token.getValue()); },
          volume: 0.1
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => {
          console.error(message);
        });
        player.addListener('authentication_error', ({ message }) => {
          console.error(message);
        });
        player.addListener('account_error', ({ message }) => {
          
        });
        player.addListener('playback_error', ({ message }) => {
          console.error(message);
        });

        // Playback status updates
        player.addListener('player_state_changed', (playerState) => {
          // console.log(playerState);
          // this.playerState.next(playerState);
        });

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log("ready")
          this.deviceId = device_id
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();

        this.player = player;
        fromEvent<Spotify.PlaybackState>(player, 'player_state_changed').subscribe(newState => {
          this.playerState.next(newState);
        });
      }
 
  }

  getPlayerState() {
    return this.playerState.asObservable();
  }

  playSong(uri: string) {
    console.log(this.deviceId)
    this.http.put(`me/player/play?device_id=${this.deviceId}`, {
      uris: [uri],
      offset: {
        position: 0
      },
    }).subscribe((val) => console.log(val))
  }

  tooglePlay() {
      this.player?.togglePlay().then(() => {
      });
  }
}

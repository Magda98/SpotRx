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

  constructor(private authService: AuthService, private http: HttpClient, private _zone: NgZone) { 
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
        fromEvent<Spotify.PlaybackState>(player, 'player_state_changed').subscribe(newState => {
          this._zone.run(() => {
            this.playerState.next(newState);
           });
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

       
      }
 
  }

  getPlayerState() {
    return this.playerState.asObservable();
  }

  playSong(uris: string[], index: number) {
    console.log(this.deviceId)
    this.http.put(`me/player/play?device_id=${this.deviceId}`, {
      uris: uris,
      offset: {
        position: index
      },
    }).subscribe((val) => console.log(val))
  }

  tooglePlay() {
      this.player?.togglePlay().then(() => {
      });
  }

  skipNext() {
    this.player?.nextTrack().then(() => {});
  }

  skipPrev() {
    this.player?.previousTrack().then(() => {});
  }
}

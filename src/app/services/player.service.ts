import { AuthService } from './auth.service';
import { Injectable, NgZone, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent, interval, distinctUntilKeyChanged, Subject, Subscription, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player?: Spotify.Player;
  playerState = new Subject<Spotify.PlaybackState>();
  playbackState = new Subject<number>();
  updateDestroy$!: Subscription;
  deviceId = "";


  constructor(private authService: AuthService, private http: HttpClient, private _zone: NgZone) {
    this.initializePlayer();
  }

  initializePlayer() {

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb: Function) => { cb(this.authService.token.getValue()); },
        volume: 0.5
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
      const playerChangedEvent = fromEvent<Spotify.PlaybackState>(player, 'player_state_changed');
      playerChangedEvent.subscribe(newState => {
        this._zone.run(() => {
          this.playerState.next(newState);
        });
      });
      playerChangedEvent.pipe(distinctUntilKeyChanged('paused')).subscribe((newState) => {
        this._zone.run(() => {
          if (!newState.paused) {
            this.updateSlider();
          }
          else {
            this.destroyUpdateSubscriptions()
          }
        });
      })


      // Ready
      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log("ready")
        this.deviceId = device_id
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
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

  updateSlider() {
    this.updateDestroy$ = interval(1000).subscribe(() => {
      this.player?.getCurrentState().then((state) => {
        const position = state?.position ?? 0
        this.playbackState.next(position)
      });
    })
  }

  destroyUpdateSubscriptions() {
    this.updateDestroy$.unsubscribe();
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
    this.destroyUpdateSubscriptions();
    this.playbackState.next(1);
    this.player?.nextTrack().then(() => {
      this.updateSlider();
    });
  }

  skipPrev() {
    this.destroyUpdateSubscriptions();
    this.playbackState.next(1);
    this.player?.previousTrack().then(() => {
      this.updateSlider();
    });
  }

  setVolume(volume: number) {
    this.player?.setVolume(volume).then(() => {
    });
  }

  setPosition(position: number) {
    this.player?.seek(position).then(() => {
    })
  }
}

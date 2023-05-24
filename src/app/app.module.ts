import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TrackListComponent } from './track-list/track-list.component';
import { PlayerComponent } from './player/player.component';
import { SavedComponent } from './saved/saved.component';
import { PlaylistTracksComponent } from './playlist-tracks/playlist-tracks.component';
import { DurationPipe } from './track-list/duration.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    TrackListComponent,
    PlayerComponent,
    SavedComponent,
    PlaylistTracksComponent,
    DurationPipe,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgOptimizedImage,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (authService: AuthService) => {
        return new AuthInterceptor(authService);
      },
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

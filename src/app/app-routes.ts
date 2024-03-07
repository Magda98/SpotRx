import { SearchTracksComponent } from './search-tracks/search-tracks.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SavedTracksComponent } from './saved-tracks/saved-tracks.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { TopTracksComponent } from './top-tracks/top-tracks.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'saved', component: SavedTracksComponent },
  { path: 'search', component: SearchTracksComponent },
  { path: 'top-tracks', component: TopTracksComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
];

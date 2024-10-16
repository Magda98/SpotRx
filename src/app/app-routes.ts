import { Routes } from '@angular/router';
import { TopTracksComponent } from './features/top-tracks/top-tracks.component';
import { HomeComponent } from './features/home/home.component';
import { SavedTracksComponent } from './features/saved-tracks/saved-tracks.component';
import { SearchTracksComponent } from './features/search-tracks/search-tracks.component';
import { PlaylistComponent } from './features/playlist/playlist.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'saved', component: SavedTracksComponent },
  { path: 'search', component: SearchTracksComponent },
  { path: 'top-tracks', component: TopTracksComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
];

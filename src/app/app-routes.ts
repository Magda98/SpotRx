import { SearchComponent } from './search/search.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SavedComponent } from './saved/saved.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'saved', component: SavedComponent },
  { path: 'search', component: SearchComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
];

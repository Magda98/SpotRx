import { SearchComponent } from './search/search.component';
import { PlaylistTracksComponent } from './playlist-tracks/playlist-tracks.component';
import { SavedComponent } from './saved/saved.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'saved', component: SavedComponent },
  { path: 'search', component: SearchComponent },
  { path: 'playlist/:id', component: PlaylistTracksComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

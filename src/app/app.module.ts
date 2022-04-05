import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TrackListComponent } from './track-list/track-list.component';
import { PlayerComponent } from './player/player.component';
import { SavedComponent } from './saved/saved.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    TrackListComponent,
    PlayerComponent,
    SavedComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule,
    MatIconModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useFactory: (authService: AuthService) => {
            return new AuthInterceptor(authService);
        },
        multi: true,
        deps: [AuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

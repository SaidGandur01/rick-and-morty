import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterDetailsComponent } from './components/character/character-details/character-details.component';
import { CharacterPageComponent } from './components/character/character-page/character-page.component';
import { EpisodeDetailsComponent } from './components/episode/episode-details/episode-details.component';
import { EpisodePageComponent } from './components/episode/episode-page/episode-page.component';
import { HomeComponent } from './components/home/home.component';
import { LocationDetailsComponent } from './components/location/location-details/location-details.component';
import { LocationPageComponent } from './components/location/location-page/location-page.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharacterPageComponent,
    CharacterDetailsComponent,
    EpisodePageComponent,
    EpisodeDetailsComponent,
    LocationPageComponent,
    LocationDetailsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

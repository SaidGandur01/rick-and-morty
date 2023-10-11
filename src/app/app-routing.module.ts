import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailsComponent } from './components/character/character-details/character-details.component';
import { CharacterPageComponent } from './components/character/character-page/character-page.component';
import { EpisodeDetailsComponent } from './components/episode/episode-details/episode-details.component';
import { EpisodePageComponent } from './components/episode/episode-page/episode-page.component';
import { HomeComponent } from './components/home/home.component';
import { LocationDetailsComponent } from './components/location/location-details/location-details.component';
import { LocationPageComponent } from './components/location/location-page/location-page.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: 'character', component: CharacterPageComponent },
  { path: 'character/:id', component: CharacterDetailsComponent },
  { path: 'episode', component: EpisodePageComponent },
  { path: 'episode/:id', component: EpisodeDetailsComponent },
  { path: 'location', component: LocationPageComponent },
  { path: 'location/:id', component: LocationDetailsComponent },
  { path: '', redirectTo: "home", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

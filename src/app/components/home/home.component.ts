import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { ICharacter } from 'src/app/utils/interfaces/characters.interface';
import { IEpisode } from 'src/app/utils/interfaces/episode.interface';
import { ILocation } from 'src/app/utils/interfaces/location.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  characters!: ICharacter[];
  locations!: ILocation[];
  episodes!: IEpisode[];
  subscription!: Subscription;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeData()
  }

  private initializeData(): void {
    const charactersObservable = this.rickAndMortyService.getCharacters([1,2,3]);
    const locationObservable = this.rickAndMortyService.getLocations([1,2,3]);
    const episodeObservable = this.rickAndMortyService.getEpiosodes([1,2,3]);

    this.subscription = forkJoin(
      charactersObservable,
      locationObservable,
      episodeObservable
    ).subscribe((res: any) => {
      console.log({res})
      this.characters = res[0];
      this.locations = res[1];
      this.episodes = res[2];
    })
  }

  navigateTo(relativePath: string): void {
    this.router.navigate([relativePath]);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

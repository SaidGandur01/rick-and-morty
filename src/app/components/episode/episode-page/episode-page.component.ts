import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { IEpisodeResponse } from 'src/app/utils/interfaces/episode.interface';

@Component({
  selector: 'app-episode-page',
  templateUrl: './episode-page.component.html',
  styleUrls: ['./episode-page.component.scss']
})
export class EpisodePageComponent implements OnInit, OnDestroy {
  subscription!: Subscription
  episodes!: IEpisodeResponse;
  constructor(
    private rickAndMortyService: RickAndMortyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    this.subscription = this.rickAndMortyService
      .getEpiosodes()
      .subscribe((res: IEpisodeResponse) => {
      this.episodes = res;
      console.log({
        episodes: this.episodes
      });
    })
  }

  goToEpisodeDetails(episodeId: number): void {
    this.router.navigate([`/episode`, episodeId])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

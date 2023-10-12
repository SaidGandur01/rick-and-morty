import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
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
  inputChange$ = new Subject<string>();
  inputValue = ''

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeData();
    this.initializeInputObserver();
  }

  private initializeInputObserver(): void {
    this.inputChange$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((inputValue) => {
          return this.rickAndMortyService.getEpisodesByFilter(inputValue).pipe(
            catchError(error => {
              this.initializeData();
              this.inputValue = ''
              return of([]);
            })
          );
        })
      )
      .subscribe((res: any) => {
        if (res.results) {
          this.episodes = res;
        }
      });
  }

  onChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.inputChange$.next(inputValue);
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

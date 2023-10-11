import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { IEpisode } from 'src/app/utils/interfaces/episode.interface';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss']
})
export class EpisodeDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  episode!: IEpisode;
  constructor(
    private rickAndMortyService: RickAndMortyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getEpisodeId();
  }

  private getEpisodeId(): void {
    this.subscription.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          this.getEpisodeInfo(+id);
        }
      })
    );
  }

  getEpisodeInfo(episodeId: number): void {
    this.subscription.push(
      this.rickAndMortyService
        .getEpiosodes([episodeId])
        .subscribe(episode => {
          this.episode = episode as unknown as IEpisode;
          console.log({
            episode: this.episode
          });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.map((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}

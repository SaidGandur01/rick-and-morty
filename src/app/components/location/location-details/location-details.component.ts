import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { ILocation } from 'src/app/utils/interfaces/location.interface';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  location!: ILocation;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLocationId();
  }

  private getLocationId(): void {
    this.subscription.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          this.getLocationInfo(+id);
        }
      })
    );
  }

  getLocationInfo(locationId: number): void {
    this.subscription.push(
      this.rickAndMortyService
        .getLocations([locationId])
        .subscribe(location => {
          this.location = location as unknown as ILocation;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.map((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}

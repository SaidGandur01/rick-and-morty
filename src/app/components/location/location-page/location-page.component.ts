import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { ILocationResponse } from 'src/app/utils/interfaces/location.interface';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit, OnDestroy {
  subscription!: Subscription
  locations!: ILocationResponse;
  constructor(
    private rickAndMortyService: RickAndMortyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    this.subscription = this.rickAndMortyService
      .getLocations()
      .subscribe((res: ILocationResponse) => {
      this.locations = res;
      console.log({
        locations: this.locations
      });
    })
  }

  goToLocationDetails(locationId: number): void {
    this.router.navigate([`/location`, locationId])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
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
  inputChange$ = new Subject<string>();
  @ViewChild('barChart', { static: false, read: ElementRef })
  inputElement: ElementRef | undefined;
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
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((inputValue) => {
          return this.rickAndMortyService.getLocationsByFilter(inputValue);
        })
      )
      .subscribe((res: ILocationResponse) => {
        this.locations = res;
      });
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

  onChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.inputChange$.next(inputValue);
  }

  goToLocationDetails(locationId: number): void {
    this.router.navigate([`/location`, locationId])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { ICharactersResponse } from 'src/app/utils/interfaces/characters.interface';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss']
})
export class CharacterPageComponent implements OnInit, OnDestroy {
  subscription!: Subscription
  characters!: ICharactersResponse;
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
          return this.rickAndMortyService.getCharactersByFilter(inputValue);
        })
      )
      .subscribe((res: ICharactersResponse) => {
        this.characters = res;
      });
  }

  private initializeData(): void {
    this.subscription = this.rickAndMortyService
      .getCharacters()
      .subscribe((res: ICharactersResponse) => {
      this.characters = res;
      console.log({
        characters: this.characters
      });
    })
  }

  onChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.inputChange$.next(inputValue);
  }

  goToCharacterDetails(characterId: number): void {
    this.router.navigate([`/character`, characterId])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

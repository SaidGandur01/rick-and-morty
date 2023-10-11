import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private router: Router  
  ) { }

  ngOnInit(): void {
    this.initializeData();
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

  goToCharacterDetails(characterId: number): void {
    this.router.navigate([`/character`, characterId])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

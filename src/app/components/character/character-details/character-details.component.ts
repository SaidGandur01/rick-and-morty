import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { ICharacter } from 'src/app/utils/interfaces/characters.interface';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  character!: ICharacter;
  constructor(
    private rickAndMortyService: RickAndMortyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCharacterId();
  }

  private getCharacterId(): void {
    this.subscription.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          this.getCharacterInfo(+id);
        }
      })
    );
  }

  getCharacterInfo(characterId: number): void {
    this.subscription.push(
      this.rickAndMortyService
        .getCharacters([characterId])
        .subscribe(character => {
          console.log(character)
          this.character = character as unknown as ICharacter;
          // console.log({
          //   character: this.character
          // });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.map((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}

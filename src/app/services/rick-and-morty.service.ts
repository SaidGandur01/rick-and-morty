import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharactersResponse } from '../utils/interfaces/characters.interface';
import { IEpisodeResponse } from '../utils/interfaces/episode.interface';
import { ILocationResponse } from '../utils/interfaces/location.interface';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  baseUrl = 'https://rickandmortyapi.com/api'

  constructor(private httpClient: HttpClient) { }

  getCharacters(): Observable<ICharactersResponse> {
    const path = `${this.baseUrl}/character`;
    return this.httpClient.get<ICharactersResponse>(path)
  }

  getLocations(): Observable<ILocationResponse> {
    const path = `${this.baseUrl}/location`;
    return this.httpClient.get<ILocationResponse>(path);
  }

  getEpiosodes(): Observable<IEpisodeResponse> {
    const path = `${this.baseUrl}/episode`;
    return this.httpClient.get<IEpisodeResponse>(path);
  }
}

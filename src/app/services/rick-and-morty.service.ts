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

  getCharacters(queryIds?: number[]): Observable<ICharactersResponse> {
    const query = (queryIds && queryIds.length) ? queryIds.join(',') : '';
    const path = `${this.baseUrl}/character/${query}`;
    return this.httpClient.get<ICharactersResponse>(path)
  }

  getLocations(queryIds?: number[]): Observable<ILocationResponse> {
    const query = (queryIds && queryIds.length) ? queryIds.join(',') : '';
    const path = `${this.baseUrl}/location/${query}`;
    return this.httpClient.get<ILocationResponse>(path);
  }

  getEpiosodes(queryIds?: number[]): Observable<IEpisodeResponse> {
    const query = (queryIds && queryIds.length) ? queryIds.join(',') : '';
    const path = `${this.baseUrl}/episode/${query}`;
    return this.httpClient.get<IEpisodeResponse>(path);
  }

  getCharactersByFilter(name?: string): Observable<ICharactersResponse> {
    const path = `${this.baseUrl}/character/?name=${name}`;
    return this.httpClient.get<ICharactersResponse>(path)
  }

  getLocationsByFilter(name?: string): Observable<ILocationResponse> {
    const path = `${this.baseUrl}/location/?name=${name}`;
    return this.httpClient.get<ILocationResponse>(path)
  }

  getEpisodesByFilter(name?: string): Observable<IEpisodeResponse> {
    const path = `${this.baseUrl}/episode/?name=${name}`;
    return this.httpClient.get<IEpisodeResponse>(path)
  }
}

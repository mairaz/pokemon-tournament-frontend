import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Pokemon, SortDirection, SortOptions } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  fetchPokemon = new BehaviorSubject<[SortOptions, SortDirection]>(['Id', 'Desc']);

  pokemons$: Observable<Pokemon[]> = this.fetchPokemon.
    pipe(switchMap(([sortBy, sortDirection]) =>
      this.http.get<Pokemon[]>(`${this.apiUrl}/statistics`, { params: { sortBy, sortDirection } })));
 
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  fetchPokemon = new BehaviorSubject<any[]>(['id', 'desc']);

  pokemons$: Observable<Pokemon[]> = this.fetchPokemon.
    pipe(switchMap(([sortOption, sortDirection]) =>
      this.http.get<Pokemon[]>(`${this.apiUrl}/statistics`, { params: { sortOption, sortDirection } })));
 
}

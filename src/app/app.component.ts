import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './services/pokemon.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SortDirection, SortOptions } from './types';
import { SelectHeaderComponent } from './components/select-header/select-header.component';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, FormsModule, SelectHeaderComponent, PokemonsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'pokemon-tour';
  pokemonService = inject(PokemonService);


  sortBy!: SortOptions;
  sortDirection!: SortDirection


  pokemon$ = this.pokemonService.pokemons$



  fetchPokemon(event: { sortBy: string, sortDirection: string }) {
    const { sortBy, sortDirection } = event;

    this.pokemonService.fetchPokemon.next([sortBy, sortDirection]);

  }





}

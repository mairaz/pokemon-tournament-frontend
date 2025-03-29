import { Component, Input } from '@angular/core';
import { Pokemon } from '../../types';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemons-list',
  standalone: true,
  imports: [AsyncPipe, PokemonItemComponent, FormsModule],
  templateUrl: './pokemons-list.component.html',
  styleUrl: './pokemons-list.component.css'
})
export class PokemonsListComponent {
  @Input('pokemons') set pokemons(pokemons: Pokemon[]) {
    this.pokemons$.next(pokemons);
    this.totalPokemons = pokemons.length;
    this.currentPage$.next(1);
  }
  pokemons$ = new BehaviorSubject<Pokemon[]>([]);
  pageSize$ = new BehaviorSubject<number>(4);
  totalPokemons!: number;
  currentPage$ = new BehaviorSubject<number>(1);
  

  get pages() {
    return Array.from({ length: this.pagesCount }, (_, i) => i + 1);
  }
  
  get pagesCount() {
    return Math.ceil(this.totalPokemons / this.pageSize$.value);
  }

  pokemonsPage$ = combineLatest([this.pageSize$, this.currentPage$, this.pokemons$]).pipe(
    map(([size, currentPage, pokemons]) => {
      const start = (currentPage - 1) * size;
      const end = start + size;
      return pokemons.slice(start, end);
    })
  );

  changeSize(event: Event): void {
    this.currentPage$.next(1);
    const size = event.target as HTMLInputElement;
    this.pageSize$.next(Number(size.value));
  }

  changePage(page: number): void {
    this.currentPage$.next(Number(page));
  }

  nextPage(): void {
    if (this.currentPage$.value < this.pagesCount) {
      this.currentPage$.next(this.currentPage$.value + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

}

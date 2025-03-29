import { Component, Input } from '@angular/core';
import { Pokemon } from '../../types';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pokemons-list',
  standalone: true,
  imports: [AsyncPipe, ],
  templateUrl: './pokemons-list.component.html',
  styleUrl: './pokemons-list.component.css'
})
export class PokemonsListComponent {
  @Input('pokemons') set pokemons(pokemons: Pokemon[]){ 
    this.pokemons$.next(pokemons);
    this.currentPage$.next(1);
    }
  pokemons$ = new BehaviorSubject<Pokemon[]>([]) ;  


  size$ = new BehaviorSubject<number>(4);
  totalPokemons = 16;

  currentPage$ = new BehaviorSubject<number>(1);

  get pages() {
    return Array.from({ length: this.pagesCount }, (_, i) => i + 1);
  }
  get pagesCount() {
    return Math.ceil(this.totalPokemons / this.size$.value);
  }  
  pokemonsPage$ = combineLatest([this.size$, this.currentPage$, this.pokemons$]).pipe(
    map(([size, currentPage, pokemons]) => {        
      const start = (currentPage - 1) * size;
      const end = start + size;
      return pokemons.slice(start, end);
    })
  );

  changeSize(event: Event) {
    const size = event.target as HTMLInputElement;
    this.size$.next(Number(size.value));
  }

  changePage(page: number) {
    this.currentPage$.next(Number(page));
  }

  nextPage() {
    if (this.currentPage$.value < this.pagesCount) {
      this.currentPage$.next(this.currentPage$.value + 1);
    }
  }

  previousPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

}

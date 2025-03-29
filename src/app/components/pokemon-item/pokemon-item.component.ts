import { Component, Input } from '@angular/core';
import { Pokemon } from '../../types';
import { NgStyle, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-item',
  standalone: true,
  imports: [TitleCasePipe, NgStyle],
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.css'
})
export class PokemonItemComponent {
  @Input('pokemon') pokemon!: Pokemon;
  get winRate(): number {
    if (!this.pokemon) return 0;
    const totalBattles = this.pokemon.losses + this.pokemon.ties + this.pokemon.wins;
    return totalBattles > 0 ? Math.ceil((this.pokemon.wins / totalBattles) * 100) : 0;
  }
}

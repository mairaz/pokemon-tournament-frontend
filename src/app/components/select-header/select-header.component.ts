import { Component, EventEmitter, Output } from '@angular/core';
import { SortDirection, SortOptions } from '../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-header.component.html',
  styleUrl: './select-header.component.css'
})
export class SelectHeaderComponent {

  @Output() onFetch = new EventEmitter<any>();

  sortBy: SortOptions = 'Id'
  sortDirection: SortDirection = 'Desc'
  sortOptions = SortOptions;
  sortDirections = SortDirection;

  sortPokemons(): void {   
    this.onFetch.emit({ sortBy: this.sortBy, sortDirection: this.sortDirection });
  }

}

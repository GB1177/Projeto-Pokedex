import { Component, inject } from '@angular/core';

import { AppHeaderComponent } from '../../../../shared/components/app-header/app-header.component';
import { PokemonGridComponent } from '../../components/pokemon-grid/pokemon-grid.component';
import { PokemonPaginationComponent } from '../../components/pokemon-pagination/pokemon-pagination.component';
import { PokemonSearchComponent } from '../../components/pokemon-search/pokemon-search.component';
import { PokedexStore } from '../../store/pokedex.store';

@Component({
  selector: 'app-pokedex-page',
  standalone: true,
  imports: [AppHeaderComponent, PokemonSearchComponent, PokemonGridComponent, PokemonPaginationComponent],
  templateUrl: './pokedex-page.component.html',
  styleUrl: './pokedex-page.component.scss'
})
export class PokedexPageComponent {
  protected readonly store = inject(PokedexStore);
}

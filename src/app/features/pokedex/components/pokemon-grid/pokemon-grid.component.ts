import { Component } from '@angular/core';

import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonCard } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-grid',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-grid.component.html',
  styleUrl: './pokemon-grid.component.scss'
})
export class PokemonGridComponent {
  private readonly bulbasaur: PokemonCard = {
    id: 1,
    name: 'Bulbasaur',
    number: '#001',
    type: 'Grass',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
  };

  protected readonly pokemons: PokemonCard[] = Array.from({ length: 18 }, (_, index) => ({
    ...this.bulbasaur,
    id: index + 1,
    number: `#${String(index + 1).padStart(3, '0')}`
  }));
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PokemonCardView } from '../../interfaces/pokemon.interface';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-grid',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-grid.component.html',
  styleUrl: './pokemon-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonGridComponent {
  @Input({ required: true }) pokemons: PokemonCardView[] = [];
}

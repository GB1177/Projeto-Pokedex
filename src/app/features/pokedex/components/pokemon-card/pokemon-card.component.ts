import { Component, Input } from '@angular/core';

export interface PokemonCard {
  id: number;
  name: string;
  number: string;
  type: string;
  imageUrl: string;
}

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input({ required: true }) pokemon!: PokemonCard;
}

import { Injectable, signal } from '@angular/core';

import { PokemonListItem } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokedexStore {
  readonly pokemons = signal<PokemonListItem[]>([]);
  readonly searchTerm = signal('');
  readonly currentPage = signal(1);
  readonly isLoading = signal(false);

  setPokemons(pokemons: PokemonListItem[]): void {
    this.pokemons.set(pokemons);
  }

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  setCurrentPage(page: number): void {
    this.currentPage.set(page);
  }

  setLoading(isLoading: boolean): void {
    this.isLoading.set(isLoading);
  }
}

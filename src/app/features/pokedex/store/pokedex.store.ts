import { Injectable, signal } from '@angular/core';

import { PokemonCardView } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokedexStore {
  readonly pokemons = signal<PokemonCardView[]>([]);
  readonly searchTerm = signal('');
  readonly currentPage = signal(1);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly hasNextPage = signal(false);

  setPokemons(pokemons: PokemonCardView[]): void {
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

  setError(error: string | null): void {
    this.error.set(error);
  }

  setHasNextPage(hasNextPage: boolean): void {
    this.hasNextPage.set(hasNextPage);
  }
}

import { Injectable, computed, signal } from '@angular/core';

import { PokemonCardView, PokemonListItem } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokedexStore {
  readonly pageSize = 12;
  readonly pokemons = signal<PokemonCardView[]>([]);
  readonly searchResults = signal<PokemonCardView[]>([]);
  readonly pokemonIndex = signal<PokemonListItem[]>([]);
  readonly searchTerm = signal('');
  readonly currentPage = signal(1);
  readonly totalCount = signal(0);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly isSearchActive = computed(() => this.searchTerm().trim().length > 0);
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalCount() / this.pageSize)));
  readonly hasNextPage = computed(() => this.currentPage() < this.totalPages());
  readonly visiblePokemons = computed(() => (this.isSearchActive() ? this.searchResults() : this.pokemons()));

  setPokemons(pokemons: PokemonCardView[]): void {
    this.pokemons.set(pokemons);
  }

  setSearchResults(pokemons: PokemonCardView[]): void {
    this.searchResults.set(pokemons);
  }

  setPokemonIndex(pokemons: PokemonListItem[]): void {
    this.pokemonIndex.set(pokemons);
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

  setTotalCount(totalCount: number): void {
    this.totalCount.set(totalCount);
  }
}

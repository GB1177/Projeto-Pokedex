import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, PLATFORM_ID, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { AppHeaderComponent } from '../../../../shared/components/app-header/app-header.component';
import { PokemonGridComponent } from '../../components/pokemon-grid/pokemon-grid.component';
import { PokemonPaginationComponent } from '../../components/pokemon-pagination/pokemon-pagination.component';
import { PokemonSearchComponent } from '../../components/pokemon-search/pokemon-search.component';
import { PokemonService } from '../../services/pokemon.service';
import { PokedexStore } from '../../store/pokedex.store';

@Component({
  selector: 'app-pokedex-page',
  standalone: true,
  imports: [AppHeaderComponent, PokemonSearchComponent, PokemonGridComponent, PokemonPaginationComponent],
  templateUrl: './pokedex-page.component.html',
  styleUrl: './pokedex-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokedexPageComponent implements OnInit {
  protected readonly store = inject(PokedexStore);
  protected readonly hasPreviousPage = computed(() => this.store.currentPage() > 1);

  private readonly pokemonService = inject(PokemonService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private searchRequestId = 0;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPokemonIndex();
      this.loadPokemons();
    }
  }

  protected onPageChange(page: number): void {
    if (page < 1 || page === this.store.currentPage() || this.store.isLoading()) {
      return;
    }

    this.store.setCurrentPage(page);
    this.loadPokemons();
  }

  protected onSearchChange(term: string): void {
    const normalizedTerm = term.trim();

    this.store.setSearchTerm(normalizedTerm);

    if (!normalizedTerm) {
      this.searchRequestId++;
      this.store.setSearchResults([]);
      this.store.setError(null);
      return;
    }

    this.loadSearchResults(normalizedTerm);
  }

  private loadPokemons(): void {
    const offset = (this.store.currentPage() - 1) * this.store.pageSize;

    this.store.setLoading(true);
    this.store.setError(null);

    this.pokemonService
      .getPokemonPage(this.store.pageSize, offset)
      .pipe(
        finalize(() => this.store.setLoading(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (page) => {
          this.store.setPokemons(page.pokemons);
          this.store.setTotalCount(page.totalCount);
        },
        error: () => {
          this.store.setPokemons([]);
          this.store.setTotalCount(0);
          this.store.setError('Nao foi possivel carregar os Pokemon. Tente novamente em instantes.');
        }
      });
  }

  private loadPokemonIndex(): void {
    this.pokemonService
      .getPokemonIndex()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (pokemons) => {
          this.store.setPokemonIndex(pokemons);

          if (this.store.isSearchActive()) {
            this.loadSearchResults(this.store.searchTerm());
          }
        },
        error: () => this.store.setPokemonIndex([])
      });
  }

  private loadSearchResults(term: string): void {
    const requestId = ++this.searchRequestId;
    const normalizedTerm = term.toLowerCase();
    const pokemonIndex = this.store.pokemonIndex();
    const exactMatch = pokemonIndex.find((pokemon) => pokemon.name.toLowerCase() === normalizedTerm);
    const names = exactMatch
      ? [exactMatch.name]
      : pokemonIndex
          .filter((pokemon) => pokemon.name.toLowerCase().includes(normalizedTerm))
          .slice(0, this.store.pageSize)
          .map((pokemon) => pokemon.name);

    this.store.setLoading(true);
    this.store.setError(null);

    this.pokemonService
      .getPokemonCardsByNames(names)
      .pipe(
        finalize(() => {
          if (requestId === this.searchRequestId) {
            this.store.setLoading(false);
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (pokemons) => {
          if (requestId === this.searchRequestId) {
            this.store.setSearchResults(pokemons);
          }
        },
        error: () => {
          if (requestId === this.searchRequestId) {
            this.store.setSearchResults([]);
            this.store.setError('Nao foi possivel carregar a busca. Tente novamente em instantes.');
          }
        }
      });
  }
}

import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, OnInit, PLATFORM_ID, computed, inject } from '@angular/core';
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
  styleUrl: './pokedex-page.component.scss'
})
export class PokedexPageComponent implements OnInit {
  protected readonly store = inject(PokedexStore);
  protected readonly limit = 12;
  protected readonly hasPreviousPage = computed(() => this.store.currentPage() > 1);

  private readonly pokemonService = inject(PokemonService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
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

  private loadPokemons(): void {
    const offset = (this.store.currentPage() - 1) * this.limit;

    this.store.setLoading(true);
    this.store.setError(null);

    this.pokemonService
      .getPokemonPage(this.limit, offset)
      .pipe(
        finalize(() => this.store.setLoading(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (page) => {
          this.store.setPokemons(page.pokemons);
          this.store.setHasNextPage(page.hasNextPage);
        },
        error: () => {
          this.store.setPokemons([]);
          this.store.setHasNextPage(false);
          this.store.setError('Nao foi possivel carregar os Pokemon. Tente novamente em instantes.');
        }
      });
  }
}

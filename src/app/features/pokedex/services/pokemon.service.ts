import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, of, shareReplay, switchMap } from 'rxjs';

import {
  PokemonCardView,
  PokemonDetail,
  PokemonListItem,
  PokemonListResponse,
  PokemonPage
} from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2/';
  private readonly pokemonIndex$ = this.getPokemons(100000, 0).pipe(
    map((response) => response.results),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getPokemons(limit: number, offset: number): Observable<PokemonListResponse> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    return this.http.get<PokemonListResponse>(`${this.baseUrl}pokemon`, { params });
  }

  getPokemonByName(name: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.baseUrl}pokemon/${name}`);
  }

  getPokemonIndex(): Observable<PokemonListItem[]> {
    return this.pokemonIndex$;
  }

  getPokemonCardsByNames(names: string[]): Observable<PokemonCardView[]> {
    if (names.length === 0) {
      return of([]);
    }

    return forkJoin(names.map((name) => this.getPokemonByName(name))).pipe(
      map((pokemons) => pokemons.map((pokemon) => this.mapToCardView(pokemon)))
    );
  }

  getPokemonPage(limit: number, offset: number): Observable<PokemonPage> {
    return this.getPokemons(limit, offset).pipe(
      switchMap((response) => {
        const detailRequests = response.results.map((pokemon) => this.getPokemonByName(pokemon.name));
        const details$ = detailRequests.length > 0 ? forkJoin(detailRequests) : of([]);

        return details$.pipe(
          map((pokemons) => ({
            pokemons: pokemons.map((pokemon) => this.mapToCardView(pokemon)),
            totalCount: response.count
          }))
        );
      })
    );
  }

  private mapToCardView(pokemon: PokemonDetail): PokemonCardView {
    const primaryType = pokemon.types.find((typeSlot) => typeSlot.slot === 1)?.type.name ?? pokemon.types[0]?.type.name;

    return {
      id: pokemon.id,
      name: this.formatName(pokemon.name),
      number: `#${String(pokemon.id).padStart(3, '0')}`,
      imageUrl: pokemon.sprites.front_default,
      type: this.formatName(primaryType ?? 'unknown')
    };
  }

  private formatName(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

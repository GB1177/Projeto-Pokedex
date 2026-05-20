import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

import { PokemonCardView, PokemonDetail, PokemonListResponse, PokemonPage } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2/';

  getPokemons(limit: number, offset: number): Observable<PokemonListResponse> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    return this.http.get<PokemonListResponse>(`${this.baseUrl}pokemon`, { params });
  }

  getPokemonByName(name: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.baseUrl}pokemon/${name}`);
  }

  getPokemonPage(limit: number, offset: number): Observable<PokemonPage> {
    return this.getPokemons(limit, offset).pipe(
      switchMap((response) => {
        const detailRequests = response.results.map((pokemon) => this.getPokemonByName(pokemon.name));
        const details$ = detailRequests.length > 0 ? forkJoin(detailRequests) : of([]);

        return details$.pipe(
          map((pokemons) => ({
            pokemons: pokemons.map((pokemon) => this.mapToCardView(pokemon)),
            hasNextPage: response.next !== null
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

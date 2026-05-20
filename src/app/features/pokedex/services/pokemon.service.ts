import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { PokemonDetail, PokemonListResponse } from '../interfaces/pokemon.interface';

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
}

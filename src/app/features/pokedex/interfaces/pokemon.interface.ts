export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonTypeSlot {
  slot: number;
  type: PokemonListItem;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeSlot[];
  sprites: {
    front_default: string | null;
    other?: {
      ['official-artwork']?: {
        front_default: string | null;
      };
    };
  };
}

export interface PokemonCardView {
  id: number;
  name: string;
  number: string;
  imageUrl: string | null;
  type: string;
}

export interface PokemonPage {
  pokemons: PokemonCardView[];
  totalCount: number;
}

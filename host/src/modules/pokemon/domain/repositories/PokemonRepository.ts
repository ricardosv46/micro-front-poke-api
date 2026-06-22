import type { Pokemon } from "../entities/Pokemon";

export interface PokemonPage {
  pokemons: Pokemon[];
  nextOffset: number | null;
}

export interface PokemonRepository {
  getPokemons(limit: number, offset: number): Promise<PokemonPage>;
  getPokemonsByType(type: string, limit: number): Promise<Pokemon[]>;
  getPokemonByName(name: string): Promise<Pokemon | null>;
}

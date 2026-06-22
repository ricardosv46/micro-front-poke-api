import { httpClient, HttpError } from "../../../../core/http/httpClient";
import type { PokemonRepository, PokemonPage } from "../../domain/repositories/PokemonRepository";
import type { Pokemon } from "../../domain/entities/Pokemon";
import { toPokemon } from "../mappers/pokemonMapper";

const POKEAPI_BASE_URL = import.meta.env.VITE_POKEAPI_BASE_URL ?? "https://pokeapi.co/api/v2";

interface PokemonListResponse {
  count: number;
  results: { name: string; url: string }[];
}

interface PokemonTypeResponse {
  pokemon: { pokemon: { name: string; url: string } }[];
}

interface PokemonDetailResponse {
  id: number;
  name: string;
}

export class PokemonRepositoryImpl implements PokemonRepository {
  async getPokemons(limit: number, offset: number): Promise<PokemonPage> {
    const response = await httpClient.get<PokemonListResponse>(
      `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );

    const pokemons = response.results.map((result) => toPokemon(result.name, result.url));
    const nextOffset = offset + limit < response.count ? offset + limit : null;

    return { pokemons, nextOffset };
  }

  async getPokemonsByType(type: string, limit: number): Promise<Pokemon[]> {
    const response = await httpClient.get<PokemonTypeResponse>(`${POKEAPI_BASE_URL}/type/${type}`);

    return response.pokemon
      .slice(0, limit)
      .map(({ pokemon }) => toPokemon(pokemon.name, pokemon.url));
  }

  async getPokemonByName(name: string): Promise<Pokemon | null> {
    try {
      const response = await httpClient.get<PokemonDetailResponse>(
        `${POKEAPI_BASE_URL}/pokemon/${name}`
      );

      return toPokemon(response.name, `/pokemon/${response.id}/`);
    } catch (error) {
      if (error instanceof HttpError && error.status === 404) return null;
      throw error;
    }
  }
}

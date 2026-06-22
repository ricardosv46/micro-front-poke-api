import type { PokemonRepository } from "../domain/repositories/PokemonRepository";
import type { Pokemon } from "../domain/entities/Pokemon";

export class GetPokemonsByTypeUseCase {
  private pokemonRepository: PokemonRepository;

  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  execute(type: string, limit: number): Promise<Pokemon[]> {
    return this.pokemonRepository.getPokemonsByType(type, limit);
  }
}

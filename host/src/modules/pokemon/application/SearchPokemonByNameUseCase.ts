import type { PokemonRepository } from "../domain/repositories/PokemonRepository";
import type { Pokemon } from "../domain/entities/Pokemon";

export class SearchPokemonByNameUseCase {
  private pokemonRepository: PokemonRepository;

  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  execute(name: string): Promise<Pokemon | null> {
    const normalizedName = name.trim().toLowerCase();
    return this.pokemonRepository.getPokemonByName(normalizedName);
  }
}

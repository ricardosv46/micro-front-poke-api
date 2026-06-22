import type { PokemonDetailRepository } from "../domain/repositories/PokemonDetailRepository";
import type { PokemonDetail } from "../domain/entities/PokemonDetail";

export class GetPokemonDetailUseCase {
  private pokemonDetailRepository: PokemonDetailRepository;

  constructor(pokemonDetailRepository: PokemonDetailRepository) {
    this.pokemonDetailRepository = pokemonDetailRepository;
  }

  execute(id: string): Promise<PokemonDetail> {
    return this.pokemonDetailRepository.getPokemonDetail(id);
  }
}

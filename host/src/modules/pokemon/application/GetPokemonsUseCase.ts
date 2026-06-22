import type { PokemonRepository, PokemonPage } from "../domain/repositories/PokemonRepository";

export class GetPokemonsUseCase {
  private pokemonRepository: PokemonRepository;

  constructor(pokemonRepository: PokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  execute(limit: number, offset: number): Promise<PokemonPage> {
    return this.pokemonRepository.getPokemons(limit, offset);
  }
}

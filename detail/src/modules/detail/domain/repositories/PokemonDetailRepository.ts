import type { PokemonDetail } from "../entities/PokemonDetail";

export interface PokemonDetailRepository {
  getPokemonDetail(id: string): Promise<PokemonDetail>;
}

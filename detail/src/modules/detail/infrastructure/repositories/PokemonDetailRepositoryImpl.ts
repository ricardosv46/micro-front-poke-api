import type { PokemonDetailRepository } from "../../domain/repositories/PokemonDetailRepository";
import type { PokemonDetail } from "../../domain/entities/PokemonDetail";
import { httpClient } from "../../../../core/http/httpClient";

const POKEAPI_BASE_URL = import.meta.env.VITE_POKEAPI_BASE_URL ?? "https://pokeapi.co/api/v2";

interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  sprites: {
    front_default: string | null;
    other?: {
      dream_world?: { front_default: string | null };
      ["official-artwork"]?: { front_default: string | null };
    };
  };
}

const resolveImage = (sprites: PokemonApiResponse["sprites"]): string =>
  sprites.other?.dream_world?.front_default ??
  sprites.other?.["official-artwork"]?.front_default ??
  sprites.front_default ??
  "";

export class PokemonDetailRepositoryImpl implements PokemonDetailRepository {
  async getPokemonDetail(id: string): Promise<PokemonDetail> {
    const data = await httpClient.get<PokemonApiResponse>(`${POKEAPI_BASE_URL}/pokemon/${id}`);

    return {
      id: data.id,
      name: data.name,
      image: resolveImage(data.sprites),
      types: data.types.map((entry) => entry.type.name),
      stats: data.stats.map((entry) => ({ name: entry.stat.name, baseStat: entry.base_stat })),
      heightM: data.height / 10,
      weightKg: data.weight / 10,
      abilities: data.abilities.map((entry) => ({
        name: entry.ability.name,
        isHidden: entry.is_hidden,
      })),
    };
  }
}

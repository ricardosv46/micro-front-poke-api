export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: PokemonStat[];
  heightM: number;
  weightKg: number;
  abilities: PokemonAbility[];
}

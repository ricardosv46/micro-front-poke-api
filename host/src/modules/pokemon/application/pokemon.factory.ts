import { GetPokemonsUseCase } from "./GetPokemonsUseCase";
import { GetPokemonsByTypeUseCase } from "./GetPokemonsByTypeUseCase";
import { SearchPokemonByNameUseCase } from "./SearchPokemonByNameUseCase";
import { PokemonRepositoryImpl } from "../infrastructure/repositories/PokemonRepositoryImpl";

const pokemonRepository = new PokemonRepositoryImpl();

export const getPokemonsUseCase = new GetPokemonsUseCase(pokemonRepository);
export const getPokemonsByTypeUseCase = new GetPokemonsByTypeUseCase(pokemonRepository);
export const searchPokemonByNameUseCase = new SearchPokemonByNameUseCase(pokemonRepository);

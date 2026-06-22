import { GetPokemonDetailUseCase } from "./GetPokemonDetailUseCase";
import { RegisterVisitUseCase } from "./RegisterVisitUseCase";
import { PokemonDetailRepositoryImpl } from "../infrastructure/repositories/PokemonDetailRepositoryImpl";
import { HistoryRepositoryImpl } from "../infrastructure/repositories/HistoryRepositoryImpl";

const pokemonDetailRepository = new PokemonDetailRepositoryImpl();
const historyRepository = new HistoryRepositoryImpl();

export const getPokemonDetailUseCase = new GetPokemonDetailUseCase(pokemonDetailRepository);
export const registerVisitUseCase = new RegisterVisitUseCase(historyRepository);

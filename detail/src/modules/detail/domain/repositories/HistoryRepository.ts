import type { VisitedPokemon } from "../entities/VisitedPokemon";

export interface HistoryRepository {
  registerVisit(pokemon: Omit<VisitedPokemon, "visits">): void;
}

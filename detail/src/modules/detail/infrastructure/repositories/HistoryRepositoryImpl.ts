import type { HistoryRepository } from "../../domain/repositories/HistoryRepository";
import type { VisitedPokemon } from "../../domain/entities/VisitedPokemon";
import { useVisitedHistoryStore } from "../store/visitedHistory.store";

export class HistoryRepositoryImpl implements HistoryRepository {
  registerVisit(pokemon: Omit<VisitedPokemon, "visits">): void {
    useVisitedHistoryStore.getState().registerVisit(pokemon);
  }
}

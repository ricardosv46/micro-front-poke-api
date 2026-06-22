import type { HistoryRepository } from "../../domain/repositories/HistoryRepository";
import type { VisitedPokemon } from "../../domain/entities/VisitedPokemon";
import { useVisitedHistoryStore } from "../store/visitedHistory.store";

export class HistoryRepositoryImpl implements HistoryRepository {
  getHistory(): VisitedPokemon[] {
    return useVisitedHistoryStore.getState().history;
  }

  clearHistory(): void {
    useVisitedHistoryStore.getState().clearHistory();
  }

  subscribe(listener: () => void): () => void {
    return useVisitedHistoryStore.subscribe(listener);
  }
}

import type { VisitedPokemon } from "../entities/VisitedPokemon";

export interface HistoryRepository {
  getHistory(): VisitedPokemon[];
  clearHistory(): void;
  subscribe(listener: () => void): () => void;
}

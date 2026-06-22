import type { HistoryRepository } from "../domain/repositories/HistoryRepository";
import type { VisitedPokemon } from "../domain/entities/VisitedPokemon";

export class GetHistoryUseCase {
  private historyRepository: HistoryRepository;

  constructor(historyRepository: HistoryRepository) {
    this.historyRepository = historyRepository;
  }

  execute(): VisitedPokemon[] {
    return this.historyRepository.getHistory();
  }

  subscribe(listener: () => void): () => void {
    return this.historyRepository.subscribe(listener);
  }
}

import type { HistoryRepository } from "../domain/repositories/HistoryRepository";

export class ClearHistoryUseCase {
  private historyRepository: HistoryRepository;

  constructor(historyRepository: HistoryRepository) {
    this.historyRepository = historyRepository;
  }

  execute(): void {
    this.historyRepository.clearHistory();
  }
}

import type { HistoryRepository } from "../domain/repositories/HistoryRepository";
import type { VisitedPokemon } from "../domain/entities/VisitedPokemon";

export class RegisterVisitUseCase {
  private historyRepository: HistoryRepository;

  constructor(historyRepository: HistoryRepository) {
    this.historyRepository = historyRepository;
  }

  execute(pokemon: Omit<VisitedPokemon, "visits">): void {
    this.historyRepository.registerVisit(pokemon);
  }
}

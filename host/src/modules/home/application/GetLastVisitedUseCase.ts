import type { LastVisitedRepository } from "../domain/repositories/LastVisitedRepository";
import type { VisitedPokemon } from "../domain/entities/VisitedPokemon";

export class GetLastVisitedUseCase {
  private lastVisitedRepository: LastVisitedRepository;

  constructor(lastVisitedRepository: LastVisitedRepository) {
    this.lastVisitedRepository = lastVisitedRepository;
  }

  execute(): VisitedPokemon | null {
    const pokemon = this.lastVisitedRepository.getLastVisited();
    if (!pokemon) return null;

    return this.lastVisitedRepository.isDismissed(pokemon.id) ? null : pokemon;
  }
}

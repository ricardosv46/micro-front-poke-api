import type { VisitedPokemon } from "../entities/VisitedPokemon";

export interface LastVisitedRepository {
  getLastVisited(): VisitedPokemon | null;
  isDismissed(id: number): boolean;
  dismiss(id: number): void;
}

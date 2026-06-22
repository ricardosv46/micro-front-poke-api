import type { LastVisitedRepository } from "../../domain/repositories/LastVisitedRepository";
import type { VisitedPokemon } from "../../domain/entities/VisitedPokemon";

const HISTORY_STORAGE_KEY = "pokemon-visited-history";
const DISMISSED_STORAGE_KEY = "pokemon-visited-toast-dismissed-id";

export class LastVisitedRepositoryImpl implements LastVisitedRepository {
  getLastVisited(): VisitedPokemon | null {
    try {
      const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      const list: VisitedPokemon[] = parsed?.state?.history ?? [];
      return list[0] ?? null;
    } catch {
      return null;
    }
  }

  isDismissed(id: number): boolean {
    return localStorage.getItem(DISMISSED_STORAGE_KEY) === String(id);
  }

  dismiss(id: number): void {
    localStorage.setItem(DISMISSED_STORAGE_KEY, String(id));
  }
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VisitedPokemon } from "../../domain/entities/VisitedPokemon";

interface VisitedHistoryState {
  history: VisitedPokemon[];
  registerVisit: (pokemon: Omit<VisitedPokemon, "visits">) => void;
}

// detail and history are separate Module Federation bundles, each with its
// own Zustand instance. They share the same localStorage key but not memory,
// so writes from one must notify the other to rehydrate from storage.
const HISTORY_SYNC_EVENT = "pokemon:history-updated";

export const useVisitedHistoryStore = create<VisitedHistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      registerVisit: (pokemon) => {
        const existing = get().history.find((entry) => entry.id === pokemon.id);

        const updatedEntry: VisitedPokemon = existing
          ? { ...existing, ...pokemon, visits: existing.visits + 1 }
          : { ...pokemon, visits: 1 };

        const rest = get().history.filter((entry) => entry.id !== pokemon.id);
        set({ history: [updatedEntry, ...rest] });
        window.dispatchEvent(new CustomEvent(HISTORY_SYNC_EVENT));
      },
    }),
    { name: "pokemon-visited-history" }
  )
);

window.addEventListener(HISTORY_SYNC_EVENT, () => {
  void useVisitedHistoryStore.persist.rehydrate();
});

import { useEffect, useState } from "react";
import type { VisitedPokemon } from "../../domain/entities/VisitedPokemon";
import { getLastVisitedUseCase, dismissLastVisitedUseCase } from "../../application/home.factory";

// detail/history dispatch this on window after registering a visit (see
// infrastructure/store/visitedHistory.store.ts in each MF) so the toast can
// reflect a new visit without requiring a full page reload.
const HISTORY_SYNC_EVENT = "pokemon:history-updated";

export const useLastVisitedToast = () => {
  const [lastVisited, setLastVisited] = useState<VisitedPokemon | null>(() =>
    getLastVisitedUseCase.execute()
  );

  useEffect(() => {
    const handleHistoryUpdated = () => setLastVisited(getLastVisitedUseCase.execute());

    window.addEventListener(HISTORY_SYNC_EVENT, handleHistoryUpdated);
    return () => window.removeEventListener(HISTORY_SYNC_EVENT, handleHistoryUpdated);
  }, []);

  const dismiss = () => {
    if (lastVisited) dismissLastVisitedUseCase.execute(lastVisited.id);
    setLastVisited(null);
  };

  return { lastVisited, dismiss };
};

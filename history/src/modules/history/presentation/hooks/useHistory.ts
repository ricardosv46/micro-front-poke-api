import { useSyncExternalStore } from "react";
import { getHistoryUseCase, clearHistoryUseCase } from "../../application/history.factory";

export function useHistory() {
  const history = useSyncExternalStore(
    (listener) => getHistoryUseCase.subscribe(listener),
    () => getHistoryUseCase.execute()
  );

  const clearHistory = () => clearHistoryUseCase.execute();

  return { history, clearHistory };
}

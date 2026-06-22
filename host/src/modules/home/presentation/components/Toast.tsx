import { useLastVisitedToast } from "../hooks/useLastVisitedToast";

export const Toast = () => {
  const { lastVisited, dismiss } = useLastVisitedToast();

  if (!lastVisited) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-3 text-white shadow-lg">
      <img src={lastVisited.image} alt={lastVisited.name} className="h-10 w-10" />
      <span className="text-sm capitalize">
        Último Pokémon visitado: <strong>{lastVisited.name}</strong>
      </span>
      <button
        onClick={dismiss}
        aria-label="Cerrar"
        className="ml-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600"
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  );
};

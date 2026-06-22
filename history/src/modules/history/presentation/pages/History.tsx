import "../../../../index.css";
import { useHistory } from "../hooks/useHistory";
import { HistoryItem } from "../components/HistoryItem";

const History = () => {
  const { history, clearHistory } = useHistory();

  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-container">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="mb-4 flex items-center gap-1 rounded-full px-3 py-1.5 text-label-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Volver
      </button>
      <div className="mx-auto max-w-[480px] py-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="text-headline-lg text-on-surface">
            Historial de Pokémon visitados
          </h1>
        </div>

        {history.length === 0 && (
          <p className="text-center text-body-md text-on-surface-variant">
            Aún no has visitado ningún Pokémon.
          </p>
        )}

        <ul className="flex flex-col gap-3">
          {history.map((pokemon) => (
            <HistoryItem key={pokemon.id} pokemon={pokemon} />
          ))}
        </ul>

        {history.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="my-6 mx-auto flex-shrink-0 rounded-full bg-surface-container-high px-4 py-2 text-label-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-on-surface"
          >
            Limpiar historial
          </button>
        )}
      </div>
    </section>
  );
};

export default History;

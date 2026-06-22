import type { VisitedPokemon } from "../../domain/entities/VisitedPokemon";

interface HistoryItemProps {
  pokemon: VisitedPokemon;
}

export const HistoryItem = ({ pokemon }: HistoryItemProps) => (
  <li className="flex items-center gap-4 rounded-xl bg-surface-container p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="h-full w-full object-contain drop-shadow-md"
      />
    </div>
    <span className="flex-1 text-body-md font-semibold capitalize text-on-surface">
      {pokemon.name}
    </span>
    <span className="rounded-full bg-primary-container px-3 py-1 text-label-sm font-bold text-on-primary-container">
      {pokemon.visits} {pokemon.visits === 1 ? "visita" : "visitas"}
    </span>
  </li>
);

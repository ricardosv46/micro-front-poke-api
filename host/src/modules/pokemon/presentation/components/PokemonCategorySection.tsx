import { useNavigate } from "react-router-dom";
import { usePokemonsByTypeQuery } from "../hooks/usePokemonsByTypeQuery";
import { PokemonCard } from "./PokemonCard";

interface PokemonCategorySectionProps {
  type: string;
}

const TYPE_COLORS: Record<string, string> = {
  fire: "#ef4444",
  water: "#3b82f6",
  grass: "#10b981",
  electric: "#f59e0b",
  psychic: "#ec4899",
  normal: "#9ca3af",
  ice: "#22d3ee",
  fighting: "#f97316",
  poison: "#a855f7",
  ground: "#d97706",
};

export const PokemonCategorySection = ({ type }: PokemonCategorySectionProps) => {
  const { data: pokemons, isLoading, isError } = usePokemonsByTypeQuery(type);
  const navigate = useNavigate();

  const typeColor = TYPE_COLORS[type.toLowerCase()] || "#9ca3af";

  return (
    <section className="mb-8">
      <h2 className="mb-6 flex items-center gap-3 text-headline-lg capitalize" style={{ color: typeColor }}>
        <span className="h-6 w-1 rounded-full" style={{ backgroundColor: typeColor }} />
        {type}
      </h2>

      {isLoading && <p className="text-center text-body-md text-on-surface-variant">Cargando...</p>}
      {isError && <p className="text-center text-body-md text-error">Error al cargar los Pokémon</p>}

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {pokemons?.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            imageUrl={pokemon.imageUrl}
            onClick={() => navigate(`/pokemon/${pokemon.id}`)}
          />
        ))}
      </div>
    </section>
  );
};

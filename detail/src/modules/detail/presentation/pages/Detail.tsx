import "../../../../index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../../core/query/queryClient";
import { usePokemonDetailQuery } from "../hooks/usePokemonDetailQuery";
import { useRegisterVisit } from "../hooks/useRegisterVisit";
import { TYPE_GLOW_COLORS } from "../components/typeColors";
import { PokemonHeaderCard } from "../components/PokemonHeaderCard";
import { PokemonQuickStats } from "../components/PokemonQuickStats";
import { AbilityCard } from "../components/AbilityCard";
import { StatsPanel } from "../components/StatsPanel";

interface DetailProps {
  pokemonId: string;
}

const DetailContent = ({ pokemonId }: DetailProps) => {
  const {
    data: pokemon,
    isLoading,
    isError,
  } = usePokemonDetailQuery(pokemonId);
  useRegisterVisit(pokemon, pokemonId);

  if (isLoading)
    return (
      <p className="p-4 text-center text-on-surface-variant">Cargando...</p>
    );
  if (isError || !pokemon)
    return (
      <p className="p-4 text-center text-error">Error al cargar el Pokémon</p>
    );

  const glowColor =
    TYPE_GLOW_COLORS[pokemon.types[0]] ?? "var(--color-primary)";

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="mb-4 flex items-center gap-1 rounded-full px-3 py-1.5 text-label-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Volver
      </button>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="w-full space-y-6 lg:sticky lg:top-6 lg:w-[38%]">
          <PokemonHeaderCard
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
            glowColor={glowColor}
          />

          <PokemonQuickStats
            heightM={pokemon.heightM}
            weightKg={pokemon.weightKg}
            abilitiesCount={pokemon.abilities.length}
          />
        </div>

        <div className="w-full space-y-8 lg:w-[62%]">
          <div className="space-y-4">
            <h3 className="text-label-sm font-bold uppercase tracking-widest text-primary">
              Habilidades
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {pokemon.abilities.map((ability) => (
                <AbilityCard key={ability.name} ability={ability} glowColor={glowColor} />
              ))}
            </div>
          </div>

          <StatsPanel stats={pokemon.stats} />
        </div>
      </div>
    </section>
  );
};

const Detail = (props: DetailProps) => (
  <QueryClientProvider client={queryClient}>
    <DetailContent {...props} />
  </QueryClientProvider>
);

export default Detail;

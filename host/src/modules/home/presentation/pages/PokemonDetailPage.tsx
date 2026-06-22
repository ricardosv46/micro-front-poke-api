import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { RemoteErrorBoundary } from "../../../../core/components/RemoteErrorBoundary";

const Detail = lazy(async () => import("mfDetail/Detail"));

const PokemonDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <RemoteErrorBoundary remoteName="el detalle del Pokémon">
      <Suspense fallback={<p className="p-4 text-center text-on-surface-variant">Cargando...</p>}>
        <Detail pokemonId={id} />
      </Suspense>
    </RemoteErrorBoundary>
  );
};

export default PokemonDetailPage;

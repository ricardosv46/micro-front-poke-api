import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemonsInfiniteQuery } from "../hooks/usePokemonsInfiniteQuery";
import { useSearchPokemonByNameQuery } from "../hooks/useSearchPokemonByNameQuery";
import { PokemonCard } from "./PokemonCard";

interface PokemonListModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearch?: string;
}

export const PokemonListModal = ({
  isOpen,
  onClose,
  initialSearch = "",
}: PokemonListModalProps) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonsInfiniteQuery();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [submittedSearch, setSubmittedSearch] = useState(initialSearch);
  const {
    data: searchResult,
    isLoading: isSearching,
    isFetching: isSearchFetching,
    isError: isSearchError,
  } = useSearchPokemonByNameQuery(submittedSearch);

  const handleClearSearch = () => {
    setSearchInput("");
    setSubmittedSearch("");
  };

  const handleClose = () => {
    handleClearSearch();
    onClose();
  };

  const handleSelectPokemon = (pokemonId: number) => {
    handleClose();
    navigate(`/pokemon/${pokemonId}`);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSubmittedSearch(searchInput.trim());
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchInput]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSubmittedSearch(searchInput.trim());
    }
  };

  useEffect(() => {
    if (!isOpen || submittedSearch) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isOpen, submittedSearch, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!isOpen) return null;

  const pokemons = data?.pages.flatMap((page) => page.pokemons) ?? [];
  const trimmedInput = searchInput.trim();
  const isSearchMode = trimmedInput.length > 0;
  const isWaitingDebounce = isSearchMode && trimmedInput !== submittedSearch;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-surface shadow-2xl">
        <div className="border-b border-outline-variant bg-surface-container p-container">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">search</span>
              <h2 className="text-headline-lg text-on-surface">Buscar Pokémon</h2>
            </div>
            <button
              onClick={handleClose}
              className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex gap-2">
            <div className="group relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                travel_explore
              </span>
              <input
                type="text"
                autoFocus
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar por nombre exacto (ej: pikachu)"
                className="h-14 w-full rounded-lg border border-outline-variant bg-surface-container-high pl-12 pr-4 text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none"
              />
            </div>
            {searchInput.length > 0 && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="h-14 rounded-lg bg-surface-container-high px-4 text-label-sm font-bold text-on-surface-variant hover:bg-surface-container-highest"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-container">
          {!isSearchMode && (
            <p className="mb-4 text-label-sm text-on-surface-variant">POKÉMON</p>
          )}

          {isSearchMode ? (
            <>
              {isWaitingDebounce && (
                <p className="py-4 text-center text-body-md text-on-surface-variant">
                  Esperando...
                </p>
              )}
              {!isWaitingDebounce && (isSearching || isSearchFetching) && (
                <p className="py-4 text-center text-body-md text-on-surface-variant">
                  Buscando...
                </p>
              )}
              {!isWaitingDebounce && !isSearching && !isSearchFetching && isSearchError && (
                <p className="py-4 text-center text-body-md text-error">
                  Error al buscar el Pokémon
                </p>
              )}
              {!isWaitingDebounce &&
                !isSearching &&
                !isSearchFetching &&
                !isSearchError &&
                searchResult === null && (
                  <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
                    <span className="material-symbols-outlined mb-2 text-5xl">inventory_2</span>
                    <p className="text-body-md">No encontrado</p>
                  </div>
                )}
              {!isWaitingDebounce && !isSearching && !isSearchFetching && !isSearchError && searchResult && (
                <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                  <PokemonCard
                    name={searchResult.name}
                    imageUrl={searchResult.imageUrl}
                    onClick={() => handleSelectPokemon(searchResult.id)}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {isLoading && (
                <p className="py-4 text-center text-body-md text-on-surface-variant">
                  Cargando...
                </p>
              )}
              {isError && (
                <p className="py-4 text-center text-body-md text-error">
                  Error al cargar los Pokémon
                </p>
              )}

              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                {pokemons.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    name={pokemon.name}
                    imageUrl={pokemon.imageUrl}
                    onClick={() => handleSelectPokemon(pokemon.id)}
                  />
                ))}
              </div>

              <div ref={sentinelRef} className="h-8" />
              {isFetchingNextPage && (
                <p className="py-2 text-center text-label-sm text-on-surface-variant">
                  Cargando más...
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

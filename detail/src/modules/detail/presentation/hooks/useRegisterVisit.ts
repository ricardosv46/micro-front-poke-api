import { useEffect, useRef } from "react";
import type { PokemonDetail } from "../../domain/entities/PokemonDetail";
import { registerVisitUseCase } from "../../application/detail.factory";

export function useRegisterVisit(pokemon: PokemonDetail | undefined, pokemonId: string) {
  const registeredIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pokemon || registeredIdRef.current === pokemonId) return;

    registeredIdRef.current = pokemonId;
    registerVisitUseCase.execute({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
    });
  }, [pokemon, pokemonId]);
}

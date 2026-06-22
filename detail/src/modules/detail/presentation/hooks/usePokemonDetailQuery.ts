import { useQuery } from "@tanstack/react-query";
import { getPokemonDetailUseCase } from "../../application/detail.factory";

export function usePokemonDetailQuery(pokemonId: string) {
  return useQuery({
    queryKey: ["pokemon-detail", pokemonId],
    queryFn: () => getPokemonDetailUseCase.execute(pokemonId),
  });
}

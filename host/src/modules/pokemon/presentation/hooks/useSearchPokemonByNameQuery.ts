import { useQuery } from "@tanstack/react-query";
import { searchPokemonByNameUseCase } from "../../application/pokemon.factory";

export function useSearchPokemonByNameQuery(name: string) {
  return useQuery({
    queryKey: ["pokemon-search", name],
    queryFn: () => searchPokemonByNameUseCase.execute(name),
    enabled: name.length > 0,
  });
}

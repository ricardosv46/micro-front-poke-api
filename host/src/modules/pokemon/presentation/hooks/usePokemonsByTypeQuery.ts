import { useQuery } from "@tanstack/react-query";
import { getPokemonsByTypeUseCase } from "../../application/pokemon.factory";

const PAGE_SIZE = 10;

export function usePokemonsByTypeQuery(type: string) {
  return useQuery({
    queryKey: ["pokemons-by-type", type],
    queryFn: () => getPokemonsByTypeUseCase.execute(type, PAGE_SIZE),
  });
}

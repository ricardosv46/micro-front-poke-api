import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonsUseCase } from "../../application/pokemon.factory";

const PAGE_SIZE = 30;

export function usePokemonsInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam }) => getPokemonsUseCase.execute(PAGE_SIZE, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
}

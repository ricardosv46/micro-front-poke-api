import type { Pokemon } from "../../domain/entities/Pokemon";

function extractIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
}

export function toPokemon(name: string, url: string): Pokemon {
  const id = extractIdFromUrl(url);

  return {
    id,
    name,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  };
}

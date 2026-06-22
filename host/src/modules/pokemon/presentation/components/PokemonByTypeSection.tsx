import { PokemonCategorySection } from "./PokemonCategorySection";

const POKEMON_TYPES = [
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "normal",
  "ice",
  "fighting",
  "poison",
  "ground",
];

export const PokemonByTypeSection = () => {
  return (
    <div className="mt-8">
      <h2 className="mb-6 text-headline-lg-mobile text-on-surface">Pokémon por categoría</h2>

      {POKEMON_TYPES.map((type) => (
        <PokemonCategorySection key={type} type={type} />
      ))}
    </div>
  );
};

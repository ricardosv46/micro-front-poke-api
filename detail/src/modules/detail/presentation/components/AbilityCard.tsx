import type { PokemonAbility } from "../../domain/entities/PokemonDetail";

interface AbilityCardProps {
  ability: PokemonAbility;
  glowColor: string;
}

export const AbilityCard = ({ ability, glowColor }: AbilityCardProps) => (
  <div
    className={`glass-card rounded-xl border-l-4 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
      ability.isHidden ? "border-l-on-surface-variant/40" : ""
    }`}
    style={ability.isHidden ? undefined : { borderLeftColor: glowColor }}
  >
    <div className="flex items-start justify-between gap-2">
      <h4 className="text-body-md font-bold capitalize text-on-surface">
        {ability.name.replace(/-/g, " ")}
      </h4>
      {ability.isHidden && (
        <span className="rounded bg-surface-container-highest px-2 py-0.5 text-label-sm uppercase text-on-surface-variant">
          Oculta
        </span>
      )}
    </div>
  </div>
);

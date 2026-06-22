interface PokemonQuickStatsProps {
  heightM: number;
  weightKg: number;
  abilitiesCount: number;
}

export const PokemonQuickStats = ({ heightM, weightKg, abilitiesCount }: PokemonQuickStatsProps) => (
  <div className="glass-card grid grid-cols-3 gap-3 rounded-2xl p-4">
    <div className="flex flex-col items-center text-center">
      <p className="text-label-sm uppercase tracking-widest text-on-surface-variant">Altura</p>
      <p className="mt-1 text-stats-num text-primary">{heightM} m</p>
    </div>
    <div className="flex flex-col items-center text-center">
      <p className="text-label-sm uppercase tracking-widest text-on-surface-variant">Peso</p>
      <p className="mt-1 text-stats-num text-primary">{weightKg} kg</p>
    </div>
    <div className="flex flex-col items-center text-center">
      <p className="text-label-sm uppercase tracking-widest text-on-surface-variant">Habilidades</p>
      <p className="mt-1 text-stats-num text-primary">{abilitiesCount}</p>
    </div>
  </div>
);

import type { PokemonStat } from "../../domain/entities/PokemonDetail";

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

// DESIGN.md: "Stats Bars... color-coded logic (Red for low, Yellow for mid, Green for high)".
const getStatBarColor = (baseStat: number) => {
  if (baseStat < 50) return "bg-red-500";
  if (baseStat < 90) return "bg-yellow-500";
  return "bg-green-500";
};

interface StatsPanelProps {
  stats: PokemonStat[];
}

export const StatsPanel = ({ stats }: StatsPanelProps) => {
  const totalStats = stats.reduce((sum, stat) => sum + stat.baseStat, 0);

  return (
    <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-label-sm font-bold uppercase tracking-widest text-primary">
          Estadísticas base
        </h3>
        <span className="text-label-sm font-bold text-on-surface-variant">TOTAL: {totalStats}</span>
      </div>

      <ul className="space-y-5">
        {stats.map((stat) => {
          const percentage = Math.min((stat.baseStat / 255) * 100, 100);

          return (
            <li key={stat.name} className="flex flex-col gap-2">
              <div className="flex justify-between text-label-sm font-bold uppercase tracking-wider">
                <span className="text-on-surface-variant">{STAT_LABELS[stat.name] ?? stat.name}</span>
                <span className="text-primary">{stat.baseStat}</span>
              </div>
              <div className="stat-bar-container">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${getStatBarColor(stat.baseStat)}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

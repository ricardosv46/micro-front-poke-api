import { TYPE_GLOW_COLORS, getContrastText } from "./typeColors";

interface PokemonHeaderCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
  glowColor: string;
}

export const PokemonHeaderCard = ({ id, name, image, types, glowColor }: PokemonHeaderCardProps) => (
  <div className="relative">
    <div
      className="pointer-events-none absolute inset-0 -z-10 scale-75 rounded-full opacity-20 blur-[100px]"
      style={{ backgroundColor: glowColor }}
    />

    <div className="glass-card flex flex-col items-center rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <span className="inline-block rounded-full bg-surface-container-highest px-4 py-1 text-label-sm font-bold tracking-widest text-primary">
        #{String(id).padStart(4, "0")}
      </span>

      <div className="float-animation flex justify-center py-6">
        <img
          src={image}
          alt={name}
          className="h-48 w-48 object-contain drop-shadow-[0_20px_40px_rgba(255,179,173,0.25)] lg:h-56 lg:w-56"
        />
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-headline-xl uppercase tracking-tighter text-on-surface">{name}</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {types.map((type) => {
            const color = TYPE_GLOW_COLORS[type] ?? "var(--color-outline)";
            return (
              <span
                key={type}
                className="rounded-full px-4 py-1 text-label-sm font-bold uppercase tracking-widest"
                style={{
                  backgroundColor: color,
                  color: getContrastText(color),
                  boxShadow: `0 8px 20px -6px ${color}`,
                }}
              >
                {type}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

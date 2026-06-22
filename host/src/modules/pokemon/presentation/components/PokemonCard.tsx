interface PokemonCardProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
}

export const PokemonCard = ({ name, imageUrl, onClick }: PokemonCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-xl border border-outline-variant bg-surface-container p-card text-center transition-all duration-300 hover:bg-surface-container-high hover:shadow-lg sm:flex-row sm:text-left"
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-bl-full bg-primary/5 transition-transform duration-300 group-hover:scale-110" />
      <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-outline-variant bg-surface-container-high">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="relative z-10 text-headline-md capitalize text-on-surface transition-colors group-hover:text-primary">
        {name}
      </h3>
    </button>
  );
};

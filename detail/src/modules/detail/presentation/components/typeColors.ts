export const TYPE_GLOW_COLORS: Record<string, string> = {
  fire: "#ef4444",
  water: "#3b82f6",
  grass: "#22c55e",
  electric: "#eab308",
  psychic: "#d946ef",
  normal: "#94a3b8",
  ice: "#22d3ee",
  fighting: "#f97316",
  poison: "#a855f7",
  ground: "#d97706",
  flying: "#0ea5e9",
  bug: "#84cc16",
  rock: "#78716c",
  ghost: "#6366f1",
  dragon: "#8b5cf6",
  dark: "#71717a",
  steel: "#71717a",
  fairy: "#ec4899",
};

// DESIGN.md: "Text within these tags should always be white or high-contrast black
// depending on the background brightness."
export const getContrastText = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#1e293b" : "#ffffff";
};

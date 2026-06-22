import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

// Lee el valor persistido de forma sincrónica para que el primer `applyTheme` (línea
// final de este archivo) ya aplique el tema correcto antes de que Zustand termine de
// rehidratar — evita que `data-theme` cambie dos veces al cargar y dispare la transición
// de color global de index.css en cada elemento de la página.
const getInitialTheme = (): Theme => {
  try {
    const stored = localStorage.getItem("pokemon-theme");
    const parsed = stored ? JSON.parse(stored) : null;
    if (parsed?.state?.theme === "light" || parsed?.state?.theme === "dark") {
      return parsed.state.theme;
    }
  } catch {
    // localStorage inaccesible o JSON corrupto: cae a la preferencia del sistema.
  }
  return getSystemTheme();
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      toggleTheme: () => {
        const next: Theme = get().theme === "dark" ? "light" : "dark";
        applyTheme(next);
        set({ theme: next });
      },
    }),
    {
      name: "pokemon-theme",
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme);
      },
    }
  )
);

applyTheme(useThemeStore.getState().theme);

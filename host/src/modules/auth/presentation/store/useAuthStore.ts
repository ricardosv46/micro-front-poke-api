import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../../domain/entities/User";
import type { Credentials } from "../../domain/repositories/AuthRepository";
import { loginUseCase } from "../../application/auth.factory";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const user = await loginUseCase.execute(credentials);
          set({ user, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      logout: () => set({ user: null }),
    }),
    { name: "auth-storage", partialize: (state) => ({ user: state.user }) }
  )
);

export const useIsAuthenticated = () => useAuthStore((state) => state.user !== null);

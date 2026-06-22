import { useState, type FormEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../../../theme/presentation/store/useThemeStore";
import { validateCredentials } from "../../domain/validators/validateCredentials";

const LoginPage = () => {
  const { login, isLoading, error, user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationError = validateCredentials({ email, password });
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError(null);
    login({ email, password });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-[5%] -top-[10%] h-[40%] w-[40%] rounded-full bg-primary opacity-10 blur-[120px]" />
        <div className="absolute -right-[5%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-secondary opacity-10 blur-[120px]" />
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Cambiar tema"
        className="fixed right-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/5 bg-surface-container-high transition-all hover:bg-surface-container-highest active:scale-95"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <main className="relative z-10 w-full max-w-[440px]">
        <div className="flex flex-col items-center rounded-xl border border-white/10 bg-surface-container/70 p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-[0_0_40px_rgba(255,179,173,0.3)]">
              <span className="material-symbols-outlined text-[40px] text-on-primary">
                bolt
              </span>
            </div>
            <h1 className="text-headline-lg font-black tracking-tighter text-primary">
              PokéDex
            </h1>
            <p className="mt-2 text-body-md text-on-surface-variant">
              Laboratorio Central de Kanto
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="ml-1 block text-label-sm text-on-surface-variant"
              >
                Correo
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-low py-4 pl-12 pr-4 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="ml-1 block text-label-sm text-on-surface-variant"
              >
                Contraseña
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-low py-4 pl-12 pr-12 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-label-sm font-bold text-on-surface-variant hover:text-primary"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container py-4 text-headline-md font-bold text-on-primary-container transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Validando..." : "Iniciar Sesión"}
              {!isLoading && (
                <span className="material-symbols-outlined">arrow_forward</span>
              )}
            </button>
          </form>

          {formError && (
            <p className="mt-4 text-body-md text-error">{formError}</p>
          )}
          {!formError && error && (
            <p className="mt-4 text-body-md text-error">{error}</p>
          )}
          {user && (
            <p className="mt-4 text-body-md text-tertiary">
              Bienvenido {user.email}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

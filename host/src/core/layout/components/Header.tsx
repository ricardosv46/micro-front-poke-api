import { Link, useLocation } from "react-router-dom";
import { brandNavItem, navLinks } from "../navItems";
import { useThemeStore } from "../../../modules/theme/presentation/store/useThemeStore";
import { UserMenu } from "./UserMenu";

export const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-surface-container-lowest/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-container">
        <div className="flex items-center gap-8">
          <Link
            to={brandNavItem.path}
            className="text-headline-lg-mobile font-black tracking-tighter text-on-surface"
          >
            {brandNavItem.label}
          </Link>
          <nav className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((navLink) => {
              const isActive = location.pathname === navLink.path;
              return (
                <Link
                  key={navLink.path}
                  to={navLink.path}
                  className={`pb-1 text-label-sm font-bold ${
                    isActive
                      ? "border-b-2 border-primary text-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {navLink.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="flex h-touch w-touch items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};

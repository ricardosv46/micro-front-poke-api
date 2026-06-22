import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../navItems";

export const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/5 bg-surface-container-lowest shadow-[0_-4px_20px_rgba(0,0,0,0.2)] md:hidden">
      <div className="flex h-[72px] items-center justify-around">
        {navLinks.map((navLink) => {
          const isActive = location.pathname === navLink.path;
          return (
            <Link
              key={navLink.path}
              to={navLink.path}
              className={`relative flex min-h-touch min-w-touch flex-col items-center justify-center ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`}
            >
              {isActive && <div className="absolute top-0 h-1 w-8 rounded-b-full bg-primary" />}
              <span className="mt-1 text-label-sm">{navLink.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../modules/auth/presentation/store/useAuthStore";
import { AUTH_ROUTES } from "../../../modules/auth/presentation/paths";

export const UserMenu = () => {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate(AUTH_ROUTES.LOGIN);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center min-h-touch rounded-full bg-surface-container px-4 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container-high"
      >
        {user?.email?.split("@")[0] || "User"}
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-44 rounded-lg bg-surface-container-high py-1 shadow-lg ring-1 ring-outline-variant">
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-3 text-left text-sm text-error hover:bg-surface-container-highest"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

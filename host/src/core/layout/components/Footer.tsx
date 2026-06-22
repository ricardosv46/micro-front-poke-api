export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-surface-container-lowest dark:bg-surface-container-lowest">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-md px-container py-6 md:flex-row">
        <div className="flex items-center gap-md">
          <span className="font-headline-md text-headline-md text-on-surface mr-1">
            PokéDex
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            © 2026 Pokedex. Todos los derechos reservados.
          </span>
        </div>
        <div className="flex gap-lg">
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            API Documentation
          </a>
        </div>
      </div>
    </footer>
  );
};

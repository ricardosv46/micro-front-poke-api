# history — Microfrontend 2: Historial de visitados

Microfrontend (puerto **3002**) expuesto vía Module Federation como `mfHistory/History`. Muestra la lista de Pokémon visitados con imagen, nombre y conteo de visitas, persistidos en `localStorage`.

Documentación completa (instalación, arquitectura hexagonal, estrategia de historial) en el [README raíz](../README.md).

## Scripts

```bash
pnpm install
pnpm dev       # http://localhost:3002
pnpm build
pnpm preview
pnpm lint
```

Puede levantarse solo (`pnpm dev`) para desarrollo aislado, pero solo se ve integrado al navegar desde `host` (http://localhost:3000), que es quien lo monta vía `import("mfHistory/History")`.

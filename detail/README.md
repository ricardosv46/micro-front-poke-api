# detail — Microfrontend 1: Detalle de Pokémon

Microfrontend (puerto **3001**) expuesto vía Module Federation como `mfDetail/Detail`. Muestra imagen, nombre, tipos, stats, habilidades y descripción de un Pokémon, y registra la visita en el historial.

Documentación completa (instalación, arquitectura hexagonal, estrategia de historial) en el [README raíz](../README.md).

## Scripts

```bash
pnpm install
pnpm dev       # http://localhost:3001
pnpm build
pnpm preview
pnpm lint
```

Puede levantarse solo (`pnpm dev`) para desarrollo aislado, pero solo se ve integrado al navegar desde `host` (http://localhost:3000), que es quien lo monta vía `import("mfDetail/Detail")`.

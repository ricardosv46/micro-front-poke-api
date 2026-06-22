# host — Shell

Aplicación contenedora (puerto **3000**) del reto Kinetic Dex. Maneja login, home con categorías, buscador (modal fullscreen + scroll infinito), navegación, tema claro/oscuro y toast del último Pokémon visitado. Consume `detail` (3001) y `history` (3002) vía Module Federation.

Documentación completa (instalación, arquitectura, decisiones técnicas) en el [README raíz](../README.md).

## Scripts

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm build
pnpm preview
pnpm lint
```

Requiere que `detail` y `history` estén corriendo en 3001 y 3002 para que el detalle de Pokémon y el historial funcionen.

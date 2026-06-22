# Kinetic Dex — Microfrontends Pokémon

Solución al reto técnico Frontend Senior: una app de microfrontends con React + Vite + Module Federation, login, home con categorías, buscador con scroll infinito, detalle de Pokémon, historial de visitados y tema claro/oscuro.

## Arquitectura

Tres aplicaciones independientes, cada una con su propio `package.json`, build y arquitectura hexagonal (`domain` / `application` / `infrastructure` / `presentation`):

| App | Rol | Puerto |
|---|---|---|
| `host` | Shell: login, home, navegación, buscador, tema, toast | http://localhost:3000 |
| `detail` | Microfrontend 1: detalle de Pokémon | http://localhost:3001 |
| `history` | Microfrontend 2: historial de Pokémon visitados | http://localhost:3002 |

`host` consume `detail` y `history` vía Module Federation (`@module-federation/vite`), cargándolos de forma perezosa (`lazy` + `Suspense`) en las rutas `/pokemon/:id` y `/historial`. `react`/`react-dom` están declarados como dependencias compartidas (`singleton`) en las tres apps para evitar instancias duplicadas de React.

Cada microfrontend es independiente a propósito: tiene su propio Zustand, su propio cliente HTTP y su propia instancia de React Query (cuando aplica). No se comparten instancias de estado/infraestructura entre apps — solo librerías (vía `shared`) y, puntualmente, los componentes UI que cada MF expone (`Detail`, `History`). Esto preserva la posibilidad de desplegar y versionar cada app por separado.

## Instalación

Cada app se instala por separado (no es un monorepo con workspaces). Se usa **pnpm**.

```bash
cd host && pnpm install
cd ../detail && pnpm install
cd ../history && pnpm install
```

## Cómo levantar el proyecto

Necesitas 3 terminales (uno por app). El orden no importa, pero se recomienda levantar primero los microfrontends:

```bash
# Terminal 1
cd detail && pnpm dev      # http://localhost:3001

# Terminal 2
cd history && pnpm dev     # http://localhost:3002

# Terminal 3
cd host && pnpm dev        # http://localhost:3000
```

Abre `http://localhost:3000`. Credenciales de login (mock, sin backend real):

- **Email:** `admin@gmail.com`
- **Password:** `admin`

## Scripts (en cada app)

| Script | Descripción |
|---|---|
| `pnpm dev` | Levanta el servidor de desarrollo de Vite |
| `pnpm build` | `tsc -b` + build de producción |
| `pnpm preview` | Sirve el build de producción |
| `pnpm lint` | ESLint |

## Stack

- **React 19 + Vite + Module Federation** (`@module-federation/vite`)
- **Estilos:** Tailwind CSS v4 (config-first vía `@theme` en `index.css`, sin `tailwind.config.js`)
- **Estado:** Zustand (con `persist` para sesión, tema e historial)
- **Data fetching:** TanStack Query (`host` y `detail`) sobre un `httpClient` propio de cada app (wrapper de `fetch` con manejo de errores HTTP)

## Decisiones técnicas

### Arquitectura hexagonal por microfrontend

Cada app sigue la misma estructura en `src/modules/<módulo>/`:

```
domain/
  entities/        # tipos de negocio (Pokemon, VisitedPokemon, User...)
  repositories/     # puertos (interfaces) — el contrato, sin implementación
application/
  <Algo>UseCase.ts  # una clase por caso de uso, recibe el puerto por constructor
  <modulo>.factory.ts  # instancia repos + casos de uso (composition root del módulo)
infrastructure/
  repositories/     # adaptadores: implementan los puertos (fetch a PokeAPI, Zustand, localStorage)
presentation/
  pages/ components/ hooks/ store/  # React puro, solo habla con application/ vía factory
```

La capa de presentación nunca importa `infrastructure` directamente — siempre pasa por un caso de uso de `application`. Esto es lo que permite, por ejemplo, que `Detail.tsx` no sepa si los datos vienen de `fetch`, de una caché de React Query o de un mock en tests.

### Estrategia de historial de visitados

El historial vive en un store de Zustand con `persist` (`localStorage`, clave `pokemon-visited-history`), con esta forma:

```ts
{
  id: number;
  name: string;
  image: string;
  visits: number;
}
```

`RegisterVisitUseCase` (en `detail`) se ejecuta una vez por cada Pokémon visitado: busca si ya existe por `id` (evita duplicados), si existe incrementa `visits` y lo mueve al frente de la lista (más reciente primero), si no existe lo agrega con `visits: 1`. Un `useRef` en `Detail.tsx` evita registrar dos veces la misma visita en re-renders del mismo `pokemonId`.

**Por qué Zustand duplicado en `detail` y `history` y no un store compartido:** son dos bundles de Module Federation independientes, cada uno con su propia instancia en memoria — no pueden importarse el código de store entre sí sin acoplar su ciclo de vida de despliegue. Ambos comparten la misma clave de `localStorage`, así que la persistencia es consistente, pero la sincronización *en memoria* dentro de la misma sesión del navegador se resuelve con un `CustomEvent` (`pokemon:history-updated`) disparado sobre `window` cada vez que se registra una visita; el otro store, al escucharlo, vuelve a hidratarse desde `localStorage` (`persist.rehydrate()`). Esto evita el bug típico de "el historial no se actualiza hasta recargar", porque ambos MFs comparten el mismo `window`/`document` aunque sean bundles distintos.

`history` expone la lectura del historial vía `useSyncExternalStore` sobre el puerto del dominio (`HistoryRepository.subscribe`/`getHistory`), no sobre el hook de Zustand directamente — así la presentación no depende de la librería de estado concreta.

### Toast del último Pokémon visitado

`useLastVisitedToast` (en `host`) lee el primer elemento del historial persistido al montar el componente (no es reactivo a cambios en caliente, a propósito: el requisito es mostrar el toast *al recargar*). Si el usuario lo cierra, se guarda el `id` descartado en `localStorage` (`pokemon-visited-toast-dismissed-id`); el toast no vuelve a aparecer para ese Pokémon hasta que haya una visita nueva (un `id` distinto al descartado).

### Tema claro/oscuro

Los tokens de color están definidos como variables CSS dentro de `@theme` en `host/src/index.css` (paleta oscura, valores por defecto) con un bloque `:root[data-theme="light"]` que sobreescribe esas mismas variables para el modo claro. `useThemeStore` (Zustand, persistido) alterna el atributo `data-theme` en `document.documentElement`. Como `detail` y `history` no definen sus propias variables de color (solo `@import "tailwindcss"`), heredan automáticamente la paleta activa del documento sin necesidad de sincronizar el tema entre microfrontends.

### Manejo de errores de microfrontends caídos

`PokemonDetailPage` y `HistoryPage` en `host` envuelven sus `import()` remotos en un `RemoteErrorBoundary`: si `detail` (3001) o `history` (3002) no están corriendo, se muestra un mensaje en vez de una pantalla en blanco.

## Estructura del repositorio

```
host/        # Shell — login, home, navegación, buscador, tema, toast
detail/      # Microfrontend 1 — detalle de Pokémon
history/     # Microfrontend 2 — historial de visitados
RETO.md      # Especificación original del reto
DESIGN.md    # Sistema de diseño (tokens de color, tipografía, spacing)
```

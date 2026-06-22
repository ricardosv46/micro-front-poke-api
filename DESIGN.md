---
name: Kinetic Dex
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#e4beba'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#ab8986'
  outline-variant: '#5b403e'
  surface-tint: '#ffb3ad'
  primary: '#ffb3ad'
  on-primary: '#68000a'
  primary-container: '#ff5451'
  on-primary-container: '#5c0008'
  inverse-primary: '#b91a24'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#69d8d4'
  on-tertiary: '#003736'
  tertiary-container: '#24a09d'
  on-tertiary-container: '#00302e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#930013'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#87f4f0'
  tertiary-fixed-dim: '#69d8d4'
  on-tertiary-fixed: '#00201f'
  on-tertiary-fixed-variant: '#00504e'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  stats-num:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-margin: 16px
  gutter: 12px
  touch-target-min: 44px
  card-padding: 16px
---

## Brand & Style
The design system focuses on a high-energy, mobile-first experience for monster collection and data visualization. The brand personality is modern, technical, and data-rich, yet highly accessible. It employs a **Corporate / Modern** style with a digital-first edge, utilizing high-contrast accents to drive engagement.

The aesthetic prioritizes clarity and immediate recognition of status and types. It utilizes deep layering and vibrant accents to create a sense of depth and "tech-noir" sophistication in dark mode, while maintaining a clean, institutional feel in light mode.

## Colors
The color palette is built around a "Crimson Core" primary color used for critical actions and brand markers. The system uses a tiered surface approach:
- **Primary (Accent):** Crimson (#ef4444) for primary CTAs and active states.
- **Surface Hierarchy:** In dark mode, the background uses a deep navy to reduce eye strain, while cards use a lighter slate to provide elevation.
- **Type Semantic Colors:** Specific hex values are reserved for Pokémon type categorization to ensure instant pattern recognition. These must maintain a minimum 4.5:1 contrast ratio against their respective surface backgrounds.

## Typography
This design system utilizes **Inter** exclusively to lean into a functional, systematic aesthetic.
- **Scale:** High contrast between headlines and body text helps establish clear content hierarchy on small screens.
- **Weight:** Heavy weights (700-800) are used for names and numbers to ensure they pop against dark surfaces.
- **Numbers:** Tabular figures (`tnum`) should be enabled for stat comparisons to ensure alignment in list views.

## Layout & Spacing
The system follows a **Fluid Grid** model optimized for narrow viewports (375px - 428px).
- **Mobile Grid:** 4-column layout with 16px side margins and 12px gutters.
- **Desktop Grid:** 12-column centered layout with a max-width of 1200px.
- **Touch Targets:** All interactive elements (buttons, nav items) must maintain a minimum hit area of 44x44px, regardless of their visual size, to ensure high usability during one-handed mobile operation.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and subtle **Ambient Shadows**.
- **Base Level (0):** Page background (#0f172a dark / #ffffff light).
- **Surface Level (1):** Cards and content containers (#1e293b dark / #f1f5f9 light). These use a soft 10% opacity black shadow with a 12px blur to separate from the background.
- **Overlay Level (2):** Modals, bottom sheets, and the bottom navigation bar. These use a more pronounced 20% shadow and a slight 1px border (#ffffff10 in dark mode) to define edges against same-colored surfaces.

## Shapes
The design system employs a **Rounded** shape language to feel approachable and modern.
- **Standard Radius:** 12px for standard cards and input fields.
- **Large Radius:** 16px for primary buttons and main content containers.
- **Interactive Elements:** Use full pill-shaping (rounded-full) only for status tags (types) and search bars.

## Components
- **Buttons:** Primary buttons use the Crimson accent with white text. Ghost buttons use a 1px border of the accent color. All buttons must have a 400ms transition on hover/active states.
- **Cards:** Pokémon cards should feature a subtle gradient background corresponding to the creature's primary type (at 10% opacity) to provide visual variety without breaking the dark/light mode surface logic.
- **Bottom Navigation:** Fixed to the bottom of the viewport. Icons use a 24px size with "Label-sm" text. The active state is indicated by a Crimson color shift and a subtle 4px top-indicator bar.
- **Chips/Type Tags:** Small, high-contrast pills using the defined "Type Semantic Colors." Text within these tags should always be white or high-contrast black depending on the background brightness.
- **Stats Bars:** Use a horizontal progress bar format. The background of the bar is a desaturated version of the surface color, while the fill uses a color-coded logic (Red for low, Yellow for mid, Green for high).
- **Input Fields:** Search bars should be pill-shaped with a glass-like blur effect when scrolled over content.

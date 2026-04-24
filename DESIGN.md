# Design Brief

## Direction

Дониёр Портфел — Futuristic neon developer portfolio showcasing a 12-year-old Uzbek programmer with world-class visual impact and technical aesthetic.

## Tone

Maximalist neon-punk with precision: bold cyan/purple/lime/pink glows dominate, backed by disciplined dark charcoal spacing and glassmorphism restraint.

## Differentiation

Animated neon borders pulse around card sections with dual-layer glow shadows; gradient text on headings creates depth while glassy overlays maintain readability.

## Color Palette

| Token      | OKLCH             | Role                              |
| ---------- | ----------------- | --------------------------------- |
| background | 0.08 0 0          | Near-black charcoal base          |
| foreground | 0.96 0 0          | Near-white text, high contrast    |
| card       | 0.12 0 0          | Slightly raised glass layers      |
| primary    | 0.65 0.21 200     | Cyan — primary interactive glow   |
| secondary  | 0.58 0.19 270     | Purple — depth & secondary accent |
| accent     | 0.75 0.22 128     | Lime — bright spark highlights    |
| destructive| 0.60 0.23 9       | Hot pink — active/interactive     |
| muted      | 0.18 0 0          | Dark grey for muted states        |

## Typography

- Display: Space Grotesk — bold geometric tech headings, 700 weight
- Body: DM Sans — clean readable body copy, 400 weight
- Scale: Hero `text-5xl font-display`, h2 `text-3xl`, label `text-sm`, body `text-base`

## Elevation & Depth

Four-layer depth: background base, card hover with glass glow, interactive elements with dual neon box-shadows, text with gradient fills for foreground pop.

## Structural Zones

| Zone    | Background           | Border                         | Notes                                          |
| ------- | -------------------- | ------------------------------ | ---------------------------------------------- |
| Header  | glassmorphic overlay | cyan glow + purple accent      | Semi-transparent, nav links with hover glow    |
| Content | charcoal + sections  | animated neon pulse borders    | Alternating card backgrounds for rhythm        |
| Footer  | muted dark (0.12)    | lime accent top border         | Contact form with pink input glow              |

## Spacing & Rhythm

6px baseline grid: sections use `gap-8` (64px), card stacks use `gap-6`, micro-spacing at `p-4` (24px); section separators at `my-12`.

## Component Patterns

- Buttons: rounded-lg, primary cyan glow on hover, purple on secondary; transitions smooth 300ms
- Cards: glassmorphic base (backdrop-blur-md, bg-opacity-60), neon-border-animated keyframe pulse, shadow-glass-glow
- Badges: lime accent text on dark, no background; pink for active states

## Motion

- Entrance: fade-in + scale-up 400ms, staggered card reveals
- Hover: neon glow intensify 200ms, 2px lift via transform
- Decorative: pulse-neon (2s), float (3s), neon-flicker on borders (2s)

## Constraints

- Always render dark mode; light mode forbidden
- Neon glows capped at 20px blur + 40px spread; no overshadowing
- Gradient text only on h1/display headings; never body copy
- All interactive glows must use OKLCH tokens, never hex literals

## Signature Detail

Animated dual-color neon borders with 3-second pulse cycle around glass cards — the signature effect that makes every section feel "alive" and unmistakably futuristic.

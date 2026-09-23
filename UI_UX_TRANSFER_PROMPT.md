# TerraLabs Industries — UI/UX Transfer Prompt

Copy everything below the divider into the AI coding assistant working in your
other application's repo. It is written as a self-contained brief: brand,
design tokens, component recipes, motion rules, and a step-by-step method for
reskinning an existing app without breaking its logic. Nothing here assumes
the other app runs Next.js or Tailwind — stack-specific notes are called out
where they matter.

This was reverse-engineered directly from the TerraLabs Industries production
site (Next.js 15 + Tailwind v4 + shadcn/ui + Radix, source at
`src/site/App.tsx` and `src/styles/globals.css` in the `TERRALABS-WEB` repo),
not from a style guide, so every value is a real one already in production.

---

## PROMPT START

You are restyling an existing application to match the **TerraLabs
Industries** visual identity. Your job is a reskin, not a rewrite: keep the
app's existing routes, data, business logic, component boundaries, and
accessibility behavior intact. Change only the visual layer — colors,
typography, spacing, motion, and chrome (nav/buttons/cards/badges) — so the
app *looks and feels* like the reference below.

### 1. Brand identity

- **Company**: TerraLabs Industries (short name "TerraLabs"). Wordmark is
  rendered in caps: "TERRALABS INDUSTRIES".
- **Tagline**: "Intelligence for Earth and Beyond."
- **Positioning**: a global R&D institution building intelligent systems
  across finance, mobility, infrastructure, and human-coordination networks —
  not a single product. Copy voice is technical, confident, precise, no
  hype-adjectives, no exclamation marks. Sentences state capability and
  mechanism ("built on a non-linear machine-learning pipeline...") rather than
  marketing fluff.
- **Tone for UI copy/microcopy**: uppercase labels for eyebrow text and button
  text (e.g. "INTRODUCING", "ACCESS ENGINE & ONBOARD", "VIEW PERFORMANCE",
  "GOLD LIVE"), sentence case for body copy and headings.
- Do not invent new product names or claims when reskinning — if the target
  app has its own product names, keep them; only the visual system transfers.

### 2. Color system

Base mode is **dark**. The whole app sits on a near-black cosmic background,
never pure white.

**Background**
```
background: linear-gradient(135deg, #0A0A0A 0%, #111111 40%, #0F0F0F 100%);
color: #FFFFFF;
```

**Brand accent (primary — use for CTAs, active states, key highlights)**
| Token | Hex | Use |
|---|---|---|
| Brand start | `#FF5C39` | gradient start, primary buttons, active nav, focus glow |
| Brand end | `#FF3D1A` | gradient end, hover-intensified state |
| Brand light | `#FF7C5A` / `#FF8C39` / `#FFB039` | tints for secondary highlights, icon accents |

Primary gradient used everywhere an accent is needed:
`linear-gradient(to right, #FF5C39, #FF3D1A)` (also used vertically/diagonally
in card fills at low opacity, e.g. `rgba(255, 92, 57, 0.1–0.3)` for glass
tints and `rgba(255, 92, 57, 0.5–0.85)` for glows/shadows).

**Secondary accents (status- and context-driven, not decorative)**
| Token | Hex | Meaning |
|---|---|---|
| Gold/bronze | `#C8A44B`, `#B8941F` | premium tier, leadership/board content, "prestige" moments |
| Neon green | `#9CFF2E` | selected/active choice, positive emphasis |
| Success green | `#40D174`, `#2DB865` | profit, gains, "good" metrics |
| Danger red | `#FF4444` | loss, negative metrics, destructive actions |
| Info blue | `#2A56F2`, `#0A84FF`, `#007AFF`, `#60A5FA` | secondary CTAs, informational badges, links |
| Neutral/muted | `rgba(120,120,120,0.25–0.3)` | disabled / discontinued / coming-soon states |

**Rule**: color is meaningful, not decorative. An element's border/glow color
should encode its state (active = brand orange, selected = neon green,
premium = gold, disabled/retired = grey, gain = green, loss = red). When
reskinning an existing app, map its existing semantic colors (success, error,
warning, info, disabled) onto this table rather than picking new colors ad
hoc.

**Neutral / glass tokens**
| Token | Value | Use |
|---|---|---|
| Panel fill | `rgba(255,255,255,0.02–0.05)` | card/panel background over the dark base |
| Panel border | `rgba(255,255,255,0.08–0.1)` | default card/nav border |
| Text primary | `#FFFFFF` | headings, primary copy |
| Text muted | `rgba(255,255,255,0.6–0.85)` | secondary copy, captions |

If the target app has a light mode, keep the dark system as primary; do not
attempt to invert it unless explicitly asked — this identity is designed
dark-first (canvas particle backgrounds, glow effects, and glass blur all
assume a black base).

### 3. Typography

- **Display/heading font**: `'Space Grotesk'` (weights 300–700), fallback
  `'Inter', sans-serif`. Load via Google Fonts:
  `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=block`.
- **Body font**: same stack — `'Space Grotesk', 'Inter', -apple-system,
  BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`. There is no separate
  serif or slab font anywhere in the system.
- **Heading scale** (relative, `font-weight: 500` / "medium", `line-height:
  1.5`):
  - h1 → largest, `letter-spacing: 0.02em`
  - h2 → `letter-spacing: 0.015em`
  - h3 → `letter-spacing: 0.01em`
  - h4 → base size, no extra tracking
- **Eyebrow/label text** (e.g. "INTRODUCING", section kickers, badges):
  uppercase, `letter-spacing: 0.15–0.2em`, often the brand gradient applied
  as text (`background-clip: text` + `color: transparent`), `font-weight:
  700–800`.
- **Buttons and labels**: `font-weight: 500`, `line-height: 1.5`.
- Base root font size is `16px`; scale with `clamp()` for hero-scale type
  (e.g. `clamp(0.65rem, 1.1vw, 0.8rem)` for small badges) rather than fixed
  breakpoint jumps.

### 4. Spacing, radius, elevation

- **Corner radius scale**: `6px` (chips/small pills) · `8–10px` (inputs,
  small buttons) · `12px` (standard cards, panels) · `16px` (feature cards,
  pricing cards) · `9999px` (fully pill-shaped buttons/badges).
- **Borders**: hairline `1px`, occasionally `2px` on interactive/selected
  cards, color drawn from the semantic table above at 20–40% opacity for
  rest state and higher for active/hover.
- **Shadows/glows**: elevation is expressed as colored glow, not grey drop
  shadow:
  ```
  box-shadow: 0 0 20px rgba(255, 92, 57, 0.5);          /* accent glow, small */
  box-shadow: 0 8px 32px rgba(255, 92, 57, 0.85),
              inset 0 1px 1px rgba(255, 255, 255, 0.3);  /* active nav pill */
  box-shadow: 0 0 60px rgba(200, 164, 75, 0.6),
              0 0 120px rgba(10, 132, 255, 0.3),
              inset 0 0 60px rgba(255, 255, 255, 0.1);   /* hero orb glow */
  ```
- **Glassmorphism recipe** (used for the nav bar, floating panels, dashboards):
  ```
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(80px) saturate(200%);
  -webkit-backdrop-filter: blur(80px) saturate(200%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 1px 0 0 rgba(255,255,255,0.08) inset,
              0 4px 30px rgba(0,0,0,0.3);
  ```
  Smaller/inline panels use a lighter blur (`blur(20–40px)`) and lower-opacity
  fills (`rgba(255,255,255,0.02–0.05)`).

### 5. Signature background motif — living particle field

The site's most distinctive visual signature is an animated canvas behind
hero/section content: a soft glowing "orb" at center with drifting star,
ember, and nebula-dust particles (types: star / energy / ember / cosmic /
nebula / dust / distant), each with its own opacity twinkle, velocity, and
parallax depth relative to scroll and mouse position.

If the target app is expected to carry this same atmosphere, implement it as:
- A `<canvas>` absolutely positioned behind content, `pointer-events: none`.
- A particle system seeded relative to viewport area (e.g.
  `Math.min(150, (w*h)/10000)` stars, similarly scaled ember/dust counts) so
  density adapts to screen size rather than being fixed.
- Slow independent drift/float keyframes per particle type (12–20s ease-in-out
  loops), plus a fade-in choreography on mount (`opacity: 0 → 0.8–1` over
  ~1.5s).
- **Two required guards**: skip/disable the canvas on `deviceMemory <= 2` or
  small-viewport Android Chrome (`checkDeviceCapability`), and honor
  `prefers-reduced-motion: reduce` by disabling motion, not just slowing it.
- Keep this behind everything else via low z-index and a solid dark
  background underneath so text always has sufficient contrast on top.

If the target app doesn't need a literal particle canvas, the important
transferable rule is: **the dark background is not flat** — it should carry
at least a subtle radial/diagonal gradient and, ideally, soft ambient glow
shapes, not a solid `#000`.

### 6. Navigation pattern

- **Fixed, full-bleed, glass** top bar (see recipe in §4), `min-height: 90px`,
  logo flush left, nav items centered.
- **Active-item indicator is a sliding "blob"**: a pill-shaped background
  measured against the active button's `getBoundingClientRect()` and
  animated (`left`/`width`/`opacity` transition) to slide beneath whichever
  nav item is active — recompute on route/section change and on window
  resize.
- **Hover state** on inactive items: tint toward the brand color
  (`rgba(255,92,57,0.2)` background, slight `translateY(-1px)` lift).
- **Active item hover**: intensify to solid brand gradient with a stronger
  glow and slight scale (`scale(1.02)`).
- **Mobile** (`< 768px`): collapse to a hamburger (`Menu`/`X` icon toggle)
  opening a full nav list; same active/hover rules apply per item.
- Nav items pair a small icon (16px, `lucide-react` icon set) with a text
  label — icon-and-label, not icon-only, at every breakpoint down to mobile.

### 7. Component recipes

**Buttons** — three tiers, no more:
- *Primary* (`btn-primary`): filled with the brand gradient, white text,
  bold, often paired with a trailing arrow glyph (`→`). One per section max
  — this is the single action you want taken.
- *Secondary/tertiary* (`btn-tertiary` / outline): transparent or
  low-opacity fill, brand-colored border or text, no glow at rest, gains a
  subtle brand tint on hover. Used for "view more / learn more" style actions
  alongside a primary button.
- *Pill CTAs* in hero/marketing contexts are fully rounded (`border-radius:
  9999px`), uppercase label, `font-weight: 700+`.
- Buttons never rely on color alone — always carry a text label; icons are
  supplementary.

**Badges / status pills**: small (`border-radius: 6–12px` or full pill),
colored background at 10–25% opacity of the semantic color, border at
30–50% opacity of the same color, label in the solid semantic color,
uppercase, letter-spacing ~0.08em. Used for things like "Back Tested
Results", "Coming Soon", "XAUUSD • H1 • Every Tick", period badges. Add a
`badge-glow` pseudo-layer for emphasis badges (soft blurred glow behind the
pill).

**Cards / panels**: glass fill (`rgba(255,255,255,0.02–0.05)` background,
`1px` hairline border), `12–16px` radius. Status/category is communicated
through the *border color and a subtle background gradient tint*, e.g. an
active/available item gets an orange-tinted border and gradient
(`linear-gradient(135deg, rgba(255,92,57,0.1) 0%, rgba(10,132,255,0.05)
100%)`); a disabled/discontinued item gets the same shape desaturated to grey
(`rgba(120,120,120,0.25)` border, `rgba(120,120,120,0.08)` fill). This
"same shape, recolored by state" pattern is the core reusable idiom — apply
it to plan/pricing cards, product/engine cards, and dashboard tiles alike.

**Live/animated data widgets**: where the source app has real-time or
frequently-changing numbers (prices, KPIs, stats), give them a "live" tell —
a small pulsing dot (`live-dot`) plus an uppercase "LIVE" label, and animate
value changes rather than snapping (numbers can restyle color momentarily,
e.g. green flash on increase, red on decrease). Poll/refresh on a multi-second
interval (5–6s in the reference, not sub-second) — deliberately calm, not
jittery.

**Timelines / roadmaps**: vertical or horizontal stepped layout, each node a
small circle/dot connected by a line, brand-orange for completed/current
steps, muted grey for future steps.

### 8. Motion rules

- **Scroll reveal**: elements fade + rise on first entering the viewport —
  `opacity: 0 → 1`, `transform: translateY(20px) → translateY(0)`,
  `transition: opacity 0.6s ease, transform 0.6s ease`, triggered once via
  `IntersectionObserver` (`threshold: 0.1`), not on every scroll pass.
- **Staggered entrance**: within a hero or section, stagger children by
  ~0.2s increments (badge → title → subtitle → metrics → actions) rather than
  animating everything at once.
- **Hover micro-interactions**: `translateY(-1px)` to `-2px` lift plus a
  glow-intensity increase; avoid large scale jumps except on already-active
  elements (max `scale(1.02–1.05)`).
- **Global rule**: respect `prefers-reduced-motion: reduce` everywhere motion
  is added — this is a hard requirement, not optional polish.
- `scroll-behavior: smooth` at the document level for anchor-link navigation.

### 9. Layout architecture (reference structure)

The reference is a **single-page app with anchor-scrolled sections** behind
one persistent nav, in this order: `Home (hero)` → `Engines/Products` →
`Features` → `Performance/Proof` → `Research` → `Pricing` → `Partners` →
`Board of Directors` → `Roadmap` → `Contact` → `Legal` (footer-level).
Each section is full-bleed with an inner `max-width: 1280px` container and
`px: 40px` gutters, sections overlap slightly via negative top margin for
visual continuity rather than hard-stacking with large gaps.

Do not force this exact single-page structure onto the target app if it
already uses real routes — the *transferable* part is the section rhythm
(hero → proof/credibility → offering → social proof → pricing → contact),
the consistent max-width container, and the nav-to-section mapping pattern
(highlighting the current section/route in the nav), not the anchor-scroll
mechanism itself.

### 10. Responsive & accessibility baseline

- Mobile breakpoint: `768px` (below = mobile layout, hamburger nav).
- Maintain WCAG-reasonable contrast: body text stays near-white
  (`rgba(255,255,255,0.85)+`) on the dark base; never drop muted text below
  ~`rgba(255,255,255,0.6)`.
- Every interactive element keeps a visible focus state (don't strip
  `outline` without replacing it — the reference uses a ring/glow in the
  brand or semantic color).
- Respect `prefers-reduced-motion` (see §8) and avoid canvas/particle effects
  on constrained devices (see §5 device guard).

### 11. How to execute this reskin

1. **Audit first**: map the target app's existing screens/components to the
   closest analog above (its primary buttons → primary button recipe, its
   status chips → badge recipe, its cards → glass-card recipe, etc.) before
   touching code. Do not delete functionality to make this mapping easier.
2. **Land tokens once, centrally**: add the color, radius, shadow, and font
   values as CSS custom properties / theme tokens in whatever central
   place the app already uses (Tailwind config, a theme file, CSS variables
   in a root stylesheet, a design-tokens module) — don't hardcode hex values
   inline across components.
3. **Swap chrome before content**: restyle nav, buttons, cards, and
   typography scale first; this alone gets most of the way to "looks like
   TerraLabs" without touching business logic or copy.
4. **Add motion last**: layer in scroll-reveal and hover micro-interactions
   once static styling is correct, gated behind `prefers-reduced-motion`.
5. **Optional atmosphere pass**: only add the particle-canvas background
   (§5) if the target app's performance budget and audience allow it — it is
   the least essential, most expensive piece of the identity. Everything
   else (color, type, glass, motion, button/card recipes) carries the brand
   on its own.
6. Keep all existing copy, data, and product names from the target app
   unless told otherwise — this is a visual-identity transfer, not a content
   rewrite.

## PROMPT END

---

### Notes for whoever runs this (not part of the pasted prompt)

- If your other app is **not React/Tailwind**, the AI assistant there should
  translate the token values and recipes above into whatever the app already
  uses (plain CSS variables, styled-components, Vue SFC `<style>`, native
  mobile styling, etc.) — nothing here is React-specific except the
  `IntersectionObserver`/canvas implementation notes in §5 and §8, which are
  illustrative, not prescriptive.
- If you tell me the other app's stack and its current screen list, I can
  tighten §9's mapping and give literal component code instead of recipes.
- Source of truth for every value above: `src/site/App.tsx`,
  `src/site/components/NavigationBar.tsx`, `LivingOrbBackground.tsx`,
  `TradingDashboard.tsx`, `PricingSectionClean.tsx`, `RoadMap.tsx`, and
  `src/styles/globals.css` in this repo.

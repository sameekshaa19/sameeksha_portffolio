# Sameeksha Portfolio Design Specification (v1)

> **Scope:** Pages 1 and 2 only.

## Vision

Build a premium, editorial-style portfolio for a Computer Science &
Design undergraduate. The experience should communicate:

-   Technical
-   Modern
-   Minimal
-   AI/Product oriented
-   Smooth and polished

**Not** a UI/UX portfolio. **Not** a hacker aesthetic. **Not** a
template.

------------------------------------------------------------------------

# Site Structure

1.  Page 1 -- Landing
2.  Page 2 -- About Me
3.  Page 3 -- Experience
4.  Page 4 -- Projects
5.  Page 5 -- Let's Build Something Together

Each page occupies approximately 100vh with seamless scroll transitions.

------------------------------------------------------------------------

# Design Language

-   Editorial layout
-   Large typography
-   Plenty of whitespace
-   Subtle interactions (90%)
-   Interactive touches (10%)

Libraries: - React - Motion (motion.dev) - ReactBits - Lenis (smooth
scrolling)

Fonts: - Headings: Space Grotesk - Body: Geist - Code: IBM Plex Mono

------------------------------------------------------------------------

# Color Palette

``` css
--bg-primary:#F8F8F5;
--bg-secondary:#F2F2EE;
--surface:#FFFFFF;

--text-primary:#111111;
--text-secondary:#555555;
--text-muted:#888888;

--border:#DDDDDD;

--accent:#3F6B4D;
--accent-blue:#4A90E2;
--accent-yellow:#D8A31A;
```

Use the green accent sparingly.

------------------------------------------------------------------------

# Page 1 --- Landing

## Layout

Left column (\~55%) - HEY THERE. - I'm Sameeksha S. - Computer Science &
Design Undergraduate - Rotating subtitle: - Full Stack Developer - AI/ML
Enthusiast - Creative Thinker - Product Builder - Scroll indicator

Right column (\~45%) - Avatar - Eyes subtly follow cursor - Gentle
breathing animation - Tiny head tilt - Soft dynamic shadow

## Background

Use a subtle perspective/grid style background from ReactBits. Opacity
should remain low so typography is dominant.

## Motion

Initial load: 1. Navbar fades in. 2. Heading slides upward. 3. Subtitle
fades. 4. Avatar fades + scales from 0.96 to 1. 5. Scroll indicator
begins floating.

Transitions: - Use spring easing. - Keep all animations below \~900ms.

Navbar: - Glass effect. - Hamburger menu. - Motion stagger for menu
items.

------------------------------------------------------------------------

# Page 2 --- About Me

Goal: Explain who you are without long paragraphs.

## Background

Use ReactBits FaultyTerminal as a background layer only.

Suggested tuning:

``` jsx
<FaultyTerminal
 scale={1.2}
 gridMul={[2,1]}
 digitSize={1.1}
 timeScale={0.25}
 scanlineIntensity={0.15}
 glitchAmount={0.05}
 flickerAmount={0.08}
 noiseAmp={0.1}
 chromaticAberration={0}
 dither={0}
 curvature={0.05}
 tint="#3F6B4D"
 brightness={0.12}
 mouseReact={false}
/>
```

## Layout

Large "ABOUT ME" heading.

Left: Short introduction.

Right: Information cards: - Education - Current Focus - Current
Internship - Tech Stack

Below: Quick statistic cards.

## Animation sequence

1.  Background fades in.
2.  Divider grows horizontally.
3.  Heading slides upward.
4.  Body reveals using word stagger.
5.  Cards reveal one-by-one (80ms stagger).
6.  Stats cards slide upward.

Avoid typing animations.

------------------------------------------------------------------------

# Scroll Transition (Page 1 → Page 2)

Avatar scales to 0.9.

Heading compresses.

Perspective grid fades.

FaultyTerminal fades in underneath.

About heading rises into view.

Transition should feel continuous rather than like a page change.

------------------------------------------------------------------------

# Interaction Rules

-   Hover effects should be subtle.
-   No excessive parallax.
-   Avoid flashy neon effects.
-   Prioritize readability.

------------------------------------------------------------------------

# Accessibility

-   Minimum AA contrast.
-   Respect prefers-reduced-motion.
-   Keyboard accessible navigation.
-   Visible focus states.

------------------------------------------------------------------------

# Performance

-   Lazy-load heavy assets.
-   Optimize avatar image.
-   GPU-friendly transforms.
-   Avoid layout thrashing.

------------------------------------------------------------------------

# Next Steps

After Pages 1 & 2 are implemented:

-   Page 3: Experience timeline
-   Page 4: Project showcase
-   Page 5: Let's Build Something Together

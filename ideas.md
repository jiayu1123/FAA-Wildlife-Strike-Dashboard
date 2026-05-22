# FAA Wildlife Strike Dashboard — Design Ideas

<response>
<idea>
**Design Movement:** Scientific Data Journalism (inspired by The Pudding / NYT Graphics)

**Core Principles:**
- Data is the hero: every visual element serves comprehension, not decoration
- Editorial clarity: generous whitespace, strong typographic hierarchy
- Restrained color: one accent color (amber-orange) against near-white, with dark charcoal text
- Scrollytelling feel: sections reveal themselves with subtle entrance animations

**Color Philosophy:**
- Background: warm off-white (#FAFAF7) to feel like printed paper
- Accent: deep amber (#D97706) — evokes aviation warning lights
- Text: near-black charcoal (#1C1917)
- Chart fills: amber gradient + slate gray for contrast

**Layout Paradigm:**
- Left-anchored sidebar with sticky stat cards
- Main content area: full-width charts stacked vertically
- Asymmetric grid: 30% sidebar / 70% chart area on desktop

**Signature Elements:**
- Thin horizontal rule dividers between sections
- Monospaced numbers in stat cards (tabular figures)
- Subtle dot-grid background texture on header

**Interaction Philosophy:**
- Hover tooltips with precise values and contextual notes
- Smooth D3 transitions on data load (stagger 40ms per bar)
- Filter chips that animate in/out with scale+fade

**Animation:**
- Chart bars grow from y=0 with ease-out (300ms, staggered)
- Line chart draws itself left-to-right (600ms)
- Stat numbers count up on first render

**Typography System:**
- Display: "Playfair Display" — for section titles, bold editorial weight
- Body/Labels: "IBM Plex Mono" — monospaced for data labels and axis ticks
- UI: "Inter" — for buttons, filters, navigation only
</idea>
<probability>0.08</probability>
</response>

<response>
<idea>
**Design Movement:** Aviation Technical Manual / Blueprint Aesthetic

**Core Principles:**
- Dark navy background evoking cockpit instruments and night sky
- Cyan/teal accent palette inspired by radar screens and flight displays
- Grid-based layout with precise alignment, like engineering schematics
- High information density with clear visual hierarchy

**Color Philosophy:**
- Background: deep navy (#0A1628)
- Surface: slightly lighter navy (#0F2040)
- Accent: electric cyan (#06B6D4) + lime green (#84CC16) for alerts
- Text: near-white (#E2E8F0) with muted slate for secondary

**Layout Paradigm:**
- Full-width dark dashboard with top navigation bar
- 2×2 chart grid on main panel, stat row across the top
- Subtle grid lines (1px, 5% opacity) throughout

**Signature Elements:**
- Glowing cyan borders on active/hover chart cards
- Radar-ring decorative element in header background
- Monospaced font for all numeric data

**Interaction Philosophy:**
- Charts glow on hover (box-shadow pulse)
- Filter selection triggers smooth data transition
- Tooltip styled as instrument readout panel

**Animation:**
- Fade-in with slight upward translate on page load (200ms stagger)
- D3 bar chart: bars drop from top (like instrument needles)
- Line chart: animated stroke-dashoffset draw effect

**Typography System:**
- Display: "Space Grotesk" — geometric, technical feel
- Mono data: "JetBrains Mono" — for axis labels and stat values
- Body: "Inter" — clean, readable for descriptions
</idea>
<probability>0.09</probability>
</response>

<response>
<idea>
**Design Movement:** Contemporary Research Dashboard (Clean Academic + Modern SaaS)

**Core Principles:**
- Light, airy interface with strong structural grid
- Slate-blue accent palette — professional, trustworthy, academic
- Cards with soft shadows and subtle borders for depth without heaviness
- Responsive asymmetric layout: sidebar filters + main chart area

**Color Philosophy:**
- Background: cool gray-white (#F8FAFC)
- Card surface: pure white with 1px border + shadow
- Accent: slate-blue (#3B82F6) with indigo highlights
- Chart: multi-hue sequential (blue → teal → green)

**Layout Paradigm:**
- Top header with title + key stats row
- Below: left filter panel (collapsible) + right chart grid
- Charts use card containers with subtle elevation

**Signature Elements:**
- Pill-shaped filter badges
- Animated count-up stats in header
- Thin colored left-border accent on section headings

**Interaction Philosophy:**
- Smooth filter transitions with D3 data join animations
- Hover state: card lifts slightly (translateY -2px + shadow increase)
- Tooltip: clean white card with precise value + percentage

**Animation:**
- Page load: cards fade in with 50ms stagger
- D3 bars: ease-in-out grow from baseline (250ms)
- Donut chart: arc tween on mount

**Typography System:**
- Display: "DM Sans" — friendly but professional
- Data labels: "DM Mono" — consistent with DM family
- Body: "DM Sans" regular — unified type family
</idea>
<probability>0.07</probability>
</response>

## Selected Design: Aviation Technical Manual / Blueprint Aesthetic

Dark navy background, cyan accents, monospaced data labels — evokes the cockpit instrument feel appropriate for aviation data. This makes the dashboard visually distinctive and memorable for a portfolio project.

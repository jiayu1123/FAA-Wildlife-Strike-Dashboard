# FAA Wildlife Strike Dashboard

An interactive data visualization dashboard built with **React** and **D3.js** to explore FAA National Wildlife Strike Database records (2010–2016). This project was developed as part of a portfolio demonstrating skills in front-end development, data visualization, and human-centered interface design.

**Live Demo:** [View on Manus](https://faa-wildlife-strike-viz.manus.space) *(deploy via Manus Publish)*

---

## Overview

Wildlife strikes — collisions between aircraft and birds or other animals — are a significant aviation safety concern. This dashboard provides an interactive interface for exploring 73,448 reported incidents, enabling users to identify trends, high-risk states, dangerous flight phases, and the most commonly struck species.

The project demonstrates:

- Custom D3.js chart components integrated into a React application
- Animated data visualizations with entrance transitions and interactive tooltips
- A cohesive dark "aviation blueprint" design system using Space Grotesk and JetBrains Mono typography
- Responsive layout with Tailwind CSS v4

---

## Features

| Chart | Description |
|-------|-------------|
| **Trend Line Chart** | Annual strike count from 2010–2016, with animated stroke draw and hover tooltips |
| **Flight Phase Bar Chart** | Vertical bar chart showing strike distribution across 7 flight phases |
| **Top States Bar Chart** | Horizontal ranked bar chart for the 15 highest-incident US states |
| **Damage Severity Donut** | Animated arc tween donut chart with percentage legend |
| **Top Species List** | Ranked list with proportional bar indicators for the 10 most frequently struck species |
| **Stat Cards** | Count-up animated summary statistics (total incidents, peak year, top state) |

---

## Tech Stack

- **React 19** — component architecture and state management
- **D3.js v7** — custom SVG chart rendering with transitions and scales
- **TypeScript** — type-safe component interfaces
- **Tailwind CSS v4** — utility-first styling with custom design tokens
- **Vite** — fast development build tooling

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/jiayu1123/faa-wildlife-strike-viz.git
cd faa-wildlife-strike-viz

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`.

---

## Data Source

**FAA National Wildlife Strike Database** — publicly available from the Federal Aviation Administration. The dataset used here contains 73,448 records spanning 2010–2016, including fields for incident date, US state, airport, flight phase, aircraft type, species struck, number of birds, damage severity, and repair cost.

- Source: [wildlife.faa.gov](https://wildlife.faa.gov)
- Preprocessed using Python (pandas) for aggregation into JSON format

---

## Project Structure

```
client/
  src/
    components/
      LineChart.tsx      # D3 animated line chart (yearly trend)
      BarChart.tsx       # D3 horizontal bar chart (top states)
      PhaseChart.tsx     # D3 vertical bar chart (flight phases)
      DonutChart.tsx     # D3 animated donut chart (damage severity)
      StatCard.tsx       # Count-up animated stat card
    pages/
      Home.tsx           # Main dashboard layout
    data.json            # Pre-aggregated FAA data (5 views)
```

---

## Design System

The visual design follows an **Aviation Blueprint / Cockpit Instrument** aesthetic:

- **Background:** Deep navy `oklch(0.12 0.04 240)`
- **Accent:** Electric cyan `oklch(0.72 0.18 200)`
- **Typography:** Space Grotesk (UI) + JetBrains Mono (data labels)
- **Motion:** D3 entrance transitions (staggered bars, stroke-draw line, arc tween donut)
- **Interactions:** Hover tooltips, glow card effects, count-up stat animations

---

## Author

**Jiayu Zou** — BS Computer Science & Business Administration, Northeastern University  
[GitHub](https://github.com/jiayu1123) · [LinkedIn](https://www.linkedin.com/in/jiayu1123) · zou.jiayu@northeastern.edu

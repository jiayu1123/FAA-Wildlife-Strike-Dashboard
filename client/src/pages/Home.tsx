/**
 * Home.tsx — FAA Wildlife Strike Dashboard
 * Design: Aviation Blueprint / Cockpit Instrument
 * - Deep navy background with grid texture
 * - Cyan accent, JetBrains Mono for data, Space Grotesk for UI
 * - D3.js charts: LineChart (trend), BarChart (states), DonutChart (damage), PhaseChart (phase)
 */
import { useEffect, useState } from "react";
import BarChart from "@/components/BarChart";
import DonutChart from "@/components/DonutChart";
import LineChart from "@/components/LineChart";
import PhaseChart from "@/components/PhaseChart";
import StatCard from "@/components/StatCard";
import rawData from "@/data.json";

const DAMAGE_COLORS: Record<string, string> = {
  "None": "oklch(0.60 0.02 220)",
  "Minor": "oklch(0.72 0.18 200)",
  "Minor (Uncertain)": "oklch(0.68 0.16 260)",
  "Substantial": "oklch(0.75 0.18 145)",
  "Destroyed": "oklch(0.65 0.22 25)",
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const totalStrikes = rawData.byYear.reduce((s, d) => s + d.count, 0);
  const peakYear = rawData.byYear.reduce((a, b) => a.count > b.count ? a : b);
  const topState = rawData.byState[0];
  const topSpecies = rawData.bySpecies[0];

  return (
    <div className="min-h-screen grid-bg" style={{ background: "oklch(0.12 0.04 240)" }}>
      {/* Shared D3 Tooltips */}
      <div
        id="line-tooltip"
        style={{
          position: "fixed", pointerEvents: "none", opacity: 0,
          background: "oklch(0.16 0.04 240)", border: "1px solid oklch(0.72 0.18 200 / 30%)",
          borderRadius: "8px", padding: "10px 14px", zIndex: 9999,
          fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.92 0.01 220)",
          fontSize: "13px", transition: "opacity 120ms",
          boxShadow: "0 4px 20px oklch(0 0 0 / 40%)"
        }}
      />
      <div
        id="bar-tooltip"
        style={{
          position: "fixed", pointerEvents: "none", opacity: 0,
          background: "oklch(0.16 0.04 240)", border: "1px solid oklch(0.72 0.18 200 / 30%)",
          borderRadius: "8px", padding: "10px 14px", zIndex: 9999,
          fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.92 0.01 220)",
          fontSize: "13px", transition: "opacity 120ms",
          boxShadow: "0 4px 20px oklch(0 0 0 / 40%)"
        }}
      />
      <div
        id="donut-tooltip"
        style={{
          position: "fixed", pointerEvents: "none", opacity: 0,
          background: "oklch(0.16 0.04 240)", border: "1px solid oklch(0.72 0.18 200 / 30%)",
          borderRadius: "8px", padding: "10px 14px", zIndex: 9999,
          fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.92 0.01 220)",
          fontSize: "13px", transition: "opacity 120ms",
          boxShadow: "0 4px 20px oklch(0 0 0 / 40%)"
        }}
      />
      <div
        id="phase-tooltip"
        style={{
          position: "fixed", pointerEvents: "none", opacity: 0,
          background: "oklch(0.16 0.04 240)", border: "1px solid oklch(0.72 0.18 200 / 30%)",
          borderRadius: "8px", padding: "10px 14px", zIndex: 9999,
          fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.92 0.01 220)",
          fontSize: "13px", transition: "opacity 120ms",
          boxShadow: "0 4px 20px oklch(0 0 0 / 40%)"
        }}
      />

      {/* Header */}
      <header
        className="relative overflow-hidden border-b"
        style={{ borderColor: "oklch(1 0 0 / 8%)", background: "oklch(0.14 0.05 240)" }}
      >
        {/* Decorative radar rings */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          {[120, 90, 60].map((size, i) => (
            <div
              key={i}
              className="radar-ring absolute"
              style={{
                width: size, height: size,
                top: "50%", right: 0,
                transform: `translate(${i * 20}px, -50%)`,
                animationDelay: `${i * 0.8}s`
              }}
            />
          ))}
        </div>

        <div className="container py-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg"
              style={{ background: "oklch(0.72 0.18 200 / 15%)", border: "1px solid oklch(0.72 0.18 200 / 30%)" }}
            >
              ✈
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1
                  className="text-2xl font-bold tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.95 0.01 220)" }}
                >
                  FAA Wildlife Strike Dashboard
                </h1>
                <span
                  className="font-mono-data text-xs px-2 py-0.5 rounded"
                  style={{
                    background: "oklch(0.72 0.18 200 / 12%)",
                    color: "oklch(0.72 0.18 200)",
                    border: "1px solid oklch(0.72 0.18 200 / 25%)"
                  }}
                >
                  2010 – 2016
                </span>
              </div>
              <p className="mt-1 text-sm" style={{ color: "oklch(0.60 0.02 220)" }}>
                Interactive analysis of{" "}
                <span className="font-mono-data" style={{ color: "oklch(0.72 0.18 200)" }}>
                  73,448
                </span>{" "}
                FAA-reported wildlife strike incidents across the United States.
                Built with <span style={{ color: "oklch(0.72 0.18 200)" }}>React</span> +{" "}
                <span style={{ color: "oklch(0.72 0.18 200)" }}>D3.js</span>.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Stat Cards Row */}
        {mounted && (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{ animation: "fadeInUp 400ms ease-out both" }}
          >
            <StatCard label="Total Incidents" value={totalStrikes} accent />
            <StatCard label={`Peak Year (${peakYear.YEAR})`} value={peakYear.count} />
            <StatCard label={`Top State (${topState.STATE})`} value={topState.count} />
            <StatCard label="Species Recorded" value={rawData.bySpecies.length} suffix="+" />
          </div>
        )}

        {/* Row 1: Trend Line + Phase Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Over Time */}
          <div
            className="card-glow rounded-xl border p-5"
            style={{ background: "oklch(0.16 0.04 240)", borderColor: "oklch(1 0 0 / 8%)" }}
          >
            <div className="mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.18 200)" }}>
                Incidents Over Time
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.02 220)" }}>
                Annual strike count, 2010–2016
              </p>
            </div>
            {mounted && <LineChart data={rawData.byYear} />}
          </div>

          {/* Phase of Flight */}
          <div
            className="card-glow rounded-xl border p-5"
            style={{ background: "oklch(0.16 0.04 240)", borderColor: "oklch(1 0 0 / 8%)" }}
          >
            <div className="mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.18 200)" }}>
                Strikes by Flight Phase
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.02 220)" }}>
                Most strikes occur during approach and landing
              </p>
            </div>
            {mounted && <PhaseChart data={rawData.byPhase} />}
          </div>
        </div>

        {/* Row 2: State Bar + Damage Donut + Species List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top States */}
          <div
            className="card-glow rounded-xl border p-5 lg:col-span-1"
            style={{ background: "oklch(0.16 0.04 240)", borderColor: "oklch(1 0 0 / 8%)" }}
          >
            <div className="mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.18 200)" }}>
                Top 15 States
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.02 220)" }}>
                By total incident reports
              </p>
            </div>
            {mounted && <BarChart data={rawData.byState} />}
          </div>

          {/* Damage Breakdown */}
          <div
            className="card-glow rounded-xl border p-5"
            style={{ background: "oklch(0.16 0.04 240)", borderColor: "oklch(1 0 0 / 8%)" }}
          >
            <div className="mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.18 200)" }}>
                Damage Severity
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.02 220)" }}>
                Distribution across reported incidents
              </p>
            </div>
            {mounted && <DonutChart data={rawData.byDamage} />}
            {/* Legend */}
            <div className="mt-4 space-y-1.5">
              {rawData.byDamage.map((d) => {
                const total = rawData.byDamage.reduce((s, x) => s + x.count, 0);
                const pct = ((d.count / total) * 100).toFixed(1);
                return (
                  <div key={d.DAMAGE_LABEL} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                        style={{ background: DAMAGE_COLORS[d.DAMAGE_LABEL] || "oklch(0.60 0.02 220)" }}
                      />
                      <span className="text-xs" style={{ color: "oklch(0.70 0.02 220)" }}>
                        {d.DAMAGE_LABEL}
                      </span>
                    </div>
                    <span className="font-mono-data text-xs" style={{ color: "oklch(0.72 0.18 200)" }}>
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Species */}
          <div
            className="card-glow rounded-xl border p-5"
            style={{ background: "oklch(0.16 0.04 240)", borderColor: "oklch(1 0 0 / 8%)" }}
          >
            <div className="mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.18 200)" }}>
                Top 10 Species
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.02 220)" }}>
                Most frequently struck wildlife
              </p>
            </div>
            <div className="space-y-2">
              {rawData.bySpecies.map((s, i) => {
                const maxCount = rawData.bySpecies[0].count;
                const pct = (s.count / maxCount) * 100;
                return (
                  <div key={s.SPECIES} className="space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="font-mono-data text-xs flex-shrink-0 w-4 text-right"
                          style={{ color: "oklch(0.45 0.02 220)" }}
                        >
                          {i + 1}
                        </span>
                        <span
                          className="text-xs truncate"
                          style={{ color: "oklch(0.80 0.01 220)" }}
                          title={s.SPECIES}
                        >
                          {s.SPECIES}
                        </span>
                      </div>
                      <span
                        className="font-mono-data text-xs flex-shrink-0"
                        style={{ color: "oklch(0.72 0.18 200)" }}
                      >
                        {s.count.toLocaleString()}
                      </span>
                    </div>
                    <div
                      className="ml-6 h-1 rounded-full overflow-hidden"
                      style={{ background: "oklch(1 0 0 / 6%)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: `oklch(${0.55 + i * 0.02} 0.18 ${200 - i * 3})`,
                          transitionDelay: `${i * 60}ms`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="border-t pt-6 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderColor: "oklch(1 0 0 / 8%)" }}
        >
          <div>
            <p className="text-xs" style={{ color: "oklch(0.45 0.02 220)" }}>
              Data source:{" "}
              <a
                href="https://wildlife.faa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: "oklch(0.65 0.15 200)" }}
              >
                FAA National Wildlife Strike Database
              </a>
              {" "}· 73,448 records · 2010–2016
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono-data text-xs" style={{ color: "oklch(0.40 0.02 220)" }}>
              Built with React + D3.js
            </span>
            <a
              href="https://github.com/jiayu1123/faa-wildlife-strike-viz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-data text-xs px-3 py-1 rounded border transition-all duration-150 hover:opacity-80"
              style={{
                color: "oklch(0.72 0.18 200)",
                borderColor: "oklch(0.72 0.18 200 / 30%)",
                background: "oklch(0.72 0.18 200 / 8%)"
              }}
            >
              View on GitHub →
            </a>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

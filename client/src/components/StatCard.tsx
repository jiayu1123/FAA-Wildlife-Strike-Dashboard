/**
 * StatCard.tsx
 * Design: Aviation Blueprint — glowing stat card with count-up animation
 */
import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  accent?: boolean;
}

function useCountUp(target: number, duration = 1200) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCurrent(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return current;
}

export default function StatCard({ label, value, suffix = "", accent = false }: StatCardProps) {
  const display = useCountUp(value);

  return (
    <div
      className={`card-glow rounded-lg border p-4 flex flex-col gap-1 ${
        accent
          ? "border-cyan-500/30 bg-cyan-500/5"
          : "border-white/10 bg-white/3"
      }`}
      style={{ background: accent ? "oklch(0.72 0.18 200 / 5%)" : "oklch(1 0 0 / 2%)" }}
    >
      <span
        className="font-mono-data text-2xl font-semibold leading-none"
        style={{ color: accent ? "oklch(0.72 0.18 200)" : "oklch(0.92 0.01 220)" }}
      >
        {display.toLocaleString()}{suffix}
      </span>
      <span
        className="text-xs uppercase tracking-widest"
        style={{ color: "oklch(0.55 0.02 220)", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

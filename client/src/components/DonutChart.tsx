/**
 * DonutChart.tsx
 * Design: Aviation Blueprint — animated arc tween donut chart
 * Shows damage severity breakdown
 */
import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface DataPoint {
  DAMAGE_LABEL: string;
  count: number;
}

interface DonutChartProps {
  data: DataPoint[];
}

const COLORS = [
  "oklch(0.60 0.02 220)",   // None — muted slate
  "oklch(0.72 0.18 200)",   // Minor — cyan
  "oklch(0.68 0.16 260)",   // Minor (Uncertain) — blue-purple
  "oklch(0.75 0.18 145)",   // Substantial — green
  "oklch(0.65 0.22 25)",    // Destroyed — red-orange
];

export default function DonutChart({ data }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const SIZE = 220;
    const R = SIZE / 2;
    const outerR = R - 10;
    const innerR = outerR * 0.58;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", SIZE).attr("height", SIZE);

    const g = svg.append("g").attr("transform", `translate(${R},${R})`);

    const pie = d3.pie<DataPoint>()
      .value(d => d.count)
      .sort(null)
      .padAngle(0.025);

    const arc = d3.arc<d3.PieArcDatum<DataPoint>>()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .cornerRadius(3);

    const arcHover = d3.arc<d3.PieArcDatum<DataPoint>>()
      .innerRadius(innerR)
      .outerRadius(outerR + 6)
      .cornerRadius(3);

    const arcs = pie(data);

    // Draw arcs with tween animation
    const paths = g.selectAll<SVGPathElement, d3.PieArcDatum<DataPoint>>("path")
      .data(arcs)
      .join("path")
      .attr("fill", (_, i) => COLORS[i % COLORS.length])
      .attr("stroke", "oklch(0.12 0.04 240)")
      .attr("stroke-width", 1);

    paths.transition()
      .duration(700)
      .ease(d3.easeCubicOut)
      .attrTween("d", function (d) {
        const interp = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t) => arc(interp(t)) || "";
      });

    // Center label
    const total = d3.sum(data, d => d.count);
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.2em")
      .attr("fill", "oklch(0.92 0.01 220)")
      .style("font-family", "'JetBrains Mono', monospace")
      .style("font-size", "20px")
      .style("font-weight", "600")
      .text(total.toLocaleString());

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.2em")
      .attr("fill", "oklch(0.55 0.02 220)")
      .style("font-family", "'Space Grotesk', sans-serif")
      .style("font-size", "10px")
      .text("total incidents");

    // Tooltip
    const tooltip = d3.select("body").select<HTMLDivElement>("#donut-tooltip");
    paths
      .on("mouseenter", function (event, d) {
        d3.select(this).transition().duration(150).attr("d", arcHover(d) || "");
        const pct = ((d.data.count / total) * 100).toFixed(1);
        tooltip
          .style("opacity", "1")
          .html(`<span class="text-xs opacity-60">${d.data.DAMAGE_LABEL}</span><br/><span class="font-mono-data text-base font-bold" style="color:oklch(0.72 0.18 200)">${d.data.count.toLocaleString()}</span> <span class="text-xs opacity-60">(${pct}%)</span>`)
          .style("left", `${event.pageX + 12}px`)
          .style("top", `${event.pageY - 36}px`);
      })
      .on("mouseleave", function (_, d) {
        d3.select(this).transition().duration(150).attr("d", arc(d) || "");
        tooltip.style("opacity", "0");
      });

  }, [data]);

  return (
    <div className="flex justify-center">
      <svg ref={svgRef} />
    </div>
  );
}

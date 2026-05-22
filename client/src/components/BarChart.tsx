/**
 * BarChart.tsx
 * Design: Aviation Blueprint — horizontal bar chart with staggered entrance
 * Shows top 15 US states by wildlife strike count
 */
import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface DataPoint {
  STATE: string;
  count: number;
}

interface BarChartProps {
  data: DataPoint[];
}

export default function BarChart({ data }: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const container = svgRef.current.parentElement!;
    const W = container.clientWidth || 500;
    const barH = 28;
    const gap = 6;
    const margin = { top: 8, right: 80, bottom: 8, left: 44 };
    const innerW = W - margin.left - margin.right;
    const innerH = data.length * (barH + gap);
    const H = innerH + margin.top + margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", W).attr("height", H);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)!])
      .range([0, innerW]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.STATE))
      .range([0, innerH])
      .padding(0.2);

    // Color scale: cyan gradient
    const colorScale = d3.scaleSequential()
      .domain([0, data.length - 1])
      .interpolator(d3.interpolate("oklch(0.55 0.16 200)", "oklch(0.75 0.20 170)"));

    // Bars
    g.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("y", d => y(d.STATE)!)
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", 0)
      .attr("fill", (_, i) => colorScale(i))
      .attr("rx", 3)
      .transition()
      .delay((_, i) => i * 40)
      .duration(400)
      .ease(d3.easeCubicOut)
      .attr("width", d => x(d.count));

    // State labels
    g.selectAll(".state-label")
      .data(data)
      .join("text")
      .attr("class", "state-label")
      .attr("x", -6)
      .attr("y", d => y(d.STATE)! + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("fill", "oklch(0.70 0.02 220)")
      .style("font-family", "'JetBrains Mono', monospace")
      .style("font-size", "11px")
      .text(d => d.STATE);

    // Count labels
    g.selectAll(".count-label")
      .data(data)
      .join("text")
      .attr("class", "count-label")
      .attr("x", d => x(d.count) + 6)
      .attr("y", d => y(d.STATE)! + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("fill", "oklch(0.72 0.18 200)")
      .style("font-family", "'JetBrains Mono', monospace")
      .style("font-size", "11px")
      .style("opacity", "0")
      .text(d => d.count.toLocaleString())
      .transition()
      .delay((_, i) => i * 40 + 400)
      .duration(200)
      .style("opacity", "1");

    // Hover effect
    const tooltip = d3.select("body").select<HTMLDivElement>("#bar-tooltip");
    g.selectAll<SVGRectElement, DataPoint>("rect")
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("opacity", 0.8);
        tooltip
          .style("opacity", "1")
          .html(`<span class="font-mono-data text-xs opacity-70">State</span><br/><span class="font-mono-data text-sm font-semibold">${d.STATE}</span><br/><span class="font-mono-data text-base font-bold" style="color:oklch(0.72 0.18 200)">${d.count.toLocaleString()}</span> <span class="text-xs opacity-60">incidents</span>`)
          .style("left", `${event.pageX + 12}px`)
          .style("top", `${event.pageY - 40}px`);
      })
      .on("mouseleave", function () {
        d3.select(this).attr("opacity", 1);
        tooltip.style("opacity", "0");
      });

  }, [data]);

  return <svg ref={svgRef} style={{ width: "100%", display: "block" }} />;
}

/**
 * PhaseChart.tsx
 * Design: Aviation Blueprint — vertical bar chart for flight phase distribution
 */
import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface DataPoint {
  PHASE_NORM: string;
  count: number;
}

interface PhaseChartProps {
  data: DataPoint[];
}

export default function PhaseChart({ data }: PhaseChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const container = svgRef.current.parentElement!;
    const W = container.clientWidth || 460;
    const H = 240;
    const margin = { top: 16, right: 16, bottom: 56, left: 52 };
    const innerW = W - margin.left - margin.right;
    const innerH = H - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", W).attr("height", H);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.PHASE_NORM))
      .range([0, innerW])
      .padding(0.25);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)! * 1.1])
      .range([innerH, 0]);

    // Grid
    g.append("g")
      .call(
        d3.axisLeft(y).ticks(5).tickSize(-innerW).tickFormat(() => "")
      )
      .call(sel => {
        sel.select(".domain").remove();
        sel.selectAll("line")
          .attr("stroke", "oklch(1 0 0 / 6%)")
          .attr("stroke-dasharray", "3,3");
      });

    // Color: gradient from cyan to teal
    const colorScale = d3.scaleSequential()
      .domain([0, data.length - 1])
      .interpolator(d3.interpolate("oklch(0.72 0.18 200)", "oklch(0.65 0.15 170)"));

    // Bars
    g.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.PHASE_NORM)!)
      .attr("width", x.bandwidth())
      .attr("y", innerH)
      .attr("height", 0)
      .attr("fill", (_, i) => colorScale(i))
      .attr("rx", 3)
      .transition()
      .delay((_, i) => i * 60)
      .duration(450)
      .ease(d3.easeCubicOut)
      .attr("y", d => y(d.count))
      .attr("height", d => innerH - y(d.count));

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x))
      .call(sel => {
        sel.select(".domain").attr("stroke", "oklch(1 0 0 / 15%)");
        sel.selectAll("text")
          .attr("fill", "oklch(0.65 0.02 220)")
          .style("font-family", "'JetBrains Mono', monospace")
          .style("font-size", "10px")
          .attr("transform", "rotate(-30)")
          .attr("text-anchor", "end")
          .attr("dx", "-0.4em")
          .attr("dy", "0.6em");
        sel.selectAll("line").attr("stroke", "oklch(1 0 0 / 15%)");
      });

    // Y axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${(+d / 1000).toFixed(0)}k`))
      .call(sel => {
        sel.select(".domain").remove();
        sel.selectAll("text")
          .attr("fill", "oklch(0.65 0.02 220)")
          .style("font-family", "'JetBrains Mono', monospace")
          .style("font-size", "11px");
        sel.selectAll("line").remove();
      });

    // Tooltip
    const tooltip = d3.select("body").select<HTMLDivElement>("#phase-tooltip");
    g.selectAll<SVGRectElement, DataPoint>("rect")
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("opacity", 0.75);
        tooltip
          .style("opacity", "1")
          .html(`<span class="text-xs opacity-60">Phase</span><br/><span class="font-mono-data text-sm font-semibold">${d.PHASE_NORM}</span><br/><span class="font-mono-data text-base font-bold" style="color:oklch(0.72 0.18 200)">${d.count.toLocaleString()}</span> <span class="text-xs opacity-60">strikes</span>`)
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

/**
 * LineChart.tsx
 * Design: Aviation Blueprint — draws animated stroke path using D3
 * Shows FAA wildlife strike incidents by year (2010–2016)
 */
import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface DataPoint {
  YEAR: number;
  count: number;
}

interface LineChartProps {
  data: DataPoint[];
}

export default function LineChart({ data }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const container = svgRef.current.parentElement!;
    const W = container.clientWidth || 600;
    const H = 260;
    const margin = { top: 20, right: 24, bottom: 40, left: 56 };
    const innerW = W - margin.left - margin.right;
    const innerH = H - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", W).attr("height", H);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.YEAR) as [number, number])
      .range([0, innerW]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)! * 1.1])
      .range([innerH, 0]);

    // Grid lines
    g.append("g")
      .attr("class", "grid")
      .call(
        d3.axisLeft(y)
          .ticks(5)
          .tickSize(-innerW)
          .tickFormat(() => "")
      )
      .call(sel => {
        sel.select(".domain").remove();
        sel.selectAll("line")
          .attr("stroke", "oklch(1 0 0 / 6%)")
          .attr("stroke-dasharray", "3,3");
      });

    // Area fill
    const area = d3.area<DataPoint>()
      .x(d => x(d.YEAR))
      .y0(innerH)
      .y1(d => y(d.count))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "oklch(0.72 0.18 200 / 10%)")
      .attr("d", area);

    // Line path
    const line = d3.line<DataPoint>()
      .x(d => x(d.YEAR))
      .y(d => y(d.count))
      .curve(d3.curveMonotoneX);

    const path = g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "oklch(0.72 0.18 200)")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    // Animate stroke draw
    const totalLength = (path.node() as SVGPathElement).getTotalLength();
    path
      .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0);

    // Data points
    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x(d.YEAR))
      .attr("cy", d => y(d.count))
      .attr("r", 0)
      .attr("fill", "oklch(0.72 0.18 200)")
      .attr("stroke", "oklch(0.12 0.04 240)")
      .attr("stroke-width", 2)
      .transition()
      .delay((_, i) => 900 + i * 60)
      .duration(200)
      .attr("r", 5);

    // Tooltip
    const tooltip = d3.select("body").select<HTMLDivElement>("#line-tooltip");
    g.selectAll<SVGCircleElement, DataPoint>("circle")
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("r", 7).attr("fill", "oklch(0.85 0.18 200)");
        tooltip
          .style("opacity", "1")
          .html(`<span class="font-mono-data text-xs">${d.YEAR}</span><br/><span class="font-mono-data text-base font-semibold" style="color:oklch(0.72 0.18 200)">${d.count.toLocaleString()}</span> <span class="text-xs opacity-60">strikes</span>`)
          .style("left", `${event.pageX + 12}px`)
          .style("top", `${event.pageY - 36}px`);
      })
      .on("mouseleave", function () {
        d3.select(this).attr("r", 5).attr("fill", "oklch(0.72 0.18 200)");
        tooltip.style("opacity", "0");
      });

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(data.length).tickFormat(d => String(d)))
      .call(sel => {
        sel.select(".domain").attr("stroke", "oklch(1 0 0 / 15%)");
        sel.selectAll("text")
          .attr("fill", "oklch(0.65 0.02 220)")
          .style("font-family", "'JetBrains Mono', monospace")
          .style("font-size", "11px");
        sel.selectAll("line").attr("stroke", "oklch(1 0 0 / 15%)");
      });

    // Y Axis
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

  }, [data]);

  return <svg ref={svgRef} style={{ width: "100%", display: "block" }} />;
}

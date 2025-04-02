import * as d3 from "d3";
import { useEffect, useRef } from "react";

function D3Node() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current == null) return;

    // Clear previous renders
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3.select(svgRef.current);

    // Add a single node (circle)
    svg.append("circle")
      .attr("cx", 50)  // X position
      .attr("cy", 50)  // Y position
      .attr("r", 20)   // Radius
      .attr("fill", "steelblue")
      .attr("stroke", "black");
  }, []);

  return (
    <div className="d3-container">
      <svg ref={svgRef} width={100} height={100} />
    </div>
  );
}

export default D3Node

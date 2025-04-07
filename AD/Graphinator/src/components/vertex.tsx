import * as d3 from "d3";
import { useState, useEffect, useRef, useCallback } from "react";

const Node = ({bounds, children = 0, initPos = {x:0, y:0}}: {
  bounds?: {left: number; top: number; right: number; bottom: number};
  children?: number;
  initPos?: {x: number; y: number};
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current == null) return;
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3.select(svgRef.current);

    // Add a single node (circle)
    svg.append("circle")
      .attr("cx", 50)  // X position
      .attr("cy", 50)  // Y position
      .attr("r", 50)   // Radius
      .attr("fill", "steelblue")
      .attr("stroke", "black");
    svg.append('text')
      .attr("x", 50)
      .attr("y", 55)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", '2em')
     .text(children?.toString());

  }, [children]);

  const [pos, setPos] = useState(initPos);
  const dragRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const constrainPos = useCallback((x: number, y: number) => {
    if (!bounds || !dragRef.current) return { x, y };
    
    const rect = dragRef.current.getBoundingClientRect();
    return {
      x: Math.max(bounds.left, Math.min(x, bounds.right - rect.width)),
      y: Math.max(bounds.top, Math.min(y, bounds.bottom - rect.height))
    };
  }, [bounds]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    
    const rect = dragRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    dragRef.current.setPointerCapture(e.pointerId);
    isDragging.current = true;
    dragRef.current.style.cursor = 'grabbing';
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !dragRef.current) return;
    
    setPos(constrainPos(
      e.clientX - offset.current.x,
      e.clientY - offset.current.y
    ));
  }, [constrainPos]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    dragRef.current?.releasePointerCapture(e.pointerId);
    dragRef.current && (dragRef.current.style.cursor = 'grab');
  }, []);

  return (
    <div className="d3-container"
      ref={dragRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
      style={{
        position: 'absolute',
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
        willChange: 'transform',
      }}
      role='button'
      tabIndex={0}
      >
      <svg ref={svgRef} width={100} height={100}></svg>

    </div>
  );


}

export default Node

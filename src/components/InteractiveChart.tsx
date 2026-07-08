import { useState, useRef, useEffect, MouseEvent } from 'react';

interface ChartPoint {
  time: string;
  price: number;
}

interface InteractiveChartProps {
  onHoverPrice: (price: number | null) => void;
  currentPrice: number;
}

export default function InteractiveChart({ onHoverPrice, currentPrice }: InteractiveChartProps) {
  // Generate historical data ending at the current price
  const [data, setData] = useState<ChartPoint[]>([
    { time: '00:00', price: 1.62 },
    { time: '02:00', price: 1.58 },
    { time: '04:00', price: 1.64 },
    { time: '06:00', price: 1.61 },
    { time: '08:00', price: 1.70 },
    { time: '10:00', price: 1.68 },
    { time: '12:00', price: 1.74 },
    { time: '14:00', price: 1.71 },
    { time: '16:00', price: 1.82 },
    { time: '18:00', price: 1.78 },
    { time: '20:00', price: 1.85 },
    { time: '22:00', price: 1.88 },
  ]);

  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);
  const chartRef = useRef<HTMLDivElement>(null);

  // Keep the last element synchronized with the currentPrice state
  useEffect(() => {
    setData(prev => {
      const copy = [...prev];
      copy[copy.length - 1] = { ...copy[copy.length - 1], price: currentPrice };
      return copy;
    });
  }, [currentPrice]);

  // Handle mouse move to find closest data point
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    // Calculate fractional position
    const ratio = x / width;
    const index = Math.min(
      data.length - 1,
      Math.max(0, Math.round(ratio * (data.length - 1)))
    );

    const point = data[index];
    setHoveredPoint(point);
    setHoverIndex(index);
    onHoverPrice(point.price);

    // Compute coordinate for the vertical marker line
    const stepX = width / (data.length - 1);
    setHoverX(index * stepX);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
    setHoverIndex(null);
    onHoverPrice(null);
  };

  // Dimensions
  const width = 300;
  const height = 80;

  // Max and min to scale SVG coordinates
  const prices = data.map(d => d.price);
  const maxPrice = Math.max(...prices) * 1.02;
  const minPrice = Math.min(...prices) * 0.98;
  const priceRange = maxPrice - minPrice || 1;

  // Generate SVG path coordinate strings
  const getCoordinates = () => {
    return data.map((d, index) => {
      const xCoord = (index / (data.length - 1)) * width;
      // Invert Y because SVG coordinates start from top-left
      const yCoord = height - ((d.price - minPrice) / priceRange) * height;
      return { x: xCoord, y: yCoord };
    });
  };

  const coords = getCoordinates();

  // Create smooth bezier path
  const getBezierPath = () => {
    if (coords.length === 0) return '';
    let path = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const cpX1 = coords[i].x + (coords[i + 1].x - coords[i].x) / 3;
      const cpY1 = coords[i].y;
      const cpX2 = coords[i].x + (2 * (coords[i + 1].x - coords[i].x)) / 3;
      const cpY2 = coords[i].y + (coords[i + 1].y - coords[i].y);
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${coords[i + 1].x} ${coords[i + 1].y}`;
    }
    return path;
  };

  const linePath = getBezierPath();
  const fillPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  // Get current active dot position
  const activeDot = hoverIndex !== null ? coords[hoverIndex] : null;

  return (
    <div id="tyn-chart-container" className="relative select-none w-full">
      {/* Tooltip on top of the chart */}
      <div className="absolute top-0 right-2 flex flex-col items-end z-10 pointer-events-none">
        {hoveredPoint ? (
          <div className="bg-[#0A0A0A]/90 border border-[#C2A87E]/40 px-2 py-0.5 rounded text-[10px] font-mono text-[#C2A87E] backdrop-blur-sm shadow-md animate-fade-in">
            <span>{hoveredPoint.time} UTC</span>
            <span className="mx-1.5 font-bold">${hoveredPoint.price.toFixed(2)}</span>
          </div>
        ) : (
          <div className="text-[9px] font-mono text-[#666666] tracking-wider">
            24H HISTORY • HOVER TO EXPLORE
          </div>
        )}
      </div>

      <div
        ref={chartRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cursor-crosshair w-full relative h-[80px]"
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Glowing yellow golden line gradient */}
            <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C2A87E" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C2A87E" stopOpacity="0.0" />
            </linearGradient>
            {/* Filter for subtle neon line glow */}
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="rgba(255,255,255,0.02)" strokeDasharray="3,3" />
          <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="rgba(255,255,255,0.02)" strokeDasharray="3,3" />
          <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="rgba(255,255,255,0.02)" strokeDasharray="3,3" />

          {/* Interactive vertical hover indicator line */}
          {hoverIndex !== null && (
            <line
              x1={hoverX}
              y1={0}
              x2={hoverX}
              y2={height}
              stroke="rgba(194, 168, 126, 0.25)"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          )}

          {/* Filled Area under line */}
          <path d={fillPath} fill="url(#sparklineGradient)" />

          {/* Golden glow stroke path */}
          <path
            d={linePath}
            fill="none"
            stroke="#C2A87E"
            strokeWidth="1.5"
            filter="url(#goldGlow)"
            strokeLinecap="round"
          />

          {/* Dynamic hover node */}
          {activeDot && (
            <>
              <circle
                cx={activeDot.x}
                cy={activeDot.y}
                r="5"
                fill="#C2A87E"
                opacity="0.4"
                className="animate-ping"
              />
              <circle
                cx={activeDot.x}
                cy={activeDot.y}
                r="3"
                fill="#ffffff"
                stroke="#C2A87E"
                strokeWidth="1.5"
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

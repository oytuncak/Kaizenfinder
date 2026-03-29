// Ikigai 4-circle Venn diagram
// Layout: 4 circles in a 2×2 arrangement, 500×500 viewBox
// Love (top-left), Good At (top-right), Paid For (bottom-right), World Needs (bottom-left)
// Adjacent centers 150px apart, r=160 → 53% overlap ratio, clear petal regions

const CIRCLES = [
  {
    key: 'love',
    cx: 175, cy: 175, r: 160,
    color: '#FF6B8A',
    label: '❤️ LOVE',
    labelX: 122, labelY: 132,
  },
  {
    key: 'good_at',
    cx: 325, cy: 175, r: 160,
    color: '#FFB347',
    label: '⭐ GOOD AT',
    labelX: 378, labelY: 132,
  },
  {
    key: 'paid_for',
    cx: 325, cy: 325, r: 160,
    color: '#4ECDC4',
    label: '💡 PAID FOR',
    labelX: 378, labelY: 376,
  },
  {
    key: 'world_needs',
    cx: 175, cy: 325, r: 160,
    color: '#9B59B6',
    label: '🌍 WORLD',
    labelX: 122, labelY: 376,
  },
]

const INTERSECTIONS = [
  { x: 250, y: 118, label: 'PASSION' },
  { x: 382, y: 250, label: 'PROFESSION' },
  { x: 250, y: 382, label: 'VOCATION' },
  { x: 118, y: 250, label: 'MISSION' },
]

export default function IkigaiDiagram({ completedSections = [], size = 500, showLabels = true, animate = false }) {
  const allDone = completedSections.length === 4

  return (
    <div className="ikigai-diagram-wrapper">
      <svg
        className="ikigai-svg"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ikigai Venn Diagram"
      >
        <defs>
          {CIRCLES.map(c => (
            <radialGradient key={`grad-${c.key}`} id={`grad-${c.key}`} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor={c.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={c.color} stopOpacity="0.4" />
            </radialGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circles */}
        {CIRCLES.map(c => {
          const isActive = completedSections.includes(c.key)
          return (
            <circle
              key={c.key}
              className={`ikigai-circle ${isActive ? 'active' : 'inactive'}`}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              fill={`url(#grad-${c.key})`}
              stroke={c.color}
              strokeWidth={isActive ? 1.5 : 0.5}
              strokeOpacity={isActive ? 0.5 : 0.3}
            />
          )
        })}

        {/* Circle labels */}
        {showLabels && CIRCLES.map(c => {
          const isActive = completedSections.includes(c.key)
          return (
            <text
              key={`label-${c.key}`}
              x={c.labelX}
              y={c.labelY}
              textAnchor="middle"
              fill="white"
              fillOpacity={isActive ? 0.9 : 0.3}
              fontSize="10"
              fontWeight="800"
              fontFamily="Nunito, sans-serif"
              letterSpacing="0.5"
              style={{ transition: 'fill-opacity 0.8s ease' }}
            >
              {c.label}
            </text>
          )
        })}

        {/* Intersection labels */}
        {showLabels && INTERSECTIONS.map((inter, i) => {
          const allCirclesActive = completedSections.length >= 2
          return (
            <text
              key={`inter-${i}`}
              x={inter.x}
              y={inter.y}
              textAnchor="middle"
              fill="white"
              fillOpacity={allCirclesActive ? 0.55 : 0.15}
              fontSize="9"
              fontWeight="700"
              fontFamily="Nunito, sans-serif"
              letterSpacing="0.5"
              style={{ transition: 'fill-opacity 0.8s ease' }}
            >
              {inter.label}
            </text>
          )
        })}

        {/* Center IKIGAI point */}
        {allDone ? (
          <>
            <circle
              cx="250"
              cy="250"
              r="28"
              fill="white"
              fillOpacity="0.12"
              filter="url(#glow)"
            />
            <circle
              cx="250"
              cy="250"
              r="18"
              fill="white"
              fillOpacity="0.95"
              filter="url(#glow)"
              className="ikigai-center-pulse"
            />
            <text
              x="250"
              y="254"
              textAnchor="middle"
              fill="#0F0F1A"
              fontSize="8"
              fontWeight="900"
              fontFamily="Nunito, sans-serif"
              letterSpacing="0.5"
            >
              IKIGAI
            </text>
          </>
        ) : (
          <>
            <circle
              cx="250"
              cy="250"
              r="18"
              fill="white"
              fillOpacity={completedSections.length > 0 ? 0.15 : 0.05}
              style={{ transition: 'fill-opacity 0.8s ease' }}
            />
            {showLabels && (
              <text
                x="250"
                y="254"
                textAnchor="middle"
                fill="white"
                fillOpacity={completedSections.length > 0 ? 0.4 : 0.15}
                fontSize="8"
                fontWeight="800"
                fontFamily="Nunito, sans-serif"
                letterSpacing="0.5"
                style={{ transition: 'fill-opacity 0.8s ease' }}
              >
                IKIGAI
              </text>
            )}
          </>
        )}
      </svg>
    </div>
  )
}

// Ikigai 4-circle Venn diagram
// Layout: 4 circles in a 2×2 arrangement
// Love (top-left), Good At (top-right), Paid For (bottom-right), World Needs (bottom-left)

const CIRCLES = [
  {
    key: 'love',
    cx: 145, cy: 145, r: 105,
    color: '#FF6B8A',
    label: '❤️ LOVE',
    labelX: 105, labelY: 110,
  },
  {
    key: 'good_at',
    cx: 255, cy: 145, r: 105,
    color: '#4ECDC4',
    label: '⭐ GOOD AT',
    labelX: 292, labelY: 110,
  },
  {
    key: 'paid_for',
    cx: 255, cy: 255, r: 105,
    color: '#FFD93D',
    label: '💡 PAID FOR',
    labelX: 292, labelY: 298,
  },
  {
    key: 'world_needs',
    cx: 145, cy: 255, r: 105,
    color: '#96CEB4',
    label: '🌍 WORLD',
    labelX: 105, labelY: 298,
  },
]

const INTERSECTIONS = [
  { x: 200, y: 118, label: 'PASSION', size: 10 },
  { x: 282, y: 200, label: 'PROFESSION', size: 10 },
  { x: 200, y: 282, label: 'VOCATION', size: 10 },
  { x: 118, y: 200, label: 'MISSION', size: 10 },
]

export default function IkigaiDiagram({ completedSections = [], size = 400, showLabels = true, animate = false }) {
  const allDone = completedSections.length === 4

  return (
    <div className="ikigai-diagram-wrapper">
      <svg
        className="ikigai-svg"
        viewBox="0 0 400 400"
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
              fillOpacity={allCirclesActive ? 0.5 : 0.15}
              fontSize="7"
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
              cx="200"
              cy="200"
              r="22"
              fill="white"
              fillOpacity="0.15"
              filter="url(#glow)"
            />
            <circle
              cx="200"
              cy="200"
              r="14"
              fill="white"
              fillOpacity="0.9"
              filter="url(#glow)"
              className="ikigai-center-pulse"
            />
            <text
              x="200"
              y="204"
              textAnchor="middle"
              fill="#0F0F1A"
              fontSize="7"
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
              cx="200"
              cy="200"
              r="14"
              fill="white"
              fillOpacity={completedSections.length > 0 ? 0.15 : 0.05}
              style={{ transition: 'fill-opacity 0.8s ease' }}
            />
            {showLabels && (
              <text
                x="200"
                y="204"
                textAnchor="middle"
                fill="white"
                fillOpacity={completedSections.length > 0 ? 0.4 : 0.15}
                fontSize="7"
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

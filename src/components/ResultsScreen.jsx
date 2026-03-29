import { useEffect, useState } from 'react'
import IkigaiDiagram from './IkigaiDiagram.jsx'
import { generateResults } from '../utils/generateResults.js'

const SECTION_META = {
  love:        { color: '#FF6B8A', label: 'What You LOVE',           emoji: '❤️', cardType: 'PASSION' },
  good_at:     { color: '#FFB347', label: "What You're GOOD AT",     emoji: '⭐', cardType: 'MASTERY' },
  world_needs: { color: '#9B59B6', label: 'What the WORLD NEEDS',    emoji: '🌍', cardType: 'MISSION' },
  paid_for:    { color: '#4ECDC4', label: 'What You Can Be PAID FOR', emoji: '💡', cardType: 'VOCATION' },
}

const INTERSECTION_META = [
  { key: 'passion',    label: 'YOUR PASSION',    icon: '🔥', desc: 'Love + Good At',        color: '#FF8C69' },
  { key: 'mission',    label: 'YOUR MISSION',    icon: '🌱', desc: 'Love + World Needs',    color: '#C87DD4' },
  { key: 'profession', label: 'YOUR PROFESSION', icon: '🏆', desc: 'Good At + Paid For',    color: '#7FDBD7' },
  { key: 'vocation',   label: 'YOUR VOCATION',   icon: '💫', desc: 'Paid For + World Needs', color: '#7BC8C4' },
]

function ConfettiPiece({ x, delay, color, size }) {
  return (
    <div
      className="confetti-piece"
      style={{
        left: `${x}%`,
        top: '-20px',
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: size > 6 ? '50%' : '2px',
        animationDuration: `${1.5 + Math.random() * 1.5}s`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

const CONFETTI_COLORS = ['#FF6B8A', '#4ECDC4', '#96CEB4', '#FFD93D', '#FF4757', '#2ECC71', '#F368E0']

function Confetti() {
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 4 + Math.random() * 8,
  }))

  return (
    <div className="results-confetti">
      {pieces.map(p => (
        <ConfettiPiece key={p.id} {...p} />
      ))}
    </div>
  )
}

export default function ResultsScreen({ answers, onRestart }) {
  const [results, setResults] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const r = generateResults(answers)
    setResults(r)
    setTimeout(() => setVisible(true), 100)
  }, [answers])

  if (!results) return null

  const { passion, mission, profession, vocation, ikigai, topTags, quotes, alignment } = results

  const intersectionTexts = { passion, mission, profession, vocation }

  return (
    <div className={`screen results-screen ${visible ? 'fade-in' : ''}`}>
      {/* Hero */}
      <div className="results-hero">
        <Confetti />
        <p className="section-badge" style={{
          display: 'inline-flex',
          background: 'rgba(255,215,0,0.1)',
          borderColor: 'rgba(255,215,0,0.3)',
          color: '#FFD93D',
          margin: '0 auto 20px',
        }}>
          ⛩️ &nbsp; Your Ikigai Revealed
        </p>
        <h1 className="results-title">You Found Your Center</h1>
        <p className="results-ikigai-headline">
          "{ikigai.headline}"
        </p>
      </div>

      {/* Ikigai Diagram — fully lit */}
      <div className="results-diagram-section">
        <IkigaiDiagram
          completedSections={['love', 'good_at', 'world_needs', 'paid_for']}
          showLabels={true}
          animate={true}
        />
      </div>

      {/* CENTER — Ikigai */}
      <div className="ikigai-center-result">
        <span className="ikigai-center-icon">⛩️</span>
        <p className="ikigai-center-label">Your Ikigai</p>
        <h2 className="ikigai-center-headline">{ikigai.headline}</h2>
        <p className="ikigai-center-summary">{ikigai.summary}</p>
        <div className="ikigai-pillars">
          {ikigai.pillars.map(p => (
            <div key={p.label} className="ikigai-pillar">
              <span className="ikigai-pillar-icon">{p.icon}</span>
              <span className="ikigai-pillar-label">{p.label}</span>
              <span className="ikigai-pillar-value">{p.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Intersections */}
      <h3 style={{ marginBottom: 20, fontSize: 20, fontFamily: 'Nunito', fontWeight: 800 }}>
        Your Four Dimensions
      </h3>
      <div className="results-grid">
        {INTERSECTION_META.map(meta => (
          <div
            key={meta.key}
            className="result-card"
            style={{
              borderColor: `${meta.color}35`,
              background: `${meta.color}08`,
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: meta.color, borderRadius: '16px 16px 0 0'
            }} />
            <span className="result-card-icon">{meta.icon}</span>
            <p className="result-card-type" style={{ color: meta.color }}>{meta.desc}</p>
            <p className="result-card-title">{meta.label}</p>
            <p className="result-card-desc">{intersectionTexts[meta.key]}</p>
          </div>
        ))}
      </div>

      {/* Circle Summaries */}
      <h3 style={{ marginBottom: 20, fontSize: 20, fontFamily: 'Nunito', fontWeight: 800 }}>
        Your Circle Insights
      </h3>
      {Object.entries(SECTION_META).map(([key, meta]) => {
        const tags = topTags[key] || []
        const quote = quotes[key]
        return (
          <div
            key={key}
            className="card"
            style={{ borderColor: `${meta.color}30`, marginBottom: 16 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{meta.emoji}</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: meta.color, marginBottom: 2 }}>
                  {meta.cardType}
                </p>
                <p style={{ fontSize: 15, fontWeight: 700 }}>{meta.label}</p>
              </div>
            </div>
            {tags.length > 0 && (
              <div className="result-tags">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="result-tag"
                    style={{ background: `${meta.color}18`, color: meta.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {quote && (
              <div className="results-quote" style={{ borderLeftColor: meta.color, marginTop: 14 }}>
                <p className="results-quote-label" style={{ color: meta.color }}>
                  {meta.emoji} In your words
                </p>
                <p className="results-quote-text">"{quote}"</p>
              </div>
            )}
          </div>
        )
      })}

      {/* Philosophy footer */}
      <div className="card" style={{ borderColor: 'rgba(255,255,255,0.08)', marginTop: 8, marginBottom: 24, textAlign: 'center', padding: 28 }}>
        <p style={{ fontSize: 13, color: 'rgba(240,240,248,0.4)', lineHeight: 1.8 }}>
          <strong style={{ color: 'rgba(240,240,248,0.7)' }}>Remember:</strong> Your Ikigai isn't a fixed destination
          — it's a living practice. As you grow, it evolves. The Japanese concept of{' '}
          <em>Kaizen</em> (continuous improvement) reminds us: small daily steps toward this center
          create a life of deep fulfillment.
        </p>
      </div>

      {/* Restart */}
      <div className="results-restart">
        <button className="btn btn-ghost" onClick={onRestart}>
          ↺ Take the journey again
        </button>
        <p className="results-restart-note">
          Your answers remain private and are never stored.
        </p>
      </div>
    </div>
  )
}

import IkigaiDiagram from './IkigaiDiagram.jsx'

const CIRCLE_PREVIEWS = [
  { emoji: '❤️', title: 'What You LOVE', sub: 'Your deepest joys', color: '#FF6B8A' },
  { emoji: '⭐', title: 'What You\'re GOOD AT', sub: 'Your natural gifts', color: '#4ECDC4' },
  { emoji: '🌍', title: 'World Needs', sub: 'Your calling', color: '#96CEB4' },
  { emoji: '💡', title: 'Can Be PAID FOR', sub: 'Your livelihood', color: '#FFD93D' },
]

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="screen welcome-screen fade-in">
      <div className="welcome-logo">⛩️</div>

      <div className="welcome-tag">
        <span>✦</span>
        <span>Japanese Philosophy</span>
        <span>✦</span>
      </div>

      <h1 className="welcome-title">KaizenFinder</h1>
      <p className="welcome-subtitle">Discover Your Ikigai</p>

      <p className="welcome-desc">
        <em>Ikigai</em> — your "reason for being" — lives at the intersection
        of what you love, what you're good at, what the world needs,
        and what you can be paid for.
        <br /><br />
        Answer a few thoughtful questions to illuminate your unique path.
      </p>

      <div className="welcome-diagram">
        <IkigaiDiagram completedSections={[]} showLabels={true} />
      </div>

      <div className="welcome-circles-grid">
        {CIRCLE_PREVIEWS.map(c => (
          <div
            key={c.title}
            className="circle-preview-card"
            style={{ borderColor: `${c.color}40` }}
          >
            <div className="circle-preview-icon">{c.emoji}</div>
            <div className="circle-preview-title" style={{ color: c.color }}>
              {c.title}
            </div>
            <div className="circle-preview-sub">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="welcome-cta">
        <button className="btn btn-primary btn-lg" onClick={onStart}>
          Begin Your Journey ✦
        </button>
        <p className="welcome-time-note">~10 minutes · No account needed · 100% private</p>
      </div>
    </div>
  )
}

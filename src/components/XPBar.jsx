import { TOTAL_XP, LEVELS } from '../data/questions.js'

export default function XPBar({ xp, show }) {
  if (!show) return null

  const percent = Math.min((xp / TOTAL_XP) * 100, 100)
  const level = LEVELS.find(l => xp >= l.min && xp <= l.max) || LEVELS[LEVELS.length - 1]

  return (
    <div className="xp-bar-wrapper">
      <div className="xp-bar-inner">
        <div className="xp-level-badge">
          <span>{level.emoji}</span>
          <span>{level.name}</span>
        </div>
        <div className="xp-track">
          <div className="xp-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="xp-count">{xp} XP</div>
      </div>
    </div>
  )
}

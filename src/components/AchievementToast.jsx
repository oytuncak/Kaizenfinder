import { useEffect, useState } from 'react'

export default function AchievementToast({ achievement, onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 400)
    }, 2600)
    return () => clearTimeout(timer)
  }, [onDone])

  if (!visible || !achievement) return null

  return (
    <div className="achievement-toast">
      <div className="achievement-toast-icon">{achievement.emoji}</div>
      <div>
        <div className="achievement-toast-title">Achievement Unlocked!</div>
        <div className="achievement-toast-name">{achievement.title}</div>
        <div className="achievement-toast-desc">{achievement.desc}</div>
      </div>
    </div>
  )
}

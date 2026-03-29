import { useState, useCallback } from 'react'
import { sections, ACHIEVEMENTS } from './data/questions.js'
import XPBar from './components/XPBar.jsx'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import QuestionSection from './components/QuestionSection.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'
import AchievementToast from './components/AchievementToast.jsx'

const INITIAL_ANSWERS = {
  love:        { tags: [], slider: 3, text: '' },
  good_at:     { tags: [], slider: 3, text: '' },
  world_needs: { tags: [], slider: 3, text: '' },
  paid_for:    { tags: [], slider: 3, text: '' },
}

function getAchievements(completedCount, answers) {
  const unlocked = []
  if (completedCount >= 1) unlocked.push('first_step')
  if (completedCount >= 2) unlocked.push('halfway')
  if (completedCount >= 3) unlocked.push('almost')
  if (completedCount >= 4) unlocked.push('ikigai_found')

  // Deep thinker: text answers with meaningful content
  const textAnswers = Object.values(answers).map(a => a.text || '').filter(t => t.length > 15)
  if (textAnswers.length >= 2) unlocked.push('introspective')

  // Decisive: slider confidence (>= 4) in multiple sections
  const confidentSliders = Object.values(answers).filter(a => (a.slider || 3) >= 4)
  if (confidentSliders.length >= 2) unlocked.push('decisive')

  return unlocked
}

export default function App() {
  const [screen, setScreen] = useState('welcome') // 'welcome' | 'question' | 'results'
  const [sectionIndex, setSectionIndex] = useState(0)
  const [answers, setAnswers] = useState(INITIAL_ANSWERS)
  const [completedSections, setCompletedSections] = useState([])
  const [xp, setXp] = useState(0)
  const [earnedAchievements, setEarnedAchievements] = useState([])
  const [pendingAchievement, setPendingAchievement] = useState(null)

  function handleStart() {
    setScreen('question')
    setSectionIndex(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleAnswerChange(sectionKey, newAnswer) {
    setAnswers(prev => ({ ...prev, [sectionKey]: newAnswer }))
  }

  function handleXpGain(amount) {
    setXp(prev => prev + amount)
  }

  function checkAndAwardAchievements(newCompletedSections, newAnswers) {
    const shouldHave = getAchievements(newCompletedSections.length, newAnswers)
    const newOnes = shouldHave.filter(id => !earnedAchievements.includes(id))
    if (newOnes.length > 0) {
      const achievement = ACHIEVEMENTS.find(a => a.id === newOnes[0])
      if (achievement) {
        setEarnedAchievements(prev => [...prev, ...newOnes])
        setPendingAchievement(achievement)
      }
    }
  }

  function handleSectionComplete(sectionKey) {
    const newCompleted = [...completedSections, sectionKey]
    setCompletedSections(newCompleted)
    checkAndAwardAchievements(newCompleted, answers)

    const nextIndex = sectionIndex + 1
    if (nextIndex >= sections.length) {
      // All sections done — go to results
      setScreen('results')
    } else {
      setSectionIndex(nextIndex)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleRestart() {
    setScreen('welcome')
    setSectionIndex(0)
    setAnswers(INITIAL_ANSWERS)
    setCompletedSections([])
    setXp(0)
    setEarnedAchievements([])
    setPendingAchievement(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleAchievementDone() {
    setPendingAchievement(null)
  }

  const showXpBar = screen !== 'welcome'
  const currentSection = sections[sectionIndex]

  return (
    <div className="app-wrapper">
      <XPBar xp={xp} show={showXpBar} />

      {screen === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {screen === 'question' && currentSection && (
        <QuestionSection
          key={currentSection.id}
          section={currentSection}
          sectionIndex={sectionIndex}
          totalSections={sections.length}
          completedSections={completedSections}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onSectionComplete={handleSectionComplete}
          onXpGain={handleXpGain}
        />
      )}

      {screen === 'results' && (
        <ResultsScreen
          answers={answers}
          onRestart={handleRestart}
        />
      )}

      {pendingAchievement && (
        <AchievementToast
          achievement={pendingAchievement}
          onDone={handleAchievementDone}
        />
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { XP_PER_QUESTION, XP_PER_SECTION } from '../data/questions.js'
import IkigaiDiagram from './IkigaiDiagram.jsx'

function TagQuestion({ question, color, answer, onChange }) {
  const selected = answer?.tags || []

  function toggle(tag) {
    const next = selected.includes(tag)
      ? selected.filter(t => t !== tag)
      : [...selected, tag]
    onChange({ ...answer, tags: next })
  }

  return (
    <div>
      {question.hint && <p className="question-hint">{question.hint}</p>}
      {selected.length > 0 && (
        <p className="tag-selection-hint">
          {selected.length} selected — keep going or tap Next
        </p>
      )}
      <div className="tag-cloud">
        {question.options.map(opt => (
          <button
            key={opt}
            className={`tag-item ${selected.includes(opt) ? 'selected' : ''}`}
            style={selected.includes(opt) ? { backgroundColor: color, borderColor: color } : {}}
            onClick={() => toggle(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

const EMOJI_SCALE = ['😐', '🙁', '😶', '🙂', '😊', '🤩']

function SliderQuestion({ question, color, answer, onChange }) {
  const value = answer?.slider ?? 3

  function handleChange(e) {
    onChange({ ...answer, slider: parseInt(e.target.value) })
  }

  const label = question.labels?.[value - 1] || ''
  const emoji = EMOJI_SCALE[value]

  // Build slider fill gradient
  const percent = ((value - 1) / 4) * 100

  return (
    <div className="slider-wrapper">
      <p className="slider-question-text">{question.sliderQuestion || question.question}</p>
      {question.hint && <p className="question-hint">{question.hint}</p>}

      <div className="slider-value-display" style={{ color }}>
        {emoji}
      </div>

      <div className="slider-track">
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={value}
          onChange={handleChange}
          className="slider-input"
          style={{
            color,
            background: `linear-gradient(90deg, ${color} ${percent}%, rgba(255,255,255,0.15) ${percent}%)`
          }}
        />
        <div className="slider-labels">
          {question.labels?.map((lbl, i) => (
            <span
              key={i}
              className={`slider-label ${value === i + 1 ? 'active' : ''}`}
            >
              {lbl}
            </span>
          ))}
        </div>
      </div>

      {label && (
        <p style={{ textAlign: 'center', fontWeight: 700, fontSize: 15, color, marginTop: -20 }}>
          {label}
        </p>
      )}
    </div>
  )
}

function TextQuestion({ question, color, answer, onChange }) {
  const text = answer?.text || ''

  function handleChange(e) {
    onChange({ ...answer, text: e.target.value })
  }

  return (
    <div className="text-wrapper">
      {question.prompt && (
        <p className="question-prompt" style={{ color }}>{question.prompt}</p>
      )}
      {question.hint && <p className="question-hint">{question.hint}</p>}
      <textarea
        className="text-input"
        value={text}
        onChange={handleChange}
        placeholder={question.placeholder || 'Write your answer here...'}
        style={{ borderColor: text.length > 0 ? `${color}60` : undefined }}
        rows={4}
      />
      <div className="text-char-count">{text.length} characters</div>
    </div>
  )
}

export default function QuestionSection({
  section,
  sectionIndex,
  totalSections,
  completedSections,
  answers,
  onAnswerChange,
  onSectionComplete,
  onXpGain,
}) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [showComplete, setShowComplete] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set())

  const currentQuestion = section.questions[questionIndex]
  const isLastQuestion = questionIndex === section.questions.length - 1
  const currentAnswer = answers[section.key] || {}
  const color = section.color

  useEffect(() => {
    setQuestionIndex(0)
    setShowComplete(false)
    setAnsweredQuestions(new Set())
  }, [section.id])

  function handleAnswerChange(newAnswer) {
    onAnswerChange(section.key, newAnswer)
  }

  function canAdvance() {
    if (currentQuestion.type === 'tags') {
      return (currentAnswer.tags || []).length > 0
    }
    if (currentQuestion.type === 'slider') {
      return true // slider always has a value
    }
    if (currentQuestion.type === 'text') {
      return true // text is optional
    }
    return true
  }

  function handleNext() {
    if (!answeredQuestions.has(questionIndex)) {
      setAnsweredQuestions(prev => new Set([...prev, questionIndex]))
      onXpGain(XP_PER_QUESTION)
    }

    if (isLastQuestion) {
      setShowComplete(true)
    } else {
      setQuestionIndex(i => i + 1)
    }
  }

  function handleSkip() {
    if (isLastQuestion) {
      setShowComplete(true)
    } else {
      setQuestionIndex(i => i + 1)
    }
  }

  function handleSectionContinue() {
    onXpGain(XP_PER_SECTION)
    onSectionComplete(section.key)
  }

  // Section complete view
  if (showComplete) {
    return (
      <div className="screen">
        <div className="section-complete">
          <div className="section-complete-icon">{section.emoji}</div>
          <h2 className="section-complete-title" style={{ color }}>
            Circle Unlocked!
          </h2>
          <p className="section-complete-desc">
            Your <strong style={{ color }}>{section.title}</strong> circle is illuminated.
            {sectionIndex < totalSections - 1
              ? ` ${totalSections - sectionIndex - 1} more circle${totalSections - sectionIndex - 1 > 1 ? 's' : ''} to reveal your Ikigai.`
              : ' All 4 circles complete — your Ikigai awaits!'}
          </p>

          <div style={{ width: '100%', maxWidth: 280, margin: '0 auto 32px' }}>
            <IkigaiDiagram
              completedSections={[...completedSections, section.key]}
              showLabels={true}
            />
          </div>

          <div className="xp-gained-badge">
            <span>✨</span>
            <span>+{XP_PER_SECTION} XP Earned</span>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={handleSectionContinue}
          >
            {sectionIndex < totalSections - 1
              ? `Next: ${['What You LOVE', "What You're GOOD AT", 'World Needs', 'PAID FOR'][sectionIndex + 1] || 'Continue'}  →`
              : '✦ Reveal My Ikigai ✦'}
          </button>
        </div>
      </div>
    )
  }

  const progressPercent = (questionIndex / section.questions.length) * 100

  return (
    <div className="screen">
      {/* Section header */}
      <div className="section-header">
        <div
          className="section-badge"
          style={{
            color,
            backgroundColor: `${color}15`,
            borderColor: `${color}40`,
          }}
        >
          <span>{section.emoji}</span>
          <span>Circle {sectionIndex + 1} of {totalSections}</span>
        </div>
        <h2 className="section-title" style={{ color }}>{section.title}</h2>
        <p className="section-desc">{section.description}</p>
        <div className="section-progress-dots">
          {section.questions.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${i === questionIndex ? 'active' : i < questionIndex ? 'done' : ''}`}
              style={i === questionIndex ? { backgroundColor: color } : i < questionIndex ? { backgroundColor: `${color}60` } : {}}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div key={`${section.id}-${questionIndex}`} className="card question-card" style={{ borderColor: `${color}25` }}>
        <div className="question-number" style={{ color }}>
          Question {questionIndex + 1} of {section.questions.length}
        </div>
        <h3 className="question-text">{currentQuestion.question}</h3>

        {currentQuestion.type === 'tags' && (
          <TagQuestion
            question={currentQuestion}
            color={color}
            answer={currentAnswer}
            onChange={handleAnswerChange}
          />
        )}

        {currentQuestion.type === 'slider' && (
          <SliderQuestion
            question={currentQuestion}
            color={color}
            answer={currentAnswer}
            onChange={handleAnswerChange}
          />
        )}

        {currentQuestion.type === 'text' && (
          <TextQuestion
            question={currentQuestion}
            color={color}
            answer={currentAnswer}
            onChange={handleAnswerChange}
          />
        )}

        <div className="question-nav">
          <button className="skip-btn" onClick={handleSkip}>
            Skip →
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!canAdvance()}
            style={canAdvance() ? {
              background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
              boxShadow: `0 4px 20px ${color}40`
            } : {}}
          >
            {isLastQuestion ? 'Complete Circle ✦' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}

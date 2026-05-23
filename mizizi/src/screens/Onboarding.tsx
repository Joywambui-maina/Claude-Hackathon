import { useState, useEffect, useMemo } from 'react'
import { storage } from '../utils/storage'
import type { Language, StudyTime, DailyGoalMinutes, ContentInterest, User } from '../types'

const TOTAL_STEPS = 5

// ── Data ──────────────────────────────────────────────────────────────────────

const GREETINGS = [
  { text: 'Karibu!', language: 'Swahili', flag: '🇰🇪' },
  { text: 'Ẹ káàbọ̀!', language: 'Yoruba', flag: '🇳🇬' },
  { text: '¡Bienvenido!', language: 'Spanish', flag: '🌎' },
]

const LANGUAGES: { value: Language; label: string; region: string; flag: string; sample: string }[] = [
  { value: 'swahili', label: 'Swahili', region: 'East Africa', flag: '🇰🇪', sample: 'Asante sana' },
  { value: 'yoruba', label: 'Yoruba', region: 'West Africa', flag: '🇳🇬', sample: 'Ẹ káàárọ̀' },
  { value: 'spanish', label: 'Spanish', region: 'Latin America', flag: '🌎', sample: '¡Buenos días!' },
]

interface Puzzle {
  word: string
  phonetic: string
  correct: string
  options: string[]
  culturalNote: string
}

const PUZZLES: Record<Language, Puzzle> = {
  swahili: {
    word: 'Asante',
    phonetic: 'ah-SAN-teh',
    correct: 'Thank you',
    options: ['Hello', 'Thank you', 'Good morning'],
    culturalNote: '"Asante sana" — thank you very much. In Swahili culture, gratitude is woven into every greeting. It\'s often the first phrase children learn.',
  },
  yoruba: {
    word: 'Àjàpá',
    phonetic: 'ah-JAH-pah',
    correct: 'Tortoise',
    options: ['River', 'Tortoise', 'Celebration'],
    culturalNote: 'Àjàpá is the great trickster of Yoruba folklore — clever, greedy, and always entertaining. You\'ll meet him in your first story.',
  },
  spanish: {
    word: 'Colibrí',
    phonetic: 'ko-lee-BREE',
    correct: 'Hummingbird',
    options: ['Butterfly', 'Firefly', 'Hummingbird'],
    culturalNote: 'The colibrí appears across Latin American stories as a symbol of resilience — small effort, enormous heart.',
  },
}

const STUDY_TIMES: { value: StudyTime; label: string; icon: string; description: string }[] = [
  { value: 'morning', label: 'Morning', icon: '🌅', description: 'Before the day begins' },
  { value: 'afternoon', label: 'Afternoon', icon: '☀️', description: 'Midday focus' },
  { value: 'evening', label: 'Evening', icon: '🌆', description: 'Wind down with words' },
  { value: 'night', label: 'Night', icon: '🌙', description: 'Late-night learner' },
]

const DAILY_GOALS: { value: DailyGoalMinutes; label: string; description: string }[] = [
  { value: 5, label: '5 min', description: 'Just a spark' },
  { value: 10, label: '10 min', description: 'Growing roots' },
  { value: 15, label: '15 min', description: 'Deep dive' },
  { value: 20, label: '20 min', description: 'Full immersion' },
]

const INTERESTS: { value: ContentInterest; label: string; icon: string }[] = [
  { value: 'poetry', label: 'Poetry', icon: '📜' },
  { value: 'stories', label: 'Stories', icon: '📖' },
  { value: 'music', label: 'Music', icon: '🎵' },
  { value: 'events', label: 'Campus Events', icon: '🎪' },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function Onboarding({ onDone }: { onDone: (u: User) => void }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [language, setLanguage] = useState<Language | null>(null)
  const [puzzleChoice, setPuzzleChoice] = useState<string | null>(null)
  const [studyTime, setStudyTime] = useState<StudyTime | null>(null)
  const [dailyGoal, setDailyGoal] = useState<DailyGoalMinutes | null>(null)
  const [interests, setInterests] = useState<ContentInterest[]>([])

  function selectLanguage(lang: Language) {
    setLanguage(lang)
    setPuzzleChoice(null) // reset puzzle when language changes
  }

  function toggleInterest(interest: ContentInterest) {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    )
  }

  function canAdvance(): boolean {
    if (step === 1) return name.trim().length > 0
    if (step === 2) return language !== null
    if (step === 3) return puzzleChoice !== null
    if (step === 4) return studyTime !== null
    if (step === 5) return dailyGoal !== null && interests.length > 0
    return false
  }

  function handleNext() {
    if (!canAdvance()) return
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1)
    } else {
      const user: User = {
        name: name.trim(),
        language: language!,
        studyTime: studyTime!,
        dailyGoalMinutes: dailyGoal!,
        interests,
      }
      storage.saveUser(user)
      onDone(user)
    }
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1)
  }

  const puzzle = language ? PUZZLES[language] : null

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.logo}>🌱 Mizizi</span>
          <ProgressDots current={step} total={TOTAL_STEPS} />
        </div>

        {/* Step content */}
        <div style={styles.body}>
          {step === 1 && <StepName name={name} onChange={setName} />}
          {step === 2 && <StepLanguage selected={language} onSelect={selectLanguage} />}
          {step === 3 && puzzle && (
            <StepPuzzle
              puzzle={puzzle}
              language={language!}
              choice={puzzleChoice}
              onChoose={setPuzzleChoice}
            />
          )}
          {step === 4 && <StepStudyTime selected={studyTime} onSelect={setStudyTime} />}
          {step === 5 && (
            <StepHabits
              dailyGoal={dailyGoal}
              onGoalSelect={setDailyGoal}
              interests={interests}
              onToggleInterest={toggleInterest}
            />
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          {step > 1 ? (
            <button style={styles.btnBack} onClick={handleBack}>
              ← Back
            </button>
          ) : (
            <div />
          )}
          <button
            style={{ ...styles.btnPrimary, ...(canAdvance() ? {} : styles.btnDisabled) }}
            onClick={handleNext}
            disabled={!canAdvance()}
          >
            {step === TOTAL_STEPS ? 'Start learning →' : 'Continue →'}
          </button>
        </div>

        {step === 1 && (
          <p style={styles.tagline}>"Mizizi learns from you, not the other way around."</p>
        )}
      </div>
    </div>
  )
}

// ── Step 1: Name + animated multilingual greeting ─────────────────────────────

function StepName({ name, onChange }: { name: string; onChange: (v: string) => void }) {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIdx((i) => (i + 1) % GREETINGS.length)
        setFading(false)
      }, 300)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  const greeting = GREETINGS[idx]

  return (
    <div style={styles.stepWrap}>
      {/* Animated greeting */}
      <div style={styles.greetingBox}>
        <span
          style={{
            ...styles.greetingText,
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(-6px)' : 'translateY(0)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {greeting.text}
        </span>
        <span
          style={{
            ...styles.greetingLang,
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {greeting.flag} {greeting.language}
        </span>
      </div>

      {/* Language pills — all three shown at once */}
      <div style={styles.langPills}>
        {GREETINGS.map((g, i) => (
          <span
            key={g.language}
            style={{
              ...styles.langPill,
              ...(i === idx ? styles.langPillActive : {}),
            }}
          >
            {g.flag} {g.language}
          </span>
        ))}
      </div>

      <h1 style={{ ...styles.heading, marginTop: '8px' }}>What should we call you?</h1>
      <p style={styles.subheading}>
        Your name will appear in your personal stories and prompts.
      </p>
      <input
        style={styles.input}
        type="text"
        placeholder="Your name..."
        value={name}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        maxLength={40}
      />
    </div>
  )
}

// ── Step 2: Language ──────────────────────────────────────────────────────────

function StepLanguage({
  selected,
  onSelect,
}: {
  selected: Language | null
  onSelect: (v: Language) => void
}) {
  return (
    <div style={styles.stepWrap}>
      <h1 style={styles.heading}>Which language calls to you?</h1>
      <p style={styles.subheading}>
        You'll learn through poetry, stories, and music rooted in this culture.
      </p>
      <div style={styles.langGrid}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.value}
            style={{
              ...styles.langCard,
              ...(selected === lang.value ? styles.langCardActive : {}),
            }}
            onClick={() => onSelect(lang.value)}
          >
            <span style={styles.langFlag}>{lang.flag}</span>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={styles.langLabel}>{lang.label}</div>
              <div style={styles.langRegion}>{lang.region}</div>
            </div>
            <span style={styles.langSample}>{lang.sample}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Step 3: Word puzzle ───────────────────────────────────────────────────────

function StepPuzzle({
  puzzle,
  language,
  choice,
  onChoose,
}: {
  puzzle: Puzzle
  language: Language
  choice: string | null
  onChoose: (v: string) => void
}) {
  const answered = choice !== null
  const isCorrect = choice === puzzle.correct

  // Shuffle options once per puzzle (stable across re-renders)
  const shuffled = useMemo(() => [...puzzle.options].sort(() => Math.random() - 0.5), [puzzle])

  function optionStyle(option: string): React.CSSProperties {
    if (!answered) return styles.puzzleOption
    if (option === puzzle.correct) return { ...styles.puzzleOption, ...styles.puzzleOptionCorrect }
    if (option === choice) return { ...styles.puzzleOption, ...styles.puzzleOptionWrong }
    return { ...styles.puzzleOption, opacity: 0.4 }
  }

  const langName = LANGUAGES.find((l) => l.value === language)?.label ?? ''

  return (
    <div style={styles.stepWrap}>
      <p style={styles.puzzleEyebrow}>🧩 First taste of {langName}</p>
      <h1 style={styles.heading}>What does this word mean?</h1>

      {/* Flashcard */}
      <div style={styles.flashcard}>
        <span style={styles.flashcardWord}>{puzzle.word}</span>
        <span style={styles.flashcardPhonetic}>{puzzle.phonetic}</span>
      </div>

      {/* Options */}
      <div style={styles.puzzleOptions}>
        {shuffled.map((option) => (
          <button
            key={option}
            style={optionStyle(option)}
            onClick={() => !answered && onChoose(option)}
            disabled={answered}
          >
            {answered && option === puzzle.correct && <span style={{ marginRight: 8 }}>✓</span>}
            {answered && option === choice && option !== puzzle.correct && (
              <span style={{ marginRight: 8 }}>✗</span>
            )}
            {option}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {answered && (
        <div
          style={{
            ...styles.feedback,
            ...(isCorrect ? styles.feedbackCorrect : styles.feedbackWrong),
          }}
        >
          <p style={styles.feedbackTitle}>
            {isCorrect ? '🎉 Exactly right!' : `Close! "${puzzle.word}" means "${puzzle.correct}"`}
          </p>
          <p style={styles.feedbackNote}>{puzzle.culturalNote}</p>
        </div>
      )}
    </div>
  )
}

// ── Step 4: Study time ────────────────────────────────────────────────────────

function StepStudyTime({
  selected,
  onSelect,
}: {
  selected: StudyTime | null
  onSelect: (v: StudyTime) => void
}) {
  return (
    <div style={styles.stepWrap}>
      <h1 style={styles.heading}>When do you like to learn?</h1>
      <p style={styles.subheading}>
        We'll remind you at the right moment so learning becomes a rhythm.
      </p>
      <div style={styles.timeGrid}>
        {STUDY_TIMES.map((t) => (
          <button
            key={t.value}
            style={{
              ...styles.timeCard,
              ...(selected === t.value ? styles.timeCardActive : {}),
            }}
            onClick={() => onSelect(t.value)}
          >
            <span style={styles.timeIcon}>{t.icon}</span>
            <span style={styles.timeLabel}>{t.label}</span>
            <span style={styles.timeDesc}>{t.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Step 5: Habits ────────────────────────────────────────────────────────────

function StepHabits({
  dailyGoal,
  onGoalSelect,
  interests,
  onToggleInterest,
}: {
  dailyGoal: DailyGoalMinutes | null
  onGoalSelect: (v: DailyGoalMinutes) => void
  interests: ContentInterest[]
  onToggleInterest: (v: ContentInterest) => void
}) {
  return (
    <div style={styles.stepWrap}>
      <h1 style={styles.heading}>Build your learning habit</h1>
      <p style={styles.subheading}>Small and consistent beats occasional and intense.</p>

      <div style={styles.section}>
        <p style={styles.sectionLabel}>How many minutes per day?</p>
        <div style={styles.goalGrid}>
          {DAILY_GOALS.map((g) => (
            <button
              key={g.value}
              style={{
                ...styles.goalCard,
                ...(dailyGoal === g.value ? styles.goalCardActive : {}),
              }}
              onClick={() => onGoalSelect(g.value)}
            >
              <span style={styles.goalMin}>{g.label}</span>
              <span style={styles.goalDesc}>{g.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <p style={styles.sectionLabel}>What draws you in? (pick at least one)</p>
        <div style={styles.interestGrid}>
          {INTERESTS.map((interest) => (
            <button
              key={interest.value}
              style={{
                ...styles.interestChip,
                ...(interests.includes(interest.value) ? styles.interestChipActive : {}),
              }}
              onClick={() => onToggleInterest(interest.value)}
            >
              <span>{interest.icon}</span>
              <span>{interest.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Progress dots ─────────────────────────────────────────────────────────────

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div style={styles.dots}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ ...styles.dot, ...(i < current ? styles.dotFilled : {}) }} />
      ))}
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    backgroundColor: '#FFF9F3',
    backgroundImage:
      'radial-gradient(ellipse at 20% 0%, rgba(29,107,69,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(224,123,57,0.08) 0%, transparent 60%)',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
    padding: '36px 40px 32px',
    width: '100%',
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#1D6B45',
    letterSpacing: '-0.3px',
  },
  dots: { display: 'flex', gap: '5px' },
  dot: {
    width: '22px',
    height: '5px',
    borderRadius: '3px',
    backgroundColor: '#E7E5E4',
    transition: 'background-color 0.3s ease',
  },
  dotFilled: { backgroundColor: '#1D6B45' },
  body: { flex: 1 },
  stepWrap: { display: 'flex', flexDirection: 'column', gap: '14px' },
  heading: {
    fontSize: '23px',
    fontWeight: '700',
    color: '#1C1917',
    lineHeight: '1.25',
    letterSpacing: '-0.4px',
  },
  subheading: { fontSize: '14px', color: '#78716C', lineHeight: '1.5', marginTop: '-4px' },

  // Greeting animation
  greetingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 16px 16px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #E8F5EE 0%, #FFF0E6 100%)',
    gap: '6px',
    minHeight: '90px',
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: '30px',
    fontWeight: '700',
    color: '#1D6B45',
    letterSpacing: '-0.5px',
    display: 'block',
  },
  greetingLang: {
    fontSize: '13px',
    color: '#78716C',
    fontWeight: '500',
  },
  langPills: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  langPill: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    background: '#F5F5F4',
    color: '#78716C',
    transition: 'all 0.3s ease',
  },
  langPillActive: {
    background: '#1D6B45',
    color: '#FFFFFF',
  },

  // Input
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    borderRadius: '12px',
    border: '2px solid #E7E5E4',
    backgroundColor: '#FAFAF9',
    color: '#1C1917',
  },

  // Language cards
  langGrid: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' },
  langCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 16px',
    borderRadius: '14px',
    border: '2px solid #E7E5E4',
    backgroundColor: '#FAFAF9',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  langCardActive: { borderColor: '#1D6B45', backgroundColor: '#E8F5EE' },
  langFlag: { fontSize: '26px', lineHeight: '1' },
  langLabel: { fontSize: '15px', fontWeight: '600', color: '#1C1917' },
  langRegion: { fontSize: '12px', color: '#78716C', marginTop: '1px' },
  langSample: { fontSize: '13px', color: '#A8A29E', fontStyle: 'italic' },

  // Puzzle
  puzzleEyebrow: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#E07B39',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  flashcard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '28px 20px',
    borderRadius: '18px',
    background: 'linear-gradient(135deg, #1D6B45 0%, #134D31 100%)',
    boxShadow: '0 4px 20px rgba(29,107,69,0.25)',
  },
  flashcardWord: {
    fontSize: '40px',
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: '-0.5px',
  },
  flashcardPhonetic: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: '0.3px',
  },
  puzzleOptions: { display: 'flex', flexDirection: 'column', gap: '8px' },
  puzzleOption: {
    padding: '14px 18px',
    borderRadius: '12px',
    border: '2px solid #E7E5E4',
    backgroundColor: '#FAFAF9',
    fontSize: '15px',
    fontWeight: '500',
    color: '#1C1917',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
  },
  puzzleOptionCorrect: {
    borderColor: '#1D6B45',
    backgroundColor: '#E8F5EE',
    color: '#1D6B45',
    fontWeight: '600',
  },
  puzzleOptionWrong: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
  },
  feedback: {
    padding: '14px 16px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  feedbackCorrect: { backgroundColor: '#E8F5EE', border: '1px solid #BBF7D0' },
  feedbackWrong: { backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' },
  feedbackTitle: { fontSize: '14px', fontWeight: '600', color: '#1C1917' },
  feedbackNote: { fontSize: '13px', color: '#78716C', lineHeight: '1.5' },

  // Study time
  timeGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' },
  timeCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '18px 12px',
    borderRadius: '14px',
    border: '2px solid #E7E5E4',
    backgroundColor: '#FAFAF9',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  timeCardActive: { borderColor: '#1D6B45', backgroundColor: '#E8F5EE' },
  timeIcon: { fontSize: '26px', lineHeight: '1' },
  timeLabel: { fontSize: '14px', fontWeight: '600', color: '#1C1917' },
  timeDesc: { fontSize: '12px', color: '#78716C', textAlign: 'center' },

  // Habits
  section: { display: 'flex', flexDirection: 'column', gap: '10px' },
  sectionLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#78716C',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },
  goalGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' },
  goalCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '14px 10px',
    borderRadius: '12px',
    border: '2px solid #E7E5E4',
    backgroundColor: '#FAFAF9',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  goalCardActive: { borderColor: '#1D6B45', backgroundColor: '#E8F5EE' },
  goalMin: { fontSize: '17px', fontWeight: '700', color: '#1D6B45' },
  goalDesc: { fontSize: '11px', color: '#78716C' },
  interestGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' },
  interestChip: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '2px solid #E7E5E4',
    backgroundColor: '#FAFAF9',
    fontSize: '14px',
    fontWeight: '500',
    color: '#1C1917',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  interestChipActive: { borderColor: '#E07B39', backgroundColor: '#FFF0E6', color: '#C05C1E' },

  // Footer
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  btnPrimary: {
    padding: '13px 24px',
    borderRadius: '12px',
    backgroundColor: '#1D6B45',
    color: '#FFFFFF',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    letterSpacing: '-0.2px',
  },
  btnDisabled: { backgroundColor: '#C7D4CD', cursor: 'not-allowed' },
  btnBack: {
    padding: '13px 16px',
    borderRadius: '12px',
    backgroundColor: 'transparent',
    color: '#78716C',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    border: '2px solid #E7E5E4',
  },
  tagline: {
    fontSize: '13px',
    color: '#A8A29E',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: '1.5',
    marginTop: '-8px',
  },
}

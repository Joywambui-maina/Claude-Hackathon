import { useState } from 'react'
import { storage } from '../utils/storage'
import type { Language, StudyTime, DailyGoalMinutes, ContentInterest, User } from '../types'

const TOTAL_STEPS = 4

const LANGUAGES: { value: Language; label: string; region: string; flag: string }[] = [
  { value: 'swahili', label: 'Swahili', region: 'East Africa', flag: '🇰🇪' },
  { value: 'yoruba', label: 'Yoruba', region: 'West Africa', flag: '🇳🇬' },
  { value: 'spanish', label: 'Spanish', region: 'Latin America', flag: '🌎' },
]

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

export default function Onboarding({ onDone }: { onDone: (u: User) => void }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [language, setLanguage] = useState<Language | null>(null)
  const [studyTime, setStudyTime] = useState<StudyTime | null>(null)
  const [dailyGoal, setDailyGoal] = useState<DailyGoalMinutes | null>(null)
  const [interests, setInterests] = useState<ContentInterest[]>([])

  function toggleInterest(interest: ContentInterest) {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    )
  }

  function canAdvance(): boolean {
    if (step === 1) return name.trim().length > 0
    if (step === 2) return language !== null
    if (step === 3) return studyTime !== null
    if (step === 4) return dailyGoal !== null && interests.length > 0
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
          {step === 2 && <StepLanguage selected={language} onSelect={setLanguage} />}
          {step === 3 && <StepStudyTime selected={studyTime} onSelect={setStudyTime} />}
          {step === 4 && (
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

        {/* Tagline */}
        {step === 1 && (
          <p style={styles.tagline}>"Mizizi learns from you, not the other way around."</p>
        )}
      </div>
    </div>
  )
}

// ── Step 1: Name ──────────────────────────────────────────────────────────────

function StepName({ name, onChange }: { name: string; onChange: (v: string) => void }) {
  return (
    <div style={styles.stepWrap}>
      <h1 style={styles.heading}>What should we call you?</h1>
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
        onKeyDown={(e) => e.key === 'Enter' && name.trim() && (e.target as HTMLInputElement).blur()}
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
            <span style={styles.langLabel}>{lang.label}</span>
            <span style={styles.langRegion}>{lang.region}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Step 3: Study time ────────────────────────────────────────────────────────

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

// ── Step 4: Habits ────────────────────────────────────────────────────────────

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
        <div
          key={i}
          style={{
            ...styles.dot,
            ...(i < current ? styles.dotFilled : {}),
          }}
        />
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
    gap: '28px',
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
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  dots: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: '28px',
    height: '5px',
    borderRadius: '3px',
    backgroundColor: '#E7E5E4',
    transition: 'background-color 0.3s ease',
  },
  dotFilled: {
    backgroundColor: '#1D6B45',
  },
  body: {
    flex: 1,
  },
  stepWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1C1917',
    lineHeight: '1.25',
    fontFamily: "'Playfair Display', Georgia, serif",
    letterSpacing: '-0.4px',
  },
  subheading: {
    fontSize: '14px',
    color: '#78716C',
    lineHeight: '1.5',
    marginTop: '-4px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    borderRadius: '12px',
    border: '2px solid #E7E5E4',
    backgroundColor: '#FAFAF9',
    color: '#1C1917',
    marginTop: '8px',
    transition: 'border-color 0.2s',
  },
  langGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '8px',
  },
  langCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 18px',
    borderRadius: '14px',
    border: '2px solid #E7E5E4',
    backgroundColor: '#FAFAF9',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  langCardActive: {
    borderColor: '#1D6B45',
    backgroundColor: '#E8F5EE',
  },
  langFlag: {
    fontSize: '28px',
    lineHeight: '1',
  },
  langLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1C1917',
    flex: 1,
  },
  langRegion: {
    fontSize: '13px',
    color: '#78716C',
  },
  timeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginTop: '8px',
  },
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
  timeCardActive: {
    borderColor: '#1D6B45',
    backgroundColor: '#E8F5EE',
  },
  timeIcon: {
    fontSize: '26px',
    lineHeight: '1',
  },
  timeLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1C1917',
  },
  timeDesc: {
    fontSize: '12px',
    color: '#78716C',
    textAlign: 'center',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  sectionLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#78716C',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },
  goalGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
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
  goalCardActive: {
    borderColor: '#1D6B45',
    backgroundColor: '#E8F5EE',
  },
  goalMin: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#1D6B45',
  },
  goalDesc: {
    fontSize: '11px',
    color: '#78716C',
  },
  interestGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
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
  interestChipActive: {
    borderColor: '#E07B39',
    backgroundColor: '#FFF0E6',
    color: '#C05C1E',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginTop: '-4px',
  },
  btnPrimary: {
    padding: '13px 24px',
    borderRadius: '12px',
    backgroundColor: '#1D6B45',
    color: '#FFFFFF',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
    letterSpacing: '-0.2px',
  },
  btnDisabled: {
    backgroundColor: '#C7D4CD',
    cursor: 'not-allowed',
  },
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
    marginTop: '-12px',
  },
}

import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { Language } from '../types'
import {
  getProverbsByLanguage,
  getNamesByLanguage,
  getWordQuizzesByLanguage,
  type Proverb,
  type HeritageName,
  type WordQuiz,
} from '../data/games'

interface ExploreProps {
  language: Language
}

const LANG_LABELS: Record<Language, string> = {
  swahili: 'Swahili',
  yoruba: 'Yoruba',
  spanish: 'Español',
}

// ── Word Quiz Card ────────────────────────────────────────────────────────────

function WordQuizCard({ quiz }: { quiz: WordQuiz }) {
  const [chosen, setChosen] = useState<string | null>(null)
  const correct = chosen === quiz.correct
  const answered = chosen !== null

  const categoryEmoji: Record<WordQuiz['category'], string> = {
    greeting: '👋', nature: '🌿', family: '👨‍👩‍👧', spirit: '✨', food: '🍲',
  }

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      border: `1.5px solid ${answered ? (correct ? 'rgba(76,175,80,0.4)' : 'rgba(196,98,45,0.3)') : 'var(--border)'}`,
      padding: '1.375rem',
      marginBottom: '1rem',
      boxShadow: 'var(--shadow-card)',
      transition: 'border-color 0.2s ease',
    }}>
      {/* Category + phonetic */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{
          background: 'var(--brown-50)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-pill)',
          padding: '0.1875rem 0.625rem',
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: 'var(--brown-400)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}>
          {categoryEmoji[quiz.category]} {quiz.category}
        </span>
        <span style={{ fontSize: '0.8125rem', color: 'var(--brown-300)', fontStyle: 'italic' }}>
          /{quiz.phonetic}/
        </span>
      </div>

      {/* Word */}
      <p style={{
        fontFamily: 'var(--font-native)',
        fontSize: '2.25rem',
        fontWeight: 700,
        color: 'var(--brown-900)',
        margin: '0 0 0.25rem',
        letterSpacing: '-0.01em',
      }}>
        {quiz.word}
      </p>
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--brown-300)',
        margin: '0 0 1.375rem',
        fontStyle: 'italic',
      }}>
        What does this mean?
      </p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: answered ? '1rem' : 0 }}>
        {quiz.options.map(opt => {
          const isChosen = chosen === opt
          const isCorrect = opt === quiz.correct
          let bg = 'var(--bg)'
          let border = 'var(--border)'
          let color = 'var(--brown-700)'
          if (answered) {
            if (isCorrect) { bg = 'rgba(76,175,80,0.08)'; border = 'rgba(76,175,80,0.5)'; color = '#2E7D32' }
            else if (isChosen) { bg = 'rgba(196,98,45,0.08)'; border = 'rgba(196,98,45,0.4)'; color = 'var(--terra-500)' }
          } else if (isChosen) {
            bg = 'var(--brown-50)'; border = 'var(--terra-500)'
          }
          return (
            <button
              key={opt}
              disabled={answered}
              onClick={() => setChosen(opt)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: `1.5px solid ${border}`,
                background: bg,
                color,
                fontSize: '0.9375rem',
                fontWeight: isCorrect && answered ? 600 : 400,
                cursor: answered ? 'default' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{opt}</span>
              {answered && isCorrect && <span>✓</span>}
              {answered && isChosen && !isCorrect && <span>✗</span>}
            </button>
          )
        })}
      </div>

      {/* Reveal note */}
      {answered && (
        <div style={{
          background: correct ? 'rgba(76,175,80,0.06)' : 'var(--brown-50)',
          border: `1px solid ${correct ? 'rgba(76,175,80,0.2)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-sm)',
          padding: '0.75rem 1rem',
          marginTop: '0.75rem',
        }}>
          <p style={{
            fontSize: '0.8125rem',
            color: correct ? '#2E7D32' : 'var(--brown-400)',
            fontWeight: 600,
            margin: '0 0 0.375rem',
          }}>
            {correct ? '✓ Correct!' : '✗ Not quite — the answer is: ' + quiz.correct}
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--brown-400)', margin: 0, lineHeight: 1.65 }}>
            {quiz.culturalNote}
          </p>
        </div>
      )}
    </div>
  )
}

// ── Proverb Card ──────────────────────────────────────────────────────────────

function ProverbCard({ proverb }: { proverb: Proverb }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div style={{
      background: 'linear-gradient(145deg, #1C0E06 0%, #3D1A0A 100%)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      marginBottom: '0.875rem',
      boxShadow: '0 4px 20px rgba(28,14,6,0.2)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.25rem' }}>🌿</span>
        <span style={{
          fontSize: '0.625rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--gold-500)',
          opacity: 0.7,
        }}>
          {proverb.region}
        </span>
      </div>

      {/* Native proverb */}
      <p style={{
        fontFamily: 'var(--font-native)',
        fontSize: '1.125rem',
        lineHeight: 1.8,
        color: '#FBF5EC',
        fontWeight: 600,
        margin: '0 0 0.5rem',
      }}>
        {proverb.native}
      </p>

      {/* English translation */}
      <p style={{
        fontSize: '0.9375rem',
        color: 'rgba(255,255,255,0.5)',
        fontStyle: 'italic',
        margin: '0 0 1.125rem',
        lineHeight: 1.6,
      }}>
        "{proverb.english}"
      </p>

      {/* Reveal meaning */}
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          style={{
            width: '100%',
            padding: '0.625rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(212,150,42,0.25)',
            background: 'rgba(212,150,42,0.1)',
            color: 'var(--gold-500)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
        >
          What does this mean? →
        </button>
      ) : (
        <div style={{
          background: 'rgba(212,150,42,0.08)',
          border: '1px solid rgba(212,150,42,0.2)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.875rem 1rem',
        }}>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.7 }}>
            {proverb.meaning}
          </p>
        </div>
      )}
    </div>
  )
}

// ── Name Card ─────────────────────────────────────────────────────────────────

function NameCard({ hname }: { hname: HeritageName }) {
  const [flipped, setFlipped] = useState(false)
  const genderEmoji = hname.gender === 'male' ? '♂' : hname.gender === 'female' ? '♀' : '◇'
  return (
    <div
      onClick={() => setFlipped(v => !v)}
      style={{
        minWidth: 200,
        maxWidth: 200,
        background: flipped
          ? 'linear-gradient(145deg, #F9F1E8 0%, #EFE0C8 100%)'
          : 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: `1.5px solid ${flipped ? 'rgba(196,98,45,0.2)' : 'var(--border)'}`,
        padding: '1.375rem 1.25rem',
        cursor: 'pointer',
        flexShrink: 0,
        boxShadow: flipped ? '0 4px 20px rgba(196,98,45,0.12)' : 'var(--shadow-card)',
        transition: 'all 0.2s ease',
        minHeight: 180,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      } as CSSProperties}
    >
      {!flipped ? (
        <>
          <div>
            <span style={{
              fontSize: '0.625rem',
              color: 'var(--brown-300)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}>
              {genderEmoji} Heritage Name
            </span>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--brown-900)',
              margin: '0.5rem 0 0',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}>
              {hname.name}
            </p>
          </div>
          <p style={{ fontSize: '0.6875rem', color: 'var(--brown-200)', margin: 0, letterSpacing: '0.05em' }}>
            tap to reveal meaning ↓
          </p>
        </>
      ) : (
        <>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--brown-400)', margin: '0 0 0.25rem', fontStyle: 'italic' }}>
              {hname.name} means
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.375rem',
              fontWeight: 700,
              color: 'var(--brown-900)',
              margin: '0 0 0.875rem',
              lineHeight: 1.25,
            }}>
              {hname.meaning}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--brown-500)', margin: 0, lineHeight: 1.7 }}>
              {hname.context}
            </p>
          </div>
          <p style={{ fontSize: '0.6875rem', color: 'var(--brown-300)', margin: '0.75rem 0 0', letterSpacing: '0.05em' }}>
            tap to flip back ↑
          </p>
        </>
      )}
    </div>
  )
}

// ── Explore screen ────────────────────────────────────────────────────────────

export default function Explore({ language }: ExploreProps) {
  const [activeTab, setActiveTab] = useState<'quiz' | 'proverbs' | 'names'>('quiz')

  const quizzes = getWordQuizzesByLanguage(language)
  const provList = getProverbsByLanguage(language)
  const names = getNamesByLanguage(language)

  const TABS = [
    { id: 'quiz' as const, label: 'Word Quiz', emoji: '🧠' },
    { id: 'proverbs' as const, label: 'Proverbs', emoji: '🌿' },
    { id: 'names' as const, label: 'Names', emoji: '✨' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-ui)' }}>

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #0D1B2A 0%, #1B3A5C 60%, #2E6DA4 100%)',
        padding: '2rem 2.5rem',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '2rem',
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            color: '#F0F6FF',
            fontSize: '2.25rem',
            fontWeight: 300,
            lineHeight: 1.15,
            margin: '0 0 0.375rem',
          }}>
            Explore
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', margin: 0 }}>
            Games, proverbs & heritage names
          </p>
        </div>

        {/* Tabs in top bar */}
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          {TABS.map(tab => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.5625rem 1.125rem',
                  borderRadius: 10,
                  border: `1px solid ${active ? 'rgba(212,150,42,0.5)' : 'rgba(255,255,255,0.12)'}`,
                  background: active ? 'rgba(212,150,42,0.15)' : 'transparent',
                  color: active ? 'var(--gold-500)' : 'rgba(255,255,255,0.5)',
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                }}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <main style={{ padding: '2rem 2.5rem' }}>

        {activeTab === 'quiz' && (
          <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--brown-400)', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
              Tap an answer to guess the meaning. Each word carries a story.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              {quizzes.map(q => <WordQuizCard key={q.id} quiz={q} />)}
            </div>
          </div>
        )}

        {activeTab === 'proverbs' && (
          <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--brown-400)', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
              Read the proverb. Sit with it. Then reveal what your elders meant.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              {provList.map(p => <ProverbCard key={p.id} proverb={p} />)}
            </div>
          </div>
        )}

        {activeTab === 'names' && (
          <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--brown-400)', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
              Tap a card to reveal what the name means and why it was given.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {names.map(n => <NameCard key={n.id} hname={n} />)}
              {/* Closing card */}
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                padding: '1.375rem 1.25rem',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: 180,
              }}>
                <p style={{ fontSize: '1.75rem', margin: '0 0 0.5rem' }}>✨</p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--brown-700)', margin: '0 0 0.375rem', fontWeight: 500 }}>
                  Your name has a story too.
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--brown-400)', margin: 0, lineHeight: 1.6 }}>
                  In {LANG_LABELS[language]} tradition, every name is a gift.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

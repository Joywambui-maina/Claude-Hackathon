import { useState } from 'react'
import type { User, Language, Entry } from '../types'
import { storage } from '../utils/storage'
import { getPromptByLanguage } from '../data/prompts'
import { getEventForLanguage } from '../data/events'

interface HomeProps {
  user: User
  onWrite: (lang: Language) => void
}

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'swahili', label: 'Swahili' },
  { value: 'yoruba', label: 'Yoruba' },
  { value: 'spanish', label: 'Español' },
]

function getStreak(entries: Entry[]): number {
  if (!entries.length) return 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = new Set(
    entries.map(e => {
      const d = new Date(e.date)
      d.setHours(0, 0, 0, 0)
      return d.getTime()
    }),
  )
  let streak = 0
  const d = new Date(today)
  while (days.has(d.getTime())) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 5) return 'Good night'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  if (h < 21) return 'Good evening'
  return 'Good night'
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

function shouldShowBanner(): boolean {
  const h = new Date().getHours()
  return (h >= 6 && h < 10) || (h >= 19 && h < 21)
}

export default function Home({ user, onWrite }: HomeProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(user.language)
  const [selectedMode, setSelectedMode] = useState<'write' | 'voice'>('write')

  const entries = storage.getEntries()
  const streak = getStreak(entries)
  const showBanner = shouldShowBanner()
  const prompt = getPromptByLanguage(selectedLanguage)
  const event = getEventForLanguage(selectedLanguage)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-ui)' }}>

      {/* ── Header ──────────────────────────────────────────────── */}
      <header style={{
        background: 'linear-gradient(160deg, #1C0E06 0%, #6B2A10 52%, #C4622D 100%)',
        padding: '2.75rem 1.375rem 2.5rem',
      }}>
        {/* Top row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2.125rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--gold-500)',
            fontSize: '1.25rem',
            letterSpacing: '0.2em',
            fontStyle: 'italic',
          }}>
            mizizi
          </span>

          {streak > 0 ? (
            <span style={{
              background: 'rgba(212, 150, 42, 0.15)',
              border: '1px solid rgba(212, 150, 42, 0.3)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.3125rem 0.875rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--gold-500)',
              letterSpacing: '0.01em',
            }}>
              🔥 {streak} day{streak !== 1 ? 's' : ''}
            </span>
          ) : (
            <span style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.02em',
            }}>
              Start your streak
            </span>
          )}
        </div>

        {/* Greeting */}
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.9375rem',
          fontWeight: 300,
          margin: '0 0 0.25rem',
          letterSpacing: '0.02em',
        }}>
          {getGreeting()},
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          color: '#FBF5EC',
          fontSize: 'clamp(2.25rem, 9vw, 2.875rem)',
          fontWeight: 300,
          lineHeight: 1.1,
          margin: '0 0 0.5rem',
        }}>
          {user.name}
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.22)',
          fontSize: '0.75rem',
          letterSpacing: '0.04em',
          margin: 0,
        }}>
          {formatDate()}
        </p>
      </header>

      {/* ── Main content ─────────────────────────────────────────── */}
      <main style={{ padding: '1.5rem 1.125rem 2rem' }}>

        {/* 20-minutes banner */}
        {showBanner && (
          <div style={{
            background: 'var(--gold-100)',
            border: '1px solid rgba(212, 150, 42, 0.22)',
            borderRadius: 'var(--radius-md)',
            padding: '0.875rem 1.125rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
          }}>
            <span style={{ fontSize: '1.125rem', lineHeight: 1, paddingTop: '0.0625rem' }}>✨</span>
            <div>
              <p style={{
                color: 'var(--gold-600)',
                fontSize: '0.9375rem',
                fontWeight: 600,
                margin: '0 0 0.1875rem',
              }}>
                Your 20 minutes starts now
              </p>
              <p style={{
                color: 'var(--brown-400)',
                fontSize: '0.8125rem',
                margin: 0,
                lineHeight: 1.5,
              }}>
                A little roots work, every day.
              </p>
            </div>
          </div>
        )}

        {/* ── Language selector ──────────────────────────────────── */}
        <section style={{ marginBottom: '1.25rem' }}>
          <p style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--brown-400)',
            margin: '0 0 0.625rem',
          }}>
            Today's prompt in
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {LANGUAGES.map(lang => {
              const active = selectedLanguage === lang.value
              return (
                <button
                  key={lang.value}
                  onClick={() => setSelectedLanguage(lang.value)}
                  style={{
                    padding: '0.4375rem 1.0625rem',
                    borderRadius: 'var(--radius-pill)',
                    border: `1.5px solid ${active ? 'var(--terra-500)' : 'var(--border)'}`,
                    background: active ? 'var(--terra-500)' : 'var(--bg-card)',
                    color: active ? '#FBF5EC' : 'var(--brown-500)',
                    fontSize: '0.875rem',
                    fontWeight: active ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: active ? '0 2px 8px rgba(196, 98, 45, 0.3)' : 'none',
                  }}
                >
                  {lang.label}
                </button>
              )
            })}
          </div>
        </section>

        {/* ── Story + prompt card ────────────────────────────────── */}
        <section style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          padding: '1.5rem',
          marginBottom: '1.25rem',
          boxShadow: 'var(--shadow-card)',
        }}>
          {/* Section label */}
          <p style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--terra-500)',
            margin: '0 0 1.125rem',
          }}>
            Today's Story
          </p>

          {/* Story — native script */}
          <p style={{
            fontFamily: 'var(--font-native)',
            fontSize: '1.0625rem',
            lineHeight: 1.9,
            color: 'var(--brown-900)',
            margin: '0 0 0.875rem',
          }}>
            {prompt.storyNative}
          </p>

          {/* Story — English */}
          <p style={{
            fontSize: '0.875rem',
            lineHeight: 1.75,
            color: 'var(--brown-500)',
            fontStyle: 'italic',
            margin: 0,
          }}>
            {prompt.storyEnglish}
          </p>

          {/* Ornate divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            margin: '1.375rem 0',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ color: 'var(--terra-400)', fontSize: '0.75rem', lineHeight: 1 }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Prompt — native script */}
          <p style={{
            fontFamily: 'var(--font-native)',
            fontSize: '1.0625rem',
            lineHeight: 1.9,
            color: 'var(--brown-900)',
            fontWeight: 700,
            margin: '0 0 0.5rem',
          }}>
            {prompt.promptNative}
          </p>

          {/* Prompt — English */}
          <p style={{
            fontSize: '0.9375rem',
            lineHeight: 1.65,
            color: 'var(--brown-500)',
            margin: '0 0 1.125rem',
          }}>
            {prompt.promptEnglish}
          </p>

          {/* Cultural note */}
          <div style={{
            background: 'var(--brown-50)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem 1rem',
            display: 'flex',
            gap: '0.5625rem',
            alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '0.875rem', flexShrink: 0, lineHeight: 1.65 }}>💡</span>
            <p style={{
              fontSize: '0.8125rem',
              lineHeight: 1.65,
              color: 'var(--brown-400)',
              margin: 0,
            }}>
              {prompt.culturalNote}
            </p>
          </div>
        </section>

        {/* ── Expression mode ────────────────────────────────────── */}
        <section style={{ marginBottom: '1rem' }}>
          <p style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--brown-400)',
            margin: '0 0 0.625rem',
          }}>
            How will you respond?
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {/* Write */}
            <button
              onClick={() => setSelectedMode('write')}
              style={{
                flex: 1,
                padding: '0.9375rem',
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${selectedMode === 'write' ? 'var(--terra-500)' : 'var(--border)'}`,
                background: selectedMode === 'write' ? 'var(--brown-900)' : 'var(--bg-card)',
                color: selectedMode === 'write' ? '#FBF5EC' : 'var(--brown-500)',
                fontSize: '0.9375rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.15s ease',
                boxShadow: selectedMode === 'write' ? '0 2px 12px rgba(28,14,6,0.2)' : 'var(--shadow-card)',
              }}
            >
              <span>✍️</span>
              <span>Write</span>
            </button>

            {/* Voice — coming soon */}
            <button
              disabled
              style={{
                flex: 1,
                padding: '0.9375rem',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--border)',
                background: '#FAFAFA',
                color: 'var(--brown-200)',
                fontSize: '0.9375rem',
                fontWeight: 400,
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                position: 'relative',
              }}
            >
              <span style={{ opacity: 0.55 }}>🎙️</span>
              <span>Voice</span>
              <span style={{
                position: 'absolute',
                top: '-0.5625rem',
                right: '0.625rem',
                background: 'var(--brown-100)',
                color: 'var(--brown-400)',
                fontSize: '0.5625rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                padding: '0.125rem 0.4375rem',
                borderRadius: 'var(--radius-pill)',
                textTransform: 'uppercase',
              }}>
                Soon
              </span>
            </button>
          </div>
        </section>

        {/* ── CTA button ─────────────────────────────────────────── */}
        <button
          onClick={() => onWrite(selectedLanguage)}
          style={{
            width: '100%',
            padding: '1.0625rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: 'var(--terra-500)',
            color: '#FBF5EC',
            fontSize: '1.0625rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 16px rgba(196, 98, 45, 0.35)',
            transition: 'opacity 0.15s ease, transform 0.1s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.985)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span>Begin Writing</span>
          <span style={{ fontSize: '1.125rem' }}>→</span>
        </button>

        {/* ── Campus event card ──────────────────────────────────── */}
        <section style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--shadow-card)',
        }}>
          <p style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--gold-500)',
            margin: '0 0 0.75rem',
          }}>
            On Campus Today
          </p>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.3125rem',
            fontWeight: 500,
            color: 'var(--brown-900)',
            margin: '0 0 0.375rem',
            lineHeight: 1.3,
          }}>
            {event.title}
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--brown-500)',
            lineHeight: 1.65,
            margin: '0 0 1rem',
          }}>
            {event.description}
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <span style={{
              fontSize: '0.8125rem',
              color: 'var(--brown-400)',
            }}>
              📍 {event.location}
            </span>
            <span style={{
              background: 'var(--gold-100)',
              border: '1px solid rgba(212, 150, 42, 0.2)',
              color: 'var(--gold-600)',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.25rem 0.6875rem',
              borderRadius: 'var(--radius-pill)',
              letterSpacing: '0.01em',
            }}>
              {event.day} · {event.time}
            </span>
          </div>
        </section>

      </main>
    </div>
  )
}

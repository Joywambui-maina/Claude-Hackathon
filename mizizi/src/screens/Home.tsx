import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { User, Language, Entry, Song, FolkStory, Poem } from '../types'
import { storage } from '../utils/storage'
import { getPromptByLanguage } from '../data/prompts'
import { getEventForLanguage, getUpcomingEvents, campusSpaces } from '../data/events'
import type { CampusEvent, CampusSpace } from '../data/events'
import { getSongsByLanguage } from '../data/songs'
import { getFolkStoriesByLanguage } from '../data/folkstories'
import { getPoemsByLanguage } from '../data/poems'

export interface HomeProps {
  user: User
  language: Language
  onWrite: () => void
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
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

function getStreak(entries: Entry[]): number {
  if (!entries.length) return 0
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const days = new Set(entries.map(e => { const d = new Date(e.date); d.setHours(0,0,0,0); return d.getTime() }))
  let streak = 0; const d = new Date(today)
  while (days.has(d.getTime())) { streak++; d.setDate(d.getDate() - 1) }
  return streak
}

// ── Card components ───────────────────────────────────────────────────────────

function SectionHead({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
      <span style={{ fontSize: '1rem' }}>{emoji}</span>
      <p style={{
        fontSize: '0.6875rem',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--terra-500)',
        margin: 0,
      }}>
        {title}
      </p>
    </div>
  )
}

function SongCard({ song }: { song: Song }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      onClick={() => setExpanded(v => !v)}
      style={{
        background: 'linear-gradient(145deg, #1C0E06 0%, #3D1A0A 100%)',
        borderRadius: 14,
        padding: '1.125rem',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(28,14,6,0.18)',
        transition: 'transform 0.15s ease',
        marginBottom: '0.75rem',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem' }}>🎵</span>
        <span style={{ fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-500)', opacity: 0.7 }}>
          {song.region}
        </span>
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9375rem', fontWeight: 600, color: '#FBF5EC', margin: '0 0 0.125rem', lineHeight: 1.3 }}>
        {song.titleNative}
      </p>
      <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', margin: '0 0 0.75rem', fontStyle: 'italic' }}>
        {song.title}
      </p>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.625rem' }}>
        {(expanded ? song.linesNative : song.linesNative.slice(0, 2)).map((line, i) => (
          <p key={i} style={{ fontSize: '0.8125rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', margin: 0, fontFamily: 'var(--font-native)' }}>
            {line}
          </p>
        ))}
        {expanded && (
          <>
            <div style={{ marginTop: '0.625rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.625rem' }}>
              {song.linesEnglish.map((line, i) => (
                <p key={i} style={{ fontSize: '0.75rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', margin: 0, fontStyle: 'italic' }}>{line}</p>
              ))}
            </div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--gold-500)', margin: '0.625rem 0 0', opacity: 0.8, lineHeight: 1.6 }}>
              {song.culturalNote}
            </p>
          </>
        )}
        <p style={{ fontSize: '0.5625rem', color: 'rgba(255,255,255,0.2)', margin: '0.375rem 0 0', letterSpacing: '0.05em' }}>
          {expanded ? 'tap to collapse ↑' : 'tap to expand ↓'}
        </p>
      </div>
    </div>
  )
}

function StoryCard({ story }: { story: FolkStory }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      onClick={() => setExpanded(v => !v)}
      style={{
        background: 'var(--bg-card)',
        borderRadius: 14,
        border: '1px solid var(--border)',
        padding: '1.125rem',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-card)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        marginBottom: '0.75rem',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(28,14,6,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)' }}
    >
      <span style={{ fontSize: '1.125rem', display: 'block', marginBottom: '0.5rem' }}>📖</span>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--brown-900)', margin: '0 0 0.125rem', lineHeight: 1.3 }}>
        {story.titleNative}
      </p>
      <p style={{ fontSize: '0.6875rem', color: 'var(--brown-300)', margin: '0 0 0.75rem', fontStyle: 'italic' }}>{story.title}</p>
      <p style={{
        fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--brown-500)', margin: '0 0 0.5rem',
        overflow: expanded ? 'visible' : 'hidden',
        display: '-webkit-box', WebkitLineClamp: expanded ? 'none' : 3, WebkitBoxOrient: 'vertical',
      } as CSSProperties}>
        {story.excerptEnglish}
      </p>
      {expanded && (
        <div style={{ background: 'var(--brown-50)', borderRadius: 8, border: '1px solid var(--border)', padding: '0.625rem 0.875rem', marginBottom: '0.5rem' }}>
          <p style={{ fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terra-500)', margin: '0 0 0.25rem' }}>Moral</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--brown-500)', margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>{story.moral}</p>
        </div>
      )}
      <p style={{ fontSize: '0.5625rem', color: 'var(--brown-200)', margin: 0, letterSpacing: '0.05em' }}>
        {expanded ? 'tap to collapse ↑' : 'tap to read ↓'}
      </p>
    </div>
  )
}

function PoemCard({ poem }: { poem: Poem }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      onClick={() => setExpanded(v => !v)}
      style={{
        background: 'linear-gradient(145deg, #F9F1E8 0%, #EFE0C8 100%)',
        borderRadius: 14,
        border: '1px solid rgba(196,98,45,0.12)',
        padding: '1.125rem',
        cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(196,98,45,0.08)',
        transition: 'transform 0.15s ease',
        marginBottom: '0.75rem',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1rem' }}>✦</span>
        <span style={{ fontSize: '0.6875rem', color: 'var(--brown-400)', fontStyle: 'italic' }}>{poem.author}</span>
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--brown-900)', margin: '0 0 0.125rem', lineHeight: 1.3 }}>
        {poem.titleNative}
      </p>
      <p style={{ fontSize: '0.6875rem', color: 'var(--brown-300)', margin: '0 0 0.75rem', fontStyle: 'italic' }}>{poem.title}</p>
      <div style={{ borderTop: '1px solid rgba(196,98,45,0.12)', paddingTop: '0.625rem' }}>
        {(expanded ? poem.linesNative : poem.linesNative.slice(0, 3)).map((line, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-native)', fontSize: '0.875rem', lineHeight: 1.9, color: 'var(--brown-800)', margin: 0 }}>
            {line}
          </p>
        ))}
        {expanded && (
          <>
            <div style={{ marginTop: '0.625rem', borderTop: '1px solid rgba(196,98,45,0.12)', paddingTop: '0.625rem', marginBottom: '0.625rem' }}>
              {poem.linesEnglish.map((line, i) => (
                <p key={i} style={{ fontSize: '0.75rem', lineHeight: 1.85, color: 'var(--brown-400)', margin: 0, fontStyle: 'italic' }}>{line}</p>
              ))}
            </div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--terra-500)', margin: 0, lineHeight: 1.6 }}>{poem.culturalNote}</p>
          </>
        )}
        <p style={{ fontSize: '0.5625rem', color: 'var(--brown-200)', margin: '0.375rem 0 0', letterSpacing: '0.05em' }}>
          {expanded ? 'tap to collapse ↑' : 'tap to read ↓'}
        </p>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Home({ user, language, onWrite }: HomeProps) {
  const entries = storage.getEntries()
  const streak = getStreak(entries)
  const prompt = getPromptByLanguage(language)
  const event = getEventForLanguage(language)
  const songs = getSongsByLanguage(language)
  const stories = getFolkStoriesByLanguage(language)
  const poemsList = getPoemsByLanguage(language)

  const LANG_LABEL: Record<Language, string> = { swahili: 'Swahili', yoruba: 'Yoruba', spanish: 'Español' }
  const LANG_FLAG: Record<Language, string> = { swahili: '🇰🇪', yoruba: '🇳🇬', spanish: '🌎' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Top bar ──────────────────────────────────────────────── */}
      <div style={{
        padding: '1.5rem 2.5rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ color: 'var(--brown-300)', fontSize: '0.875rem', margin: '0 0 0.125rem' }}>
            {getGreeting()}, <strong style={{ color: 'var(--brown-700)' }}>{user.name}</strong>
          </p>
          <p style={{ color: 'var(--brown-200)', fontSize: '0.75rem', margin: 0, letterSpacing: '0.03em' }}>{formatDate()}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            background: 'rgba(196,98,45,0.08)',
            border: '1px solid rgba(196,98,45,0.15)',
            borderRadius: 20,
            padding: '0.3125rem 0.875rem',
            fontSize: '0.8125rem',
            color: 'var(--brown-300)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}>
            {LANG_FLAG[language]} {LANG_LABEL[language]}
          </span>
          {streak > 0 && (
            <span style={{
              background: 'rgba(212,150,42,0.1)',
              border: '1px solid rgba(212,150,42,0.25)',
              borderRadius: 20,
              padding: '0.3125rem 0.875rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--gold-600)',
            }}>
              🔥 {streak} day{streak !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          HERO — TODAY'S CULTURAL IMMERSION
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '1.5rem 2.5rem 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1C0E06 0%, #4A1A08 40%, #8B3A1A 75%, #C4622D 100%)',
          borderRadius: 20,
          padding: '3rem 3.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative circle */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 320, height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,150,42,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -40, left: '35%',
            width: 200, height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,98,45,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.75rem' }}>
            <span style={{
              background: 'rgba(212,150,42,0.18)',
              border: '1px solid rgba(212,150,42,0.35)',
              borderRadius: 20,
              padding: '0.3125rem 0.875rem',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold-500)',
            }}>
              ✦ Today's Cultural Immersion
            </span>
          </div>

          {/* Two-column hero layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

            {/* Left: story text */}
            <div>
              <p style={{
                fontFamily: 'var(--font-native)',
                fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
                lineHeight: 2,
                color: '#FBF5EC',
                margin: '0 0 1.5rem',
                fontWeight: 400,
              }}>
                {prompt.storyNative}
              </p>
              <p style={{
                fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.5)',
                fontStyle: 'italic',
                margin: 0,
              }}>
                {prompt.storyEnglish}
              </p>
            </div>

            {/* Right: prompt + CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <p style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  margin: '0 0 0.75rem',
                }}>
                  Today's Prompt
                </p>
                <p style={{
                  fontFamily: 'var(--font-native)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  lineHeight: 1.85,
                  color: '#FBF5EC',
                  fontWeight: 700,
                  margin: '0 0 0.5rem',
                }}>
                  {prompt.promptNative}
                </p>
                <p style={{
                  fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.55)',
                  margin: 0,
                }}>
                  {prompt.promptEnglish}
                </p>
              </div>

              {/* Cultural note */}
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: '0.875rem 1rem',
                display: 'flex',
                gap: '0.5rem',
              }}>
                <span style={{ fontSize: '0.875rem', flexShrink: 0, lineHeight: 1.65 }}>💡</span>
                <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  {prompt.culturalNote}
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={onWrite}
                style={{
                  padding: '1rem 1.5rem',
                  borderRadius: 12,
                  border: 'none',
                  background: 'var(--gold-500)',
                  color: '#1C0E06',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 20px rgba(212,150,42,0.4)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span>✍️</span>
                <span>Respond to Today's Story</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THREE-COLUMN CONTENT LIBRARY
      ═══════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '2rem 2.5rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1.5rem',
        alignItems: 'start',
      }}>

        {/* SONGS */}
        <div>
          <SectionHead emoji="🎵" title="Songs" />
          {songs.map(s => <SongCard key={s.id} song={s} />)}
        </div>

        {/* FOLK STORIES */}
        <div>
          <SectionHead emoji="📖" title="Folk Stories" />
          {stories.map(s => <StoryCard key={s.id} story={s} />)}
        </div>

        {/* POEMS */}
        <div>
          <SectionHead emoji="✦" title="Poems" />
          {poemsList.map(p => <PoemCard key={p.id} poem={p} />)}
        </div>
      </section>

      {/* ── On Campus ────────────────────────────────────────────── */}
      <section style={{ padding: '0 2.5rem 2.5rem' }}>
        <SectionHead emoji="🏛️" title="On Campus" />
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 14,
          border: '1px solid var(--border)',
          padding: '1.375rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 500, color: 'var(--brown-900)', margin: '0 0 0.375rem', lineHeight: 1.3 }}>
              {event.title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--brown-500)', lineHeight: 1.65, margin: 0 }}>
              {event.description}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--brown-400)' }}>📍 {event.location}</span>
            <span style={{
              background: 'var(--gold-100)',
              border: '1px solid rgba(212,150,42,0.2)',
              color: 'var(--gold-600)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              padding: '0.3125rem 0.75rem',
              borderRadius: 20,
              textAlign: 'center',
            }}>
              {event.day} · {event.time}
            </span>
          </div>
        </div>
      </section>

    </div>
  )
}

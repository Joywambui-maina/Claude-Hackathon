import { useState } from 'react'
import type { CSSProperties } from 'react'
import { storage } from './utils/storage'
import type { User, Language } from './types'
import Onboarding from './screens/Onboarding'
import Home from './screens/Home'
import Respond from './screens/Respond'
import Archive from './screens/Archive'
import Explore from './screens/Explore'

type Screen = 'home' | 'respond' | 'archive' | 'explore'

const LANGUAGES: { value: Language; flag: string; label: string }[] = [
  { value: 'swahili', flag: '🇰🇪', label: 'Swahili' },
  { value: 'yoruba', flag: '🇳🇬', label: 'Yoruba' },
  { value: 'spanish', flag: '🌎', label: 'Español' },
]

const NAV_ITEMS: { id: Screen; emoji: string; label: string }[] = [
  { id: 'home', emoji: '🏠', label: 'Home' },
  { id: 'explore', emoji: '🧠', label: 'Explore' },
  { id: 'respond', emoji: '✍️', label: 'Write' },
  { id: 'archive', emoji: '📖', label: 'Archive' },
]

function getStreak(): number {
  const entries = storage.getEntries()
  if (!entries.length) return 0
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const days = new Set(entries.map(e => { const d = new Date(e.date); d.setHours(0,0,0,0); return d.getTime() }))
  let s = 0; const d = new Date(today)
  while (days.has(d.getTime())) { s++; d.setDate(d.getDate() - 1) }
  return s
}

export default function App() {
  const [user, setUser] = useState<User | null>(storage.getUser())
  const [screen, setScreen] = useState<Screen>('home')
  const [language, setLanguage] = useState<Language>(storage.getUser()?.language ?? 'swahili')

  if (!user) return <Onboarding onDone={(u: User) => { setUser(u); setLanguage(u.language) }} />

  const streak = getStreak()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-ui)' }}>

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside style={{
        width: 220,
        minWidth: 220,
        background: 'linear-gradient(180deg, #1C0E06 0%, #2E1208 60%, #3D1A0A 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        overflowY: 'auto',
        padding: '0 0 1.5rem',
      }}>
        {/* Logo */}
        <div style={{ padding: '2rem 1.5rem 1.75rem' }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--gold-500)',
            fontSize: '1.5rem',
            letterSpacing: '0.2em',
            fontStyle: 'italic',
            display: 'block',
          }}>
            mizizi
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
            roots · heritage · language
          </span>
        </div>

        {/* User card */}
        <div style={{
          margin: '0 0.875rem 1.5rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.07)',
          padding: '0.875rem 1rem',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6875rem', margin: '0 0 0.125rem', letterSpacing: '0.04em' }}>
            Welcome back,
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)',
            color: '#FBF5EC',
            fontSize: '1.125rem',
            fontWeight: 500,
            margin: '0 0 0.625rem',
          }}>
            {user.name}
          </p>
          {streak > 0 ? (
            <span style={{
              background: 'rgba(212,150,42,0.15)',
              border: '1px solid rgba(212,150,42,0.3)',
              borderRadius: 20,
              padding: '0.25rem 0.625rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--gold-500)',
            }}>
              🔥 {streak} day streak
            </span>
          ) : (
            <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.2)' }}>Start your streak today</span>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ padding: '0 0.75rem', marginBottom: '1.75rem' }}>
          <p style={{
            fontSize: '0.5625rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
            margin: '0 0.75rem 0.5rem',
          }}>
            Navigation
          </p>
          {NAV_ITEMS.map(item => {
            const active = screen === item.id
            return (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.6875rem 0.75rem',
                  borderRadius: 10,
                  border: 'none',
                  background: active ? 'rgba(196,98,45,0.2)' : 'transparent',
                  color: active ? '#FBF5EC' : 'rgba(255,255,255,0.45)',
                  fontSize: '0.9375rem',
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                  marginBottom: '0.125rem',
                  borderLeft: active ? '2px solid var(--terra-500)' : '2px solid transparent',
                } as CSSProperties}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Language selector */}
        <div style={{ padding: '0 0.75rem', marginBottom: 'auto' }}>
          <p style={{
            fontSize: '0.5625rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
            margin: '0 0.75rem 0.5rem',
          }}>
            Language
          </p>
          {LANGUAGES.map(lang => {
            const active = language === lang.value
            return (
              <button
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.5625rem 0.75rem',
                  borderRadius: 10,
                  border: 'none',
                  background: active ? 'rgba(212,150,42,0.12)' : 'transparent',
                  color: active ? 'var(--gold-500)' : 'rgba(255,255,255,0.4)',
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                  marginBottom: '0.125rem',
                } as CSSProperties}
              >
                <span style={{ fontSize: '1rem' }}>{lang.flag}</span>
                <span>{lang.label}</span>
                {active && (
                  <span style={{
                    marginLeft: 'auto',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'var(--gold-500)',
                    flexShrink: 0,
                  }} />
                )}
              </button>
            )
          })}
        </div>

        {/* Footer tagline */}
        <div style={{ padding: '1.5rem 1.5rem 0' }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.15)',
            fontStyle: 'italic',
            lineHeight: 1.7,
            margin: 0,
          }}>
            "Your roots are the<br />source of your wings."
          </p>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────── */}
      <main style={{
        marginLeft: 220,
        flex: 1,
        minHeight: '100vh',
        overflowY: 'auto',
      }}>
        {screen === 'home' && (
          <Home user={user} language={language} onWrite={() => setScreen('respond')} />
        )}
        {screen === 'respond' && (
          <Respond language={language} onSaved={() => setScreen('archive')} />
        )}
        {screen === 'archive' && <Archive />}
        {screen === 'explore' && <Explore language={language} />}
      </main>
    </div>
  )
}

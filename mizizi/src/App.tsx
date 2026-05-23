import { useState } from 'react'
import type { CSSProperties } from 'react'
import { storage } from './utils/storage'
import type { User, Language } from './types'
import Onboarding from './screens/Onboarding'
import Home from './screens/Home'
import Respond from './screens/Respond'
import Archive from './screens/Archive'

type Screen = 'home' | 'respond' | 'archive'

export default function App() {
  const [user, setUser] = useState<User | null>(storage.getUser())
  const [screen, setScreen] = useState<Screen>('home')
  const [respondLanguage, setRespondLanguage] = useState<Language>(
    storage.getUser()?.language ?? 'swahili'
  )

  if (!user) return <Onboarding onDone={(u: User) => setUser(u)} />

  return (
    <div style={{ paddingBottom: 72, minHeight: '100vh' }}>
      {screen === 'home' && (
        <Home
          user={user}
          onWrite={(lang: Language) => {
            setRespondLanguage(lang)
            setScreen('respond')
          }}
        />
      )}
      {screen === 'respond' && (
        <Respond language={respondLanguage} onSaved={() => setScreen('archive')} />
      )}
      {screen === 'archive' && <Archive />}

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        display: 'flex',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-card)',
        boxShadow: '0 -4px 20px rgba(28,14,6,0.06)',
      }}>
        <button style={navBtnStyle(screen === 'home')} onClick={() => setScreen('home')}>
          🏠 Home
        </button>
        <button style={navBtnStyle(screen === 'respond')} onClick={() => setScreen('respond')}>
          ✍️ Write
        </button>
        <button style={navBtnStyle(screen === 'archive')} onClick={() => setScreen('archive')}>
          📖 Archive
        </button>
      </nav>
    </div>
  )
}

function navBtnStyle(active: boolean): CSSProperties {
  return {
    flex: 1,
    padding: '14px 8px',
    border: 'none',
    background: 'transparent',
    color: active ? 'var(--terra-500)' : 'var(--brown-300)',
    fontWeight: active ? 600 : 400,
    fontSize: 12,
    cursor: 'pointer',
    transition: 'color 0.15s ease',
    letterSpacing: '0.02em',
  }
}

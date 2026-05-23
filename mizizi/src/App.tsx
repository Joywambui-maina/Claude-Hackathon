import { useState } from 'react'
import { storage } from './utils/storage'
import type { User } from './types'
import Onboarding from './screens/Onboarding'
import Home from './screens/Home'
import Respond from './screens/Respond'
import Archive from './screens/Archive'

type Screen = 'home' | 'respond' | 'archive'

export default function App() {
  const [user, setUser] = useState<User | null>(storage.getUser())
  const [screen, setScreen] = useState<Screen>('home')

  if (!user) return <Onboarding onDone={(u: User) => setUser(u)} />

  return (
    <div
      style={{
        paddingBottom: 72,
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {screen === 'home' && <Home onWrite={() => setScreen('respond')} />}
      {screen === 'respond' && <Respond onSaved={() => setScreen('archive')} />}
      {screen === 'archive' && <Archive />}

      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          borderTop: '1px solid #ddd',
          background: '#fff',
        }}
      >
        <button style={navBtnStyle(screen === 'home')} onClick={() => setScreen('home')}>
          Home
        </button>
        <button style={navBtnStyle(screen === 'respond')} onClick={() => setScreen('respond')}>
          Write
        </button>
        <button style={navBtnStyle(screen === 'archive')} onClick={() => setScreen('archive')}>
          Archive
        </button>
      </nav>
    </div>
  )
}

function navBtnStyle(active: boolean): React.CSSProperties {
  return {
    flex: 1,
    padding: 16,
    border: 'none',
    background: active ? '#f4f0e8' : '#fff',
    fontWeight: active ? 600 : 400,
    fontSize: 14,
    cursor: 'pointer',
  }
}

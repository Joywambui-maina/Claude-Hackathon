import { storage } from '../utils/storage'

// Home screen — owned by Person A
// onWrite: called when user taps "Write" to go to the Respond screen

export default function Home({ onWrite }: { onWrite: () => void }) {
  const user = storage.getUser()

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '8px',
        backgroundColor: '#FFF9F3',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <span style={{ fontSize: '40px' }}>🌱</span>
      <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1C1917' }}>
        Yaweza, {user?.name}!
      </h2>
      <p style={{ color: '#78716C', fontSize: '14px' }}>Home screen coming soon…</p>
      <button
        onClick={onWrite}
        style={{ marginTop: 12, padding: '10px 24px', borderRadius: 10, background: '#1D6B45', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
      >
        Write today →
      </button>
    </div>
  )
}

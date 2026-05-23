// Respond screen — owned by Person C
// onSaved: called after the user submits their journal response

export default function Respond({ onSaved }: { onSaved: () => void }) {
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
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <span style={{ fontSize: '40px' }}>✍️</span>
      <p style={{ color: '#78716C', fontSize: '14px' }}>Respond screen coming soon…</p>
      <button
        onClick={onSaved}
        style={{ marginTop: 12, padding: '10px 24px', borderRadius: 10, background: '#1D6B45', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
      >
        Save (stub)
      </button>
    </div>
  )
}

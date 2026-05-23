import { useState, useEffect } from 'react'
import { storage } from '../utils/storage'
import type { Entry } from '../types'

export default function Archive() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    const sorted = storage.getEntries().slice().sort((a, b) => b.date.localeCompare(a.date))
    setEntries(sorted)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1C0E06 0%, #4A2D18 100%)',
        padding: '2rem 2.5rem',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          color: '#FBF5EC',
          fontSize: '2.25rem',
          fontWeight: 300,
          margin: '0 0 0.375rem',
        }}>
          Archive
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', margin: 0, fontStyle: 'italic' }}>
          This is your voice. These words belong to you.
        </p>
      </div>

      <main style={{ padding: '2rem 2.5rem' }}>
        {entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📖</p>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--brown-500)', marginBottom: '0.5rem' }}>
              No entries yet.
            </p>
            <p style={{ color: 'var(--brown-300)', fontSize: '0.9375rem' }}>
              Go write your first response to start building your archive.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.25rem',
          }}>
            {entries.map((e) => (
              <div
                key={e.id}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 16,
                  border: '1px solid var(--border)',
                  padding: '1.375rem 1.5rem',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--terra-500)',
                  }}>
                    {e.language}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brown-300)' }}>
                    {formatDate(e.date)}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--brown-800)',
                  margin: '0 0 0.75rem',
                  lineHeight: 1.4,
                }}>
                  {e.promptEnglish}
                </p>
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--brown-600)',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                }}>
                  {e.response}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return iso
  }
}

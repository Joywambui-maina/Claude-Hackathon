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
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Archive</h1>
      <p style={{ fontStyle: 'italic', color: '#666', marginTop: 0, marginBottom: 24 }}>
        This is your voice. These words belong to you.
      </p>

      {entries.length === 0 && (
        <p style={{ color: '#999', textAlign: 'center', marginTop: 48 }}>
          No entries yet. Start writing.
        </p>
      )}

      {entries.map((e) => (
        <div
          key={e.id}
          style={{
            borderBottom: '1px solid #eee',
            padding: '16px 0',
          }}
        >
          <div style={{ fontSize: 12, color: '#888' }}>{formatDate(e.date)}</div>
          <div style={{ fontWeight: 600, marginTop: 6, fontSize: 15 }}>{e.promptEnglish}</div>
          <div style={{ marginTop: 8, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{e.response}</div>
        </div>
      ))}
    </div>
  )
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

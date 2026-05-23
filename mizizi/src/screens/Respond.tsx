import { useState } from 'react'
import type { Language } from '../types'
import { storage } from '../utils/storage'
import { getPromptByLanguage } from '../data/prompts'

interface RespondProps {
  language: Language
  onSaved: () => void
}

export default function Respond({ language, onSaved }: RespondProps) {
  const prompt = getPromptByLanguage(language)
  const [response, setResponse] = useState('')
  const [saving, setSaving] = useState(false)

  const canSave = response.trim().length > 0

  const handleSave = () => {
    if (!canSave || saving) return
    setSaving(true)
    storage.addEntry({
      promptId: prompt.id,
      promptEnglish: prompt.promptEnglish,
      response: response.trim(),
      language,
    })
    onSaved()
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-ui)' }}>

      {/* ── Header ──────────────────────────────────────────────── */}
      <header style={{
        background: 'linear-gradient(160deg, #1C0E06 0%, #6B2A10 52%, #C4622D 100%)',
        padding: '2.75rem 1.375rem 2.25rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-serif)',
          color: 'var(--gold-500)',
          fontSize: '1.25rem',
          letterSpacing: '0.2em',
          fontStyle: 'italic',
          display: 'block',
          marginBottom: '1.5rem',
        }}>
          mizizi
        </span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          color: '#FBF5EC',
          fontSize: 'clamp(1.75rem, 7vw, 2.25rem)',
          fontWeight: 300,
          lineHeight: 1.2,
          margin: '0 0 0.375rem',
        }}>
          Your response
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '0.8125rem',
          margin: 0,
          textTransform: 'capitalize',
          letterSpacing: '0.03em',
        }}>
          {language === 'spanish' ? 'Español' : language.charAt(0).toUpperCase() + language.slice(1)} prompt
        </p>
      </header>

      {/* ── Main content ─────────────────────────────────────────── */}
      <main style={{ padding: '1.5rem 1.125rem 2rem' }}>

        {/* Prompt reminder */}
        <section style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          padding: '1.375rem 1.5rem',
          marginBottom: '1.25rem',
          boxShadow: 'var(--shadow-card)',
        }}>
          <p style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--terra-500)',
            margin: '0 0 0.875rem',
          }}>
            Today's Prompt
          </p>

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
            fontStyle: 'italic',
            margin: 0,
          }}>
            {prompt.promptEnglish}
          </p>
        </section>

        {/* Textarea */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <textarea
            value={response}
            onChange={e => setResponse(e.target.value)}
            placeholder="Start writing here — in any language you choose..."
            rows={10}
            style={{
              width: '100%',
              padding: '1.25rem',
              paddingBottom: '2.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--border)',
              background: 'var(--bg-card)',
              fontSize: '1.0625rem',
              lineHeight: 1.75,
              color: 'var(--brown-900)',
              resize: 'vertical',
              minHeight: '15rem',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.15s ease',
              boxShadow: 'var(--shadow-card)',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--terra-500)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
          {/* Character count */}
          <span style={{
            position: 'absolute',
            bottom: '0.9375rem',
            right: '1.125rem',
            fontSize: '0.75rem',
            color: response.length > 800 ? 'var(--terra-500)' : 'var(--brown-200)',
            fontWeight: response.length > 800 ? 600 : 400,
            transition: 'color 0.2s ease',
            pointerEvents: 'none',
          }}>
            {response.length}
          </span>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!canSave || saving}
          style={{
            width: '100%',
            padding: '1.0625rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: canSave ? 'var(--terra-500)' : 'var(--brown-100)',
            color: canSave ? '#FBF5EC' : 'var(--brown-300)',
            fontSize: '1.0625rem',
            fontWeight: 600,
            cursor: canSave ? 'pointer' : 'not-allowed',
            letterSpacing: '0.02em',
            marginBottom: '2.5rem',
            transition: 'all 0.15s ease',
            boxShadow: canSave ? '0 4px 16px rgba(196, 98, 45, 0.35)' : 'none',
          }}
        >
          {saving ? 'Saving...' : 'Save to Archive →'}
        </button>

        {/* Ethical tagline */}
        <p style={{
          textAlign: 'center',
          color: 'var(--brown-300)',
          fontSize: '1rem',
          fontStyle: 'italic',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.75,
          margin: 0,
        }}>
          "This is your voice.<br />
          These words belong to you."
        </p>

      </main>
    </div>
  )
}

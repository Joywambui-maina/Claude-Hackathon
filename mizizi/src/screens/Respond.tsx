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

  const langLabel = language === 'spanish' ? 'Español' : language.charAt(0).toUpperCase() + language.slice(1)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-ui)', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header strip ─────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #1C0E06 0%, #6B2A10 60%, #C4622D 100%)',
        padding: '1.75rem 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            color: '#FBF5EC',
            fontSize: '2rem',
            fontWeight: 300,
            lineHeight: 1.2,
            margin: '0 0 0.25rem',
          }}>
            Your Response
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', margin: 0, letterSpacing: '0.03em' }}>
            {langLabel} prompt · Write in any language
          </p>
        </div>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.25)',
          fontStyle: 'italic',
          margin: 0,
          maxWidth: 260,
          textAlign: 'right',
          lineHeight: 1.6,
        }}>
          "This is your voice.<br />These words belong to you."
        </p>
      </div>

      {/* ── Two-column layout ────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '2.5rem',
        gap: '2.5rem',
        alignItems: 'start',
      } as React.CSSProperties}>

        {/* Left: prompt context */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 16,
            border: '1px solid var(--border)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-card)',
          }}>
            <p style={{
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--terra-500)',
              margin: '0 0 1.125rem',
            }}>
              Today's Prompt
            </p>
            <p style={{
              fontFamily: 'var(--font-native)',
              fontSize: '1.25rem',
              lineHeight: 1.9,
              color: 'var(--brown-900)',
              fontWeight: 700,
              margin: '0 0 0.75rem',
            }}>
              {prompt.promptNative}
            </p>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'var(--brown-500)',
              fontStyle: 'italic',
              margin: 0,
            }}>
              {prompt.promptEnglish}
            </p>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 16,
            border: '1px solid var(--border)',
            padding: '1.5rem 1.75rem',
            boxShadow: 'var(--shadow-card)',
          }}>
            <p style={{
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--brown-300)',
              margin: '0 0 1rem',
            }}>
              The Story
            </p>
            <p style={{
              fontFamily: 'var(--font-native)',
              fontSize: '0.9375rem',
              lineHeight: 1.85,
              color: 'var(--brown-700)',
              margin: '0 0 0.75rem',
            }}>
              {prompt.storyNative}
            </p>
            <p style={{
              fontSize: '0.875rem',
              lineHeight: 1.75,
              color: 'var(--brown-400)',
              fontStyle: 'italic',
              margin: 0,
            }}>
              {prompt.storyEnglish}
            </p>
          </div>

          <div style={{
            background: 'rgba(196,98,45,0.05)',
            borderRadius: 12,
            border: '1px solid rgba(196,98,45,0.12)',
            padding: '1rem 1.25rem',
            display: 'flex',
            gap: '0.625rem',
            alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.65 }}>💡</span>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: 'var(--brown-400)', margin: 0 }}>
              {prompt.culturalNote}
            </p>
          </div>
        </div>

        {/* Right: writing area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '2.5rem' }}>
          <div style={{ position: 'relative' }}>
            <textarea
              value={response}
              onChange={e => setResponse(e.target.value)}
              placeholder="Start writing here — in any language you choose..."
              style={{
                width: '100%',
                padding: '1.375rem',
                paddingBottom: '2.5rem',
                borderRadius: 16,
                border: '2px solid var(--border)',
                background: 'var(--bg-card)',
                fontSize: '1.0625rem',
                lineHeight: 1.8,
                color: 'var(--brown-900)',
                resize: 'none',
                height: '22rem',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.15s ease',
                boxShadow: 'var(--shadow-card)',
                fontFamily: 'var(--font-ui)',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--terra-500)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
            <span style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1.125rem',
              fontSize: '0.75rem',
              color: response.length > 800 ? 'var(--terra-500)' : 'var(--brown-200)',
              fontWeight: response.length > 800 ? 600 : 400,
              pointerEvents: 'none',
            }}>
              {response.length} chars
            </span>
          </div>

          <button
            onClick={handleSave}
            disabled={!canSave || saving}
            style={{
              width: '100%',
              padding: '1.0625rem',
              borderRadius: 12,
              border: 'none',
              background: canSave ? 'var(--terra-500)' : 'var(--brown-100)',
              color: canSave ? '#FBF5EC' : 'var(--brown-300)',
              fontSize: '1.0625rem',
              fontWeight: 600,
              cursor: canSave ? 'pointer' : 'not-allowed',
              letterSpacing: '0.02em',
              transition: 'all 0.15s ease',
              boxShadow: canSave ? '0 4px 16px rgba(196,98,45,0.35)' : 'none',
            }}
            onMouseEnter={e => { if (canSave) e.currentTarget.style.opacity = '0.9' }}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {saving ? 'Saving...' : 'Save to Archive →'}
          </button>
        </div>

      </div>
    </div>
  )
}

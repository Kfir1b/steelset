import React, { useState } from 'react'

export default function SetupPage() {
  const [url, setUrl] = useState('')
  const [key, setKey] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!url.startsWith('https://') || (!key.startsWith('eyJ') && !key.startsWith('sb_'))) {
      alert('Please enter valid Supabase credentials.')
      return
    }
    // Write to .env file instructions — we can't write files from browser,
    // so just show clear instructions
    setSaved(true)
  }

  return (
    <div style={{
      minHeight: '100dvh', background: '#0a0a0a', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '24px'
    }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: '32px', fontWeight: 800,
            letterSpacing: '0.1em', marginBottom: '8px'
          }}>
            STEEL<span style={{ color: '#FF6B2B' }}>SET</span>
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#555', letterSpacing: '0.1em' }}>
            SETUP REQUIRED
          </div>
        </div>

        <div style={{
          background: '#111', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '28px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Connect your database</h2>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#666', lineHeight: 1.7, marginBottom: '24px' }}>
            You need a free Supabase account to store your workouts and sync across devices.
          </p>

          {/* Steps */}
          {[
            { n: '1', text: 'Go to supabase.com → create free account → New Project' },
            { n: '2', text: 'Wait ~2 min for project to spin up' },
            { n: '3', text: 'SQL Editor → paste contents of supabase-schema.sql → Run' },
            { n: '4', text: 'Settings → API → copy your Project URL and anon key below' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%', background: '#FF6B2B',
                color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Space Mono', monospace", fontSize: '11px', fontWeight: 700, flexShrink: 0
              }}>{s.n}</div>
              <div style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.5, paddingTop: '2px' }}>{s.text}</div>
            </div>
          ))}

          <div style={{ borderTop: '1px solid #1e1e1e', margin: '24px 0' }} />

          {!saved ? (
            <>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#666', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                  PROJECT URL
                </label>
                <input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://abcdefgh.supabase.co"
                  style={{
                    width: '100%', padding: '10px 14px', background: '#0a0a0a',
                    border: '1px solid #2a2a2a', borderRadius: '8px',
                    color: '#f0f0f0', fontFamily: "'Space Mono', monospace", fontSize: '12px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#666', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                  ANON PUBLIC KEY
                </label>
                <input
                  value={key}
                  onChange={e => setKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                  style={{
                    width: '100%', padding: '10px 14px', background: '#0a0a0a',
                    border: '1px solid #2a2a2a', borderRadius: '8px',
                    color: '#f0f0f0', fontFamily: "'Space Mono', monospace", fontSize: '11px'
                  }}
                />
              </div>
              <button onClick={handleSave} style={{
                width: '100%', padding: '12px', background: '#FF6B2B',
                color: '#0a0a0a', borderRadius: '8px', fontFamily: "'Space Mono', monospace",
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', border: 'none', cursor: 'pointer'
              }}>
                SHOW ME WHAT TO DO →
              </button>
            </>
          ) : (
            <div style={{ background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '16px' }}>
              <div style={{ color: '#FF6B2B', fontWeight: 700, marginBottom: '12px' }}>✓ Almost there!</div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#aaa', lineHeight: 1.7, marginBottom: '16px' }}>
                Open <strong style={{ color: '#f0f0f0' }}>src/lib/supabase.js</strong> in your code editor and replace the placeholder values:
              </p>
              <div style={{
                background: '#050505', borderRadius: '8px', padding: '14px',
                fontFamily: "'Space Mono', monospace", fontSize: '11px', lineHeight: 1.8, color: '#888'
              }}>
                <div>const SUPABASE_URL = <span style={{ color: '#FF6B2B' }}>'{url}'</span></div>
                <div>const SUPABASE_ANON_KEY = <span style={{ color: '#FF6B2B' }}>'{key.slice(0,20)}...'</span></div>
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#555', marginTop: '12px', lineHeight: 1.6 }}>
                Save the file — the app will reload automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

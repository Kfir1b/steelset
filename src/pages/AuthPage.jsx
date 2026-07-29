import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../lib/db'
import { startDemo } from '../lib/demo'

export default function AuthPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false)
  const navigate = useNavigate()

  function handleDemo() {
    startDemo()
    // Full reload so AuthProvider picks up the demo session on boot.
    window.location.assign('/')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fn = mode === 'login' ? signIn : signUp
    const { data, error: err } = await fn(email, password)
    if (err) {
      setError(err.message)
    } else if (mode === 'signup' && !data?.session) {
      // Supabase requires email confirmation — session won't exist yet
      setAwaitingConfirmation(true)
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  if (awaitingConfirmation) {
    return (
      <div style={{
        minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', background: 'var(--bg)'
      }}>
        <div className="fade-up" style={{ width: '100%', maxWidth: '380px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>✉️</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
            Check your email
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '32px' }}>
            We sent a confirmation link to<br />
            <span style={{ color: 'var(--accent)' }}>{email}</span><br />
            Click it to activate your account, then sign in.
          </p>
          <button onClick={() => { setAwaitingConfirmation(false); setMode('login') }} style={{
            padding: '14px 28px', background: 'var(--accent)', color: '#0a0a0a',
            fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
            letterSpacing: '0.1em', borderRadius: '8px'
          }}>
            BACK TO SIGN IN
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', background: 'var(--bg)', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,43,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="fade-up" style={{ width: '100%', maxWidth: '380px' }}>
        {/* Logo */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block', background: 'var(--accent)',
            color: '#0a0a0a', padding: '6px 12px',
            fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.15em', marginBottom: '16px'
          }}>
            STEELSET
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '52px',
            fontWeight: 800, lineHeight: 1, color: 'var(--text)'
          }}>
            LIFT.<br />LOAD.<br />DOMINATE.
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required
            style={inputStyle}
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} required
            style={inputStyle}
          />

          {error && (
            <p style={{ color: 'var(--accent2)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} style={{
            padding: '16px', background: loading ? '#2a2a2a' : 'var(--accent)',
            color: loading ? 'var(--text-muted)' : '#0a0a0a',
            fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700,
            letterSpacing: '0.1em', borderRadius: '8px', transition: 'all 0.2s',
            marginTop: '4px'
          }}>
            {loading ? 'LOADING...' : mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        {/* Demo entry — lets recruiters/visitors explore with sample data, no signup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0 16px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'var(--text-muted)', letterSpacing: '0.1em'
          }}>
            OR
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <button type="button" onClick={handleDemo} style={{
          width: '100%', padding: '16px',
          background: 'transparent', color: 'var(--accent)',
          border: '1px solid var(--accent)', borderRadius: '8px',
          fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700,
          letterSpacing: '0.1em', transition: 'all 0.2s', cursor: 'pointer'
        }}>
          ⚡ TRY THE DEMO
        </button>
        <p style={{
          marginTop: '10px', textAlign: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          color: 'var(--text-muted)', lineHeight: 1.6
        }}>
          Explore the full app with sample workouts — no account needed.
        </p>

        <p style={{
          marginTop: '24px', textAlign: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)'
        }}>
          {mode === 'login' ? "No account? " : "Have an account? "}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }} style={{
            background: 'none', color: 'var(--accent)', fontFamily: 'var(--font-mono)',
            fontSize: '12px', textDecoration: 'underline'
          }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}

const inputStyle = {
  padding: '14px 16px', background: 'var(--surface)',
  border: '1px solid var(--border)', borderRadius: '8px',
  color: 'var(--text)', fontSize: '14px',
  width: '100%', transition: 'border-color 0.2s'
}

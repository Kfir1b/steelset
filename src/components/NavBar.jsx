import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TABS = [
  { path: '/',         label: 'Home',      icon: '⊞' },
  { path: '/log',      label: 'Log',       icon: '＋' },
  { path: '/history',  label: 'History',   icon: '◷' },
  { path: '/exercises',label: 'Library',   icon: '◈' },
  { path: '/progress', label: 'Progress',  icon: '↗' },
]

export default function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: '480px',
      background: 'rgba(10,10,10,0.97)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid #1e1e1e',
      display: 'flex',
      paddingBottom: 'var(--safe-bottom)',
      zIndex: 100
    }}>
      {TABS.map(tab => {
        const active = location.pathname === tab.path
        return (
          <button key={tab.path} onClick={() => navigate(tab.path)} style={{
            flex: 1, padding: '12px 0', background: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
            color: active ? 'var(--accent)' : 'var(--text-muted)',
            transition: 'color 0.2s', position: 'relative', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-display)'
          }}>
            {active && (
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '24px', height: '2px', background: 'var(--accent)',
                borderRadius: '0 0 2px 2px'
              }} />
            )}
            <span style={{ fontSize: '18px', lineHeight: 1 }}>{tab.icon}</span>
            <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getWorkouts, signOut } from '../lib/db'

const WORKOUT_COLORS = {
  Push: '#FF6B2B', Pull: '#4A90D9', Legs: '#6c63ff',
  Cardio: '#00d4aa', Full: '#f5a623', Rest: '#555'
}

export default function DashboardPage() {
  const { user } = useAuth()
  // Fetch per user id, not per user object: Supabase emits a new object on each
  // auth event (initial session, token refresh), which refetched for nothing.
  const userId = user?.id
  const navigate = useNavigate()
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    getWorkouts(userId).then(({ data }) => {
      setWorkouts(data || [])
      setLoading(false)
    })
  }, [userId])

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const recentWorkouts = workouts.slice(0, 5)
  const thisWeek = workouts.filter(w => {
    const d = new Date(w.date)
    const now = new Date()
    const diff = (now - d) / (1000 * 60 * 60 * 24)
    return diff <= 7
  })

  async function handleSignOut() {
    await signOut()
  }

  return (
    <div style={{ padding: '0', minHeight: '100dvh' }}>
      {/* Header */}
      <div style={{
        padding: '24px 24px 0',
        paddingTop: 'calc(24px + var(--safe-top))'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              {today.toUpperCase()}
            </p>
            <h1 style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1.1, marginTop: '4px' }}>
              Dashboard
            </h1>
          </div>
          <button onClick={handleSignOut} style={{
            background: 'var(--surface2)', color: 'var(--text-muted)',
            padding: '8px 14px', borderRadius: '8px',
            fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em'
          }}>
            LOGOUT
          </button>
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {[
            { label: 'This Week', value: thisWeek.length, unit: 'sessions' },
            { label: 'Total', value: workouts.length, unit: 'workouts' },
            { label: 'Total Sets', value: workouts.reduce((a, w) => a + (w.sets?.length || 0), 0), unit: 'sets' }
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--surface)', borderRadius: 'var(--radius)',
              padding: '16px 12px', border: '1px solid var(--border)'
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 700, color: 'var(--accent)' }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px', letterSpacing: '0.08em' }}>
                {stat.unit.toUpperCase()}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick log CTA */}
        <button onClick={() => navigate('/log')} style={{
          background: 'var(--accent)', color: '#0a0a0a',
          padding: '20px', borderRadius: 'var(--radius)',
          fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'transform 0.15s, opacity 0.15s'
        }}>
          <span>Log Today's Workout</span>
          <span style={{ fontSize: '24px' }}>→</span>
        </button>

        {/* Recent workouts */}
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            RECENT
          </h2>
          {loading ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>Loading...</p>
          ) : recentWorkouts.length === 0 ? (
            <div style={{
              background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '32px',
              textAlign: 'center', border: '1px dashed var(--border)'
            }}>
              <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                No workouts yet.<br />Start logging!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recentWorkouts.map((w, i) => (
                <div key={w.id} className="fade-up"
                  onClick={() => navigate('/history', { state: { expandId: w.id } })}
                  style={{
                    animationDelay: `${i * 0.05}s`,
                    background: 'var(--surface)', borderRadius: 'var(--radius)',
                    padding: '16px', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    cursor: 'pointer', transition: 'border-color 0.15s'
                  }}>
                  <div style={{
                    width: '8px', height: '40px', borderRadius: '4px',
                    background: WORKOUT_COLORS[w.type] || '#555', flexShrink: 0
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '15px' }}>{w.type} Day</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {new Date(w.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: 'var(--accent)' }}>
                      {w.sets?.length || 0}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>SETS</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

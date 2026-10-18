import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getWorkouts, deleteWorkout } from '../lib/db'

const TYPE_COLOR = {
  Push: '#FF6B2B', Pull: '#4A90D9', Legs: '#6c63ff',
  Cardio: '#00d4aa', Full: '#f5a623', Rest: '#555'
}

export default function HistoryPage() {
  const { user } = useAuth()
  const location = useLocation()
  const expandId = location.state?.expandId ?? null
  const expandRef = useRef(null)

  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(expandId)
  const [filter, setFilter] = useState('All')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const TYPES = ['All', 'Push', 'Pull', 'Legs', 'Full', 'Cardio']

  useEffect(() => {
    if (!user) return
    getWorkouts(user.id).then(({ data }) => {
      setWorkouts(data || [])
      setLoading(false)
    })
  }, [user])

  // Scroll to the expanded workout once it renders
  useEffect(() => {
    if (expandId && expandRef.current) {
      setTimeout(() => expandRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150)
    }
  }, [loading, expandId])

  const filtered = filter === 'All' ? workouts : workouts.filter(w => w.type === filter)

  function handleDelete(id) {
    setConfirmDelete(id)
  }

  async function confirmDeleteWorkout() {
    const id = confirmDelete
    setConfirmDelete(null)
    await deleteWorkout(id)
    setWorkouts(prev => prev.filter(w => w.id !== id))
    if (expanded === id) setExpanded(null)
  }

  return (
    <div style={{ padding: '24px', paddingTop: 'calc(24px + var(--safe-top))', minHeight: '100dvh' }}>

      {/* Confirmation dialog */}
      {confirmDelete && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
        }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '24px', width: '100%', maxWidth: '320px'
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', marginBottom: '20px', lineHeight: 1.6 }}>
              Delete this workout and all its sets?
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setConfirmDelete(null)} style={{
                flex: 1, padding: '12px', background: 'var(--surface2)',
                color: 'var(--text)', borderRadius: '8px',
                fontFamily: 'var(--font-mono)', fontSize: '12px', border: '1px solid var(--border)'
              }}>CANCEL</button>
              <button onClick={confirmDeleteWorkout} style={{
                flex: 1, padding: '12px', background: '#ef4444',
                color: '#fff', borderRadius: '8px',
                fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, border: 'none'
              }}>DELETE</button>
            </div>
          </div>
        </div>
      )}

      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>History</h1>

      {/* Filter tabs */}
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '6px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {TYPES.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            padding: '7px 14px', borderRadius: '20px', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.05em',
            background: filter === t ? (TYPE_COLOR[t] || 'var(--accent)') : 'var(--surface)',
            color: filter === t ? '#0a0a0a' : 'var(--text-muted)',
            border: `1px solid ${filter === t ? 'transparent' : 'var(--border)'}`,
            transition: 'all 0.15s', flexShrink: 0
          }}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 24px',
          color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '13px',
          border: '1px dashed var(--border)', borderRadius: 'var(--radius)'
        }}>
          No {filter !== 'All' ? filter : ''} workouts found.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((w, i) => (
            <div key={w.id} className="fade-up" ref={w.id === expandId ? expandRef : null} style={{ animationDelay: `${i * 0.04}s` }}>
              <div
                onClick={() => setExpanded(expanded === w.id ? null : w.id)}
                style={{
                  background: 'var(--surface)', borderRadius: 'var(--radius)',
                  border: `1px solid ${expanded === w.id ? TYPE_COLOR[w.type] || 'var(--accent)' : 'var(--border)'}`,
                  padding: '16px', cursor: 'pointer', transition: 'border-color 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '10px', height: '44px', borderRadius: '5px', flexShrink: 0,
                    background: TYPE_COLOR[w.type] || '#555'
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '16px' }}>{w.type} Day</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px' }}>
                      {new Date(w.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                    {w.notes && (
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                        "{w.notes}"
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 700, color: TYPE_COLOR[w.type] || 'var(--accent)' }}>
                      {w.sets?.length || 0}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>SETS</div>
                  </div>
                </div>
              </div>

              {/* Expanded sets */}
              {/* Rendered even with no sets, so an empty workout can still be deleted */}
              {expanded === w.id && (
                <div style={{
                  background: 'var(--surface2)', borderRadius: '0 0 var(--radius) var(--radius)',
                  border: `1px solid ${TYPE_COLOR[w.type] || 'var(--border)'}`,
                  borderTop: 'none', padding: '16px'
                }}>
                  {!w.sets?.length && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                      No sets logged.
                    </div>
                  )}
                  {Object.entries(
                    (w.sets || []).reduce((acc, s) => {
                      if (!acc[s.exercise]) acc[s.exercise] = []
                      acc[s.exercise].push(s)
                      return acc
                    }, {})
                  ).map(([ex, exSets]) => (
                    <div key={ex} style={{ marginBottom: '12px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.08em' }}>
                        {ex.toUpperCase()}
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {exSets.sort((a,b) => a.set_number - b.set_number).map((s, si) => (
                          <div key={s.id} style={{
                            background: 'var(--surface)', borderRadius: '6px',
                            padding: '6px 10px', border: '1px solid var(--border)',
                            fontFamily: 'var(--font-mono)', fontSize: '12px'
                          }}>
                            <span style={{ color: 'var(--text-muted)' }}>S{si + 1} </span>
                            <span style={{ fontWeight: 700 }}>{s.reps}r</span>
                            {s.weight > 0 && <span style={{ color: 'var(--accent)' }}> {s.weight}{s.unit}</span>}
                            {s.equipment && <span style={{ color: 'var(--text-muted)' }}> · {s.equipment}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={() => handleDelete(w.id)} style={{
                    background: 'none', color: '#ef4444',
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    padding: '6px 0', marginTop: '8px', letterSpacing: '0.05em'
                  }}>
                    × DELETE WORKOUT
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

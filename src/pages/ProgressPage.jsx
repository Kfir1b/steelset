import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getWorkouts } from '../lib/db'

const KG_PER_LB = 0.45359237

export default function ProgressPage() {
  const { user } = useAuth()
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedExercise, setSelectedExercise] = useState(null)

  useEffect(() => {
    if (!user) return
    getWorkouts(user.id).then(({ data }) => {
      setWorkouts(data || [])
      setLoading(false)
    })
  }, [user])

  // Gather all exercises and their best lifts
  const exerciseMap = {}
  workouts.forEach(w => {
    (w.sets || []).forEach(s => {
      if (!exerciseMap[s.exercise]) exerciseMap[s.exercise] = []
      exerciseMap[s.exercise].push({ ...s, date: w.date })
    })
  })

  const exercises = Object.keys(exerciseMap).sort()

  // Compare weights in kg so e.g. 150lbs (68kg) doesn't beat 85kg, but show
  // each set in the unit it was logged in.
  const toKg = s => (s.unit === 'lbs' ? (s.weight || 0) * KG_PER_LB : (s.weight || 0))
  const getBest = (sets) => sets.reduce((best, s) => (toKg(s) > toKg(best) ? s : best))
  const formatWeight = s => `${s.weight || 0}${s.unit || 'kg'}`
  const getVolume = (sets) => sets.reduce((a, s) => a + (s.reps * (s.weight || 0)), 0)

  const history = selectedExercise ? exerciseMap[selectedExercise] || [] : []
  const byDate = history.reduce((acc, s) => {
    if (!acc[s.date]) acc[s.date] = []
    acc[s.date].push(s)
    return acc
  }, {})
  const dateEntries = Object.entries(byDate).sort((a, b) => a[0].localeCompare(b[0]))

  const maxWeight = dateEntries.length > 0 ? Math.max(...dateEntries.map(([, sets]) => toKg(getBest(sets)))) : 0
  const best = history.length > 0 ? getBest(history) : null
  // Chart labels are bare numbers unless the history mixes kg and lbs
  const mixedUnits = new Set(history.map(s => s.unit || 'kg')).size > 1
  const chartMax = maxWeight * 1.2 || 100

  return (
    <div style={{ padding: '24px', paddingTop: 'calc(24px + var(--safe-top))', minHeight: '100dvh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>Progress</h1>

      {loading ? (
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Loading...</p>
      ) : exercises.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 24px', color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)', fontSize: '13px',
          border: '1px dashed var(--border)', borderRadius: 'var(--radius)'
        }}>
          Log some workouts to see your progress here.
        </div>
      ) : (
        <>
          {/* Exercise selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
              SELECT EXERCISE
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {exercises.map(ex => (
                <button key={ex} onClick={() => setSelectedExercise(ex)} style={{
                  padding: '8px 14px', borderRadius: '20px',
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  background: selectedExercise === ex ? 'var(--accent)' : 'var(--surface)',
                  color: selectedExercise === ex ? '#0a0a0a' : 'var(--text)',
                  border: `1px solid ${selectedExercise === ex ? 'var(--accent)' : 'var(--border)'}`,
                  transition: 'all 0.15s'
                }}>
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {selectedExercise && (
            <div className="fade-up">
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 700, color: 'var(--accent)' }}>
                    {best.weight || 0}
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{best.unit || 'kg'}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', letterSpacing: '0.08em' }}>BEST WEIGHT</div>
                </div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 700, color: 'var(--accent2)' }}>
                    {history.length}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', letterSpacing: '0.08em' }}>TOTAL SETS</div>
                </div>
              </div>

              {/* Chart */}
              {dateEntries.length > 1 && (
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)', padding: '20px', marginBottom: '24px'
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px', letterSpacing: '0.1em' }}>
                    MAX WEIGHT OVER TIME
                  </div>
                  <div style={{ position: 'relative', height: '120px' }}>
                    <svg viewBox={`0 0 ${dateEntries.length * 40} 120`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      {dateEntries.map(([date, sets], i) => {
                        const x = i * 40 + 20
                        const sessionBest = getBest(sets)
                        const y = 110 - (toKg(sessionBest) / chartMax) * 100
                        const prevEntry = dateEntries[i - 1]
                        const prevX = (i - 1) * 40 + 20
                        const prevY = prevEntry ? 110 - (toKg(getBest(prevEntry[1])) / chartMax) * 100 : y
                        return (
                          <g key={date}>
                            {i > 0 && (
                              <line x1={prevX} y1={prevY} x2={x} y2={y}
                                stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" />
                            )}
                            <circle cx={x} cy={y} r="5" fill="#FF6B2B" />
                            <text x={x} y="120" textAnchor="middle" fill="#444"
                              style={{ fontSize: '8px', fontFamily: 'var(--font-mono)' }}>
                              {new Date(date + 'T12:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                            </text>
                            <text x={x} y={y - 9} textAnchor="middle" fill="#FF6B2B"
                              style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                              {mixedUnits ? formatWeight(sessionBest) : sessionBest.weight || 0}
                            </text>
                          </g>
                        )
                      })}
                    </svg>
                  </div>
                </div>
              )}

              {/* Session breakdown */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  SESSIONS
                </div>
                {[...dateEntries].reverse().map(([date, sets]) => (
                  <div key={date} style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: '8px', padding: '14px 16px', marginBottom: '8px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                      {new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)', fontSize: '13px' }}>
                          {formatWeight(getBest(sets))}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>MAX</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px' }}>
                          {sets.length}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>SETS</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!selectedExercise && (
            <div style={{
              textAlign: 'center', padding: '40px 24px', color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)', fontSize: '13px'
            }}>
              ↑ Select an exercise to see your progress
            </div>
          )}
        </>
      )}
    </div>
  )
}

import { EXERCISE_SUGGESTIONS, EXERCISES } from '../data/exercises'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { createWorkout, addSet, deleteSet } from '../lib/db'

const WORKOUT_TYPES = ['Push', 'Pull', 'Legs', 'Full', 'Cardio', 'Rest']
const UNITS = ['kg', 'lbs']

// Today's date as YYYY-MM-DD in the user's timezone. (toISOString() is UTC,
// which gives the wrong day near midnight for anyone not on UTC.)
function localToday() {
  const d = new Date()
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export default function LogPage() {
  const { user } = useAuth()
  const [date, setDate] = useState(localToday)
  const [type, setType] = useState('Push')
  const [notes, setNotes] = useState('')
  const [workout, setWorkout] = useState(null)
  const [sets, setSets] = useState([])
  const [newSet, setNewSet] = useState({ exercise: '', reps: '', weight: '', unit: 'kg', equipment: '' })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [startError, setStartError] = useState(null)

  async function startWorkout() {
    if (!user) return
    setStartError(null)
    setSaving(true)
    try {
      const { data, error } = await createWorkout(user.id, { date, type, notes })
      if (error) throw error
      setWorkout(data)
    } catch (err) {
      setStartError(err?.message || 'Failed to create workout. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleAddSet(e) {
    e.preventDefault()
    if (!newSet.exercise || !newSet.reps) return
    const setNum = sets.filter(s => s.exercise === newSet.exercise).length + 1
    const { data, error } = await addSet(workout.id, {
      ...newSet,
      set_number: setNum,
      reps: parseInt(newSet.reps),
      weight: parseFloat(newSet.weight) || 0
    })
    if (!error) {
      setSets(prev => [...prev, data])
      setNewSet(prev => ({ ...prev, reps: '', weight: '' }))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 1500)
    }
  }

  async function handleDeleteSet(id) {
    await deleteSet(id)
    setSets(prev => prev.filter(s => s.id !== id))
  }

  const groupedSets = sets.reduce((acc, s) => {
    if (!acc[s.exercise]) acc[s.exercise] = []
    acc[s.exercise].push(s)
    return acc
  }, {})

  if (!workout) {
    return (
      <div style={{ padding: '24px', paddingTop: 'calc(24px + var(--safe-top))', minHeight: '100dvh' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '32px' }}>Log Workout</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={labelStyle}>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />

          <label style={labelStyle}>Workout Type</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {WORKOUT_TYPES.map(t => (
              <button key={t} onClick={() => setType(t)} style={{
                padding: '12px', borderRadius: '8px', fontWeight: 700,
                fontSize: '13px', transition: 'all 0.15s',
                background: type === t ? 'var(--accent)' : 'var(--surface)',
                color: type === t ? '#0a0a0a' : 'var(--text)',
                border: `1px solid ${type === t ? 'var(--accent)' : 'var(--border)'}`
              }}>
                {t}
              </button>
            ))}
          </div>

          <label style={labelStyle}>Notes (optional)</label>
          <textarea
            value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="How are you feeling today?"
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          <button onClick={startWorkout} disabled={saving} style={{
            padding: '18px', background: 'var(--accent)', color: '#0a0a0a',
            borderRadius: '10px', fontWeight: 800, fontSize: '16px',
            marginTop: '8px', transition: 'opacity 0.2s',
            opacity: saving ? 0.6 : 1
          }}>
            {saving ? 'Creating...' : 'START WORKOUT →'}
          </button>

          {startError && (
            <div style={{
              background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.3)',
              borderRadius: '8px', padding: '12px 14px',
              fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#FF3B30'
            }}>
              {startError}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '24px', paddingTop: 'calc(24px + var(--safe-top))', minHeight: '100dvh' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'inline-block', background: 'var(--accent)', color: '#0a0a0a',
          padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: '11px',
          fontWeight: 700, borderRadius: '4px', marginBottom: '8px'
        }}>
          {workout.type.toUpperCase()} DAY
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Add Sets</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
          {date}
        </p>
      </div>

      {/* Add set form */}
      <form onSubmit={handleAddSet} style={{
        background: 'var(--surface)', borderRadius: 'var(--radius)',
        padding: '20px', border: '1px solid var(--border)', marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Exercise</label>
            <input
              list="exercises" value={newSet.exercise} placeholder="e.g. Bench Press"
              onChange={e => {
                const name = e.target.value
                const opts = EXERCISES[name]?.equipment ?? []
                setNewSet(p => ({ ...p, exercise: name, equipment: opts.length ? opts[0] : '' }))
              }}
              style={inputStyle}
            />
            <datalist id="exercises">
              {(EXERCISE_SUGGESTIONS[workout.type] || []).map(ex => (
                <option key={ex} value={ex} />
              ))}
            </datalist>
          </div>

          {(() => {
            const opts = EXERCISES[newSet.exercise]?.equipment ?? []
            if (opts.length <= 1) return null
            return (
              <div>
                <label style={labelStyle}>Equipment</label>
                <select
                  value={newSet.equipment}
                  onChange={e => setNewSet(p => ({ ...p, equipment: e.target.value }))}
                  style={inputStyle}
                >
                  {opts.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            )
          })()}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: '8px' }}>
            <div>
              <label style={labelStyle}>Reps</label>
              <input
                type="number" value={newSet.reps} placeholder="10"
                onChange={e => setNewSet(p => ({ ...p, reps: e.target.value }))}
                style={inputStyle} min="1"
              />
            </div>
            <div>
              <label style={labelStyle}>Weight</label>
              <input
                type="number" value={newSet.weight} placeholder="60"
                onChange={e => setNewSet(p => ({ ...p, weight: e.target.value }))}
                style={inputStyle} min="0" step="0.5"
              />
            </div>
            <div>
              <label style={labelStyle}>Unit</label>
              <select value={newSet.unit} onChange={e => setNewSet(p => ({ ...p, unit: e.target.value }))}
                style={{ ...inputStyle, padding: '12px 8px' }}>
                {UNITS.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" style={{
            padding: '14px', borderRadius: '8px', fontWeight: 700, fontSize: '14px',
            background: success ? '#1a3a00' : 'var(--surface2)',
            color: success ? 'var(--accent)' : 'var(--text)',
            border: `1px solid ${success ? 'var(--accent)' : 'var(--border)'}`,
            transition: 'all 0.2s'
          }}>
            {success ? '✓ SET ADDED' : '+ ADD SET'}
          </button>
        </div>
      </form>

      {/* Sets logged */}
      {Object.entries(groupedSets).map(([exercise, exSets]) => (
        <div key={exercise} style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '8px' }}>
            {exercise.toUpperCase()}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {exSets.map((s, i) => (
              <div key={s.id} style={{
                background: 'var(--surface)', borderRadius: '8px',
                padding: '12px 16px', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: '12px'
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', width: '24px' }}>
                  S{i + 1}
                </span>
                <span style={{ flex: 1, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  {s.reps} reps
                  {s.weight > 0 && <span style={{ color: 'var(--accent)', marginLeft: '8px' }}>@ {s.weight}{s.unit}</span>}
                  {s.equipment && <span style={{ color: 'var(--text-muted)', marginLeft: '8px', fontWeight: 400 }}>· {s.equipment}</span>}
                </span>
                <button onClick={() => handleDeleteSet(s.id)} style={{
                  background: 'none', color: '#444', fontSize: '16px',
                  padding: '4px 8px', borderRadius: '4px',
                  transition: 'color 0.2s'
                }}>×</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {sets.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '40px 24px',
          color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '13px'
        }}>
          No sets yet — add your first one above!
        </div>
      )}
    </div>
  )
}

const labelStyle = {
  display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px',
  color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '6px'
}

const inputStyle = {
  width: '100%', padding: '12px 14px',
  background: 'var(--surface2)', border: '1px solid var(--border)',
  borderRadius: '8px', color: 'var(--text)', fontSize: '14px'
}

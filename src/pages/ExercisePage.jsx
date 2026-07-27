import React, { useState, useMemo } from 'react'
import { EXERCISES, WORKOUT_TIPS, COMMON_NAMES } from '../data/exercises'
import MuscleDiagram from '../components/MuscleDiagram'

const CATEGORY_COLORS = {
  Push: '#FF6B2B', Pull: '#4A90D9', Legs: '#6c63ff',
  Cardio: '#00d4aa', Full: '#f5a623'
}

const DIFFICULTY_COLORS = {
  Beginner: '#00d4aa', Intermediate: '#f5a623', Advanced: '#FF3B30'
}

export default function ExercisePage() {
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('All')
  const [selected, setSelected] = useState(null)

  const categories = ['All', 'Push', 'Pull', 'Legs', 'Full', 'Cardio']

  const filtered = useMemo(() => {
    return Object.entries(EXERCISES).filter(([name, ex]) => {
      const matchCat = filterCat === 'All' || ex.category === filterCat
      const q = search.toLowerCase()
      const matchSearch = name.toLowerCase().includes(q) ||
        ex.muscles.primary.some(m =>
          m.toLowerCase().split(/[\s,]+/).some(word => word.startsWith(q))
        )
      return matchCat && matchSearch
    })
  }, [search, filterCat])

  if (selected) {
    const [name, ex] = selected
    return <ExerciseDetail name={name} ex={ex} onBack={() => setSelected(null)} />
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh', paddingBottom: 'calc(56px + var(--safe-bottom))' }}>
      <div style={{ padding: '24px 24px 0', paddingTop: 'calc(24px + var(--safe-top))' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '4px' }}>Exercise Library</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          {Object.keys(EXERCISES).length} exercises · form guides · anatomy · video
        </p>

        <input
          type="text" placeholder="Search exercise or muscle..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '12px 16px', background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: '10px',
            color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '13px',
            marginBottom: '12px'
          }}
        />

        <div className="hide-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} style={{
              padding: '6px 14px', borderRadius: '20px', whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.05em',
              background: filterCat === cat ? (CATEGORY_COLORS[cat] || 'var(--accent)') : 'var(--surface)',
              color: filterCat === cat ? '#0a0a0a' : 'var(--text-muted)',
              border: `1px solid ${filterCat === cat ? 'transparent' : 'var(--border)'}`,
              flexShrink: 0, transition: 'all 0.15s'
            }}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Coaching tips strip */}
      <div className="hide-scrollbar" style={{ padding: '14px 24px 0', display: 'flex', gap: '10px', overflowX: 'auto' }}>
        {Object.values(WORKOUT_TIPS).map(tip => (
          <div key={tip.title} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '12px', minWidth: '175px', flexShrink: 0
          }}>
            <div style={{ fontSize: '18px', marginBottom: '4px' }}>{tip.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '12px', marginBottom: '4px' }}>{tip.title}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {tip.tip}
            </div>
          </div>
        ))}
      </div>

      {/* Exercise cards */}
      <div style={{ padding: '14px 24px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '10px', letterSpacing: '0.1em' }}>
          {filtered.length} EXERCISES
        </div>
        {filtered.map(([name, ex], i) => (
          <div key={name} onClick={() => setSelected([name, ex])}
            className="fade-up"
            style={{
              animationDelay: `${Math.min(i * 0.03, 0.3)}s`,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', marginBottom: '10px',
              overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.15s'
            }}
          >
            {/* Thumbnail */}
            <div style={{
              position: 'relative', height: '110px', overflow: 'hidden',
              background: `linear-gradient(135deg, ${CATEGORY_COLORS[ex.category]}22 0%, #0d0d0d 70%)`
            }}>
              {/* Mini muscle diagram overlay */}
              <div style={{
                position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(10,10,10,0.85)', borderRadius: '8px', padding: '4px 6px',
                backdropFilter: 'blur(6px)'
              }}>
                <MiniMuscleDiagram primary={ex.muscles.primary} secondary={ex.muscles.secondary || []} />
              </div>
              <div style={{
                position: 'absolute', top: '8px', left: '8px',
                background: CATEGORY_COLORS[ex.category] || 'var(--accent)',
                color: '#0a0a0a', padding: '3px 8px', borderRadius: '4px',
                fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em'
              }}>
                {ex.category.toUpperCase()}
              </div>
              <div style={{
                position: 'absolute', bottom: '8px', left: '8px',
                background: 'rgba(0,0,0,0.7)', color: DIFFICULTY_COLORS[ex.difficulty],
                padding: '3px 8px', borderRadius: '4px',
                fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.06em'
              }}>
                {ex.difficulty.toUpperCase()}
              </div>
            </div>

            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '3px' }}>{name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                {Array.isArray(ex.equipment) ? ex.equipment.join(' / ') : ex.equipment} · <span style={{ color: 'var(--accent)' }}>{ex.muscles.primary.join(', ')}</span>
                {ex.muscles.secondary?.length > 0 && (
                  <span style={{ color: '#555' }}> · {ex.muscles.secondary.slice(0,2).join(', ')}</span>
                )}
              </div>
              <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {ex.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Tiny inline muscle preview for cards
function MiniMuscleDiagram({ primary, secondary }) {
  const MUSCLE_MAP = {
    'Pectoralis Major': ['pec'], 'Upper Pectoralis Major': ['pec'], 'Lower Pectoralis Major': ['pec'],
    'Anterior Deltoid': ['delt'], 'Medial Deltoid': ['delt'], 'Posterior Deltoid': ['delt'], 'Rear Deltoid': ['delt'],
    'Triceps Brachii': ['tricep'], 'Biceps Brachii': ['bicep'], 'Brachialis': ['bicep'],
    'Latissimus Dorsi': ['lat'], 'Rhomboids': ['rhomboid'], 'Trapezius': ['trap'],
    'Erector Spinae': ['erector'], 'Core': ['abs'], 'Rectus Abdominis': ['abs'],
    'Obliques': ['oblique'], 'Transverse Abdominis': ['abs'],
    'Quadriceps': ['quad'], 'Hamstrings': ['ham'],
    'Gluteus Maximus': ['glute'], 'Glutes': ['glute'],
    'Calves': ['calf'], 'Gastrocnemius': ['calf'], 'Soleus': ['calf'],
    'Forearms': ['forearm'], 'Brachioradialis': ['forearm'],
    // Shorthand aliases
    'Triceps': ['tricep'], 'Biceps': ['bicep'],
    'Traps': ['trap'], 'Lats': ['lat'],
    'Quads': ['quad'], 'Legs': ['quad', 'ham'],
    'Shoulders': ['delt'],
  }

  const isPrimary = (id) => primary.some(m => (MUSCLE_MAP[m] || []).includes(id))
  const isSecondary = (id) => (secondary || []).some(m => (MUSCLE_MAP[m] || []).includes(id))
  const c = (id) => isPrimary(id) ? '#FF6B2B' : isSecondary(id) ? '#ff8c42' : '#1e1e1e'

  return (
    <svg viewBox="0 0 60 110" width="38" height="68">
      {/* Tiny body silhouette with colored regions */}
      <ellipse cx="30" cy="9" rx="9" ry="10" fill="#2a2520"/>
      <rect x="26" y="18" width="8" height="5" rx="2" fill="#2a2520"/>
      {/* Torso */}
      <path d="M16 23 Q12 25 11 38 L10 58 Q10 62 14 63 L46 63 Q50 62 50 58 L49 38 Q48 25 44 23 Z" fill="#2a2520"/>
      {/* Pec */}
      <path d="M30 26 Q22 24 18 30 Q16 36 20 39 Q26 41 30 38 Z" fill={c('pec')}/>
      <path d="M30 26 Q38 24 42 30 Q44 36 40 39 Q34 41 30 38 Z" fill={c('pec')}/>
      {/* Delts */}
      <ellipse cx="13" cy="31" rx="4" ry="5" fill={c('delt')}/>
      <ellipse cx="47" cy="31" rx="4" ry="5" fill={c('delt')}/>
      {/* Lat */}
      <path d="M16 32 L12 52 Q16 56 20 54 Q26 48 27 40 Z" fill={c('lat')}/>
      <path d="M44 32 L48 52 Q44 56 40 54 Q34 48 33 40 Z" fill={c('lat')}/>
      {/* Abs */}
      <path d="M24 40 Q30 38 36 40 L37 60 Q30 62 23 60 Z" fill={c('abs')}/>
      {/* Arms */}
      <path d="M11 35 L8 52 L12 54 L15 35 Z" fill={c('bicep')}/>
      <path d="M49 35 L52 52 L48 54 L45 35 Z" fill={c('bicep')}/>
      <path d="M11 35 L8 52 L12 54 L15 35 Z" fill={c('tricep')} opacity="0.5"/>
      <path d="M49 35 L52 52 L48 54 L45 35 Z" fill={c('tricep')} opacity="0.5"/>
      {/* Forearms */}
      <path d="M9 53 L8 66 L12 67 L14 53 Z" fill={c('forearm')}/>
      <path d="M51 53 L52 66 L48 67 L46 53 Z" fill={c('forearm')}/>
      {/* Hips */}
      <path d="M14 61 L12 72 L22 74 L30 73 L38 74 L48 72 L46 61 Z" fill="#2a2520"/>
      {/* Glutes */}
      <path d="M14 62 L12 74 L21 76 L26 61 Z" fill={c('glute')}/>
      <path d="M46 62 L48 74 L39 76 L34 61 Z" fill={c('glute')}/>
      {/* Quads */}
      <path d="M14 72 L12 96 L20 98 L24 72 Z" fill={c('quad')}/>
      <path d="M46 72 L48 96 L40 98 L36 72 Z" fill={c('quad')}/>
      {/* Hams */}
      <path d="M14 72 L12 96 L20 98 L24 72 Z" fill={c('ham')} opacity="0.6"/>
      <path d="M46 72 L48 96 L40 98 L36 72 Z" fill={c('ham')} opacity="0.6"/>
      {/* Calves */}
      <path d="M12 98 L11 110 L20 111 L22 98 Z" fill={c('calf')}/>
      <path d="M48 98 L49 110 L40 111 L38 98 Z" fill={c('calf')}/>
    </svg>
  )
}

function ExerciseDetail({ name, ex, onBack }) {
  const [tab, setTab] = useState('form')

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh', paddingBottom: 'calc(56px + var(--safe-bottom))' }}>
      {/* Back */}
      <div style={{ padding: '0 24px', paddingTop: 'calc(14px + var(--safe-top))' }}>
        <button onClick={onBack} style={{
          background: 'var(--surface)', color: 'var(--text)',
          padding: '8px 14px', borderRadius: '8px',
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          border: '1px solid var(--border)'
        }}>← BACK</button>
      </div>

      {/* Hero */}
      <div style={{ margin: '12px 24px 0', borderRadius: 'var(--radius)', overflow: 'hidden', position: 'relative', height: '160px', background: '#0d0d0d' }}>
        <img
          src={`https://source.unsplash.com/600x300/?${encodeURIComponent(ex.imageQuery)}`}
          alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div style={{
          position: 'absolute', inset: 0, padding: '14px 16px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)'
        }}>
          <div style={{
            display: 'inline-block', background: CATEGORY_COLORS[ex.category] || 'var(--accent)',
            color: '#0a0a0a', padding: '3px 8px', borderRadius: '4px',
            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
            marginBottom: '5px', width: 'fit-content'
          }}>
            {ex.category.toUpperCase()} · {(Array.isArray(ex.equipment) ? ex.equipment.join(' / ') : ex.equipment).toUpperCase()}
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1.1 }}>{name}</h1>
        </div>
      </div>

      <div style={{ padding: '14px 24px 0' }}>

        {/* ══ MUSCLE ANATOMY DIAGRAM ══ */}
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius)',
          border: '1px solid var(--border)', padding: '16px', marginBottom: '14px'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '12px' }}>
            MUSCLES WORKED
          </div>

          {/* Diagram */}
          <MuscleDiagram
            primaryMuscles={ex.muscles.primary}
            secondaryMuscles={ex.muscles.secondary || []}
          />

          {/* Legend */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#FF6B2B' }}/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Primary</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#ff8c42' }}/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Secondary</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#2a2520' }}/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Inactive</span>
            </div>
          </div>

          {/* Muscle name tags */}
          <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
            {ex.muscles.primary.map(m => {
              const common = COMMON_NAMES[m]
              return (
                <span key={m} style={{
                  background: 'rgba(255,107,43,0.12)', color: 'var(--accent)',
                  border: '1px solid rgba(255,107,43,0.3)',
                  padding: '3px 10px', borderRadius: '12px',
                  fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px'
                }}>
                  <span>{common || m}</span>
                  {common && <span style={{ opacity: 0.6, fontSize: '9px', fontWeight: 400 }}>{m}</span>}
                </span>
              )
            })}
            {(ex.muscles.secondary || []).map(m => {
              const common = COMMON_NAMES[m]
              return (
                <span key={m} style={{
                  background: 'rgba(255,140,66,0.1)', color: '#ff8c42',
                  border: '1px solid rgba(255,140,66,0.25)',
                  padding: '3px 10px', borderRadius: '12px',
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px'
                }}>
                  <span>{common || m}</span>
                  {common && <span style={{ opacity: 0.55, fontSize: '9px' }}>{m}</span>}
                </span>
              )
            })}
          </div>
        </div>

        {/* Description */}
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '14px',
          border: '1px solid var(--border)', marginBottom: '14px',
          fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.75, color: '#aaa'
        }}>
          {ex.description}
        </div>

        {/* YouTube Video */}
        <div style={{
          borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '14px',
          aspectRatio: '16/9', background: '#000'
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${ex.videoId}?rel=0&modestbranding=1`}
            title={`${name} tutorial`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          {[['form', '✓ Form Cues'], ['mistakes', '⚠ Mistakes'], ['tips', '💡 Pro Tip']].map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '8px 10px', borderRadius: '8px', fontFamily: 'var(--font-mono)',
              fontSize: '11px', background: tab === t ? 'var(--accent)' : 'var(--surface)',
              color: tab === t ? '#0a0a0a' : 'var(--text-muted)',
              border: `1px solid ${tab === t ? 'transparent' : 'var(--border)'}`,
              flex: 1, transition: 'all 0.15s'
            }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'form' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ex.formCues.map((cue, i) => (
              <div key={i} style={{
                background: 'var(--surface)', borderRadius: '8px', padding: '12px 14px',
                border: '1px solid var(--border)', display: 'flex', gap: '10px', alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: 'var(--accent)', color: '#0a0a0a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, flexShrink: 0
                }}>{i + 1}</div>
                <div style={{ fontSize: '13px', lineHeight: 1.5 }}>{cue}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'mistakes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ex.commonMistakes.map((m, i) => (
              <div key={i} style={{
                background: 'rgba(255,95,61,0.08)', borderRadius: '8px', padding: '12px 14px',
                border: '1px solid rgba(255,95,61,0.2)', display: 'flex', gap: '10px', alignItems: 'flex-start'
              }}>
                <span style={{ color: '#FF3B30', fontSize: '16px', flexShrink: 0 }}>✗</span>
                <div style={{ fontSize: '13px', lineHeight: 1.5 }}>{m}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && (
          <div style={{
            background: 'rgba(255,107,43,0.06)', border: '1px solid rgba(255,107,43,0.2)',
            borderRadius: 'var(--radius)', padding: '20px',
            fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.75, color: 'var(--text)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>💡</div>
            {ex.proTip}
          </div>
        )}
      </div>
    </div>
  )
}

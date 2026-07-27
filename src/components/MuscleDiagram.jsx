import React from 'react'

// Color scheme
const C = {
  skin: '#2a1f1a',
  skinLight: '#3d2d25',
  outline: '#1a1210',
  primary: '#FF6B2B',    // forge orange — primary muscle
  secondary: '#ff8c42',  // orange — secondary muscle
  inactive: '#2a2520',   // very dark — uninvolved muscle
}

// Maps muscle names (from our exercise database) to SVG group IDs
const MUSCLE_MAP = {
  // Chest
  'Pectoralis Major': ['pec-l', 'pec-r'],
  'Upper Pectoralis Major': ['pec-l', 'pec-r'],
  'Lower Pectoralis Major': ['pec-l', 'pec-r'],
  'Pectoralis Minor': ['pec-l', 'pec-r'],
  // Shoulders
  'Anterior Deltoid': ['delt-ant-l', 'delt-ant-r'],
  'Medial Deltoid': ['delt-med-l', 'delt-med-r'],
  'Posterior Deltoid': ['delt-post-l', 'delt-post-r'],
  'Rear Deltoid': ['delt-post-l', 'delt-post-r'],
  'Supraspinatus': ['trap-l', 'trap-r'],
  // Arms
  'Triceps Brachii': ['tricep-l', 'tricep-r'],
  'Biceps Brachii': ['bicep-l', 'bicep-r'],
  'Brachialis': ['bicep-l', 'bicep-r'],
  'Brachioradialis': ['forearm-l', 'forearm-r'],
  'Forearms': ['forearm-l', 'forearm-r'],
  // Back
  'Latissimus Dorsi': ['lat-l', 'lat-r'],
  'Rhomboids': ['rhomboid-l', 'rhomboid-r'],
  'Trapezius': ['trap-l', 'trap-r'],
  'Middle Trapezius': ['trap-l', 'trap-r'],
  'Erector Spinae': ['erector-l', 'erector-r'],
  'Rotator Cuff': ['delt-post-l', 'delt-post-r'],
  // Core
  'Rectus Abdominis': ['abs'],
  'Transverse Abdominis': ['abs'],
  'Obliques': ['oblique-l', 'oblique-r'],
  'Core': ['abs', 'oblique-l', 'oblique-r'],
  // Legs
  'Quadriceps': ['quad-l', 'quad-r'],
  'Hamstrings': ['ham-l', 'ham-r'],
  'Gluteus Maximus': ['glute-l', 'glute-r'],
  'Glutes': ['glute-l', 'glute-r'],
  'Adductors': ['adductor-l', 'adductor-r'],
  'Calves': ['calf-l', 'calf-r'],
  'Gastrocnemius': ['calf-l', 'calf-r'],
  'Soleus': ['calf-l', 'calf-r'],
  'Hip Flexors': ['quad-l', 'quad-r'],
  // Misc
  'Cardiovascular System': [],
  // Shorthand aliases used in some exercises
  'Triceps': ['tricep-l', 'tricep-r'],
  'Biceps': ['bicep-l', 'bicep-r'],
  'Traps': ['trap-l', 'trap-r'],
  'Lats': ['lat-l', 'lat-r'],
  'Quads': ['quad-l', 'quad-r'],
  'Shoulders': ['delt-ant-l', 'delt-ant-r', 'delt-med-l', 'delt-med-r'],
  'Legs': ['quad-l', 'quad-r', 'ham-l', 'ham-r'],
}

function getMuscleColor(id, primary, secondary) {
  const isPrimary = primary.some(m => (MUSCLE_MAP[m] || []).includes(id))
  const isSecondary = secondary.some(m => (MUSCLE_MAP[m] || []).includes(id))
  if (isPrimary) return C.primary
  if (isSecondary) return C.secondary
  return C.inactive
}

export default function MuscleDiagram({ primaryMuscles = [], secondaryMuscles = [] }) {
  const gc = (id) => getMuscleColor(id, primaryMuscles, secondaryMuscles)

  return (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', padding: '8px 0' }}>
      <AnteriorView gc={gc} />
      <PosteriorView gc={gc} />
    </div>
  )
}

function AnteriorView({ gc }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <svg viewBox="0 0 120 260" width="110" height="220" style={{ display: 'block' }}>
        {/* Body outline — anterior */}
        {/* Head */}
        <ellipse cx="60" cy="22" rx="18" ry="20" fill={C.skinLight} stroke={C.outline} strokeWidth="1.2"/>
        {/* Neck */}
        <rect x="53" y="38" width="14" height="12" rx="3" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        {/* Torso */}
        <path d="M35 50 Q28 52 26 65 L24 110 Q24 118 32 120 L88 120 Q96 118 96 110 L94 65 Q92 52 85 50 Z"
          fill={C.skinLight} stroke={C.outline} strokeWidth="1.2"/>

        {/* ── CHEST ── */}
        {/* Left pec (viewer's right) */}
        <path id="pec-l" d="M60 58 Q55 55 46 58 Q38 62 37 72 Q36 80 44 82 Q52 84 58 78 Q62 74 62 68 Z"
          fill={gc('pec-l')} stroke={C.outline} strokeWidth="0.8" opacity="0.95"/>
        {/* Right pec */}
        <path id="pec-r" d="M60 58 Q65 55 74 58 Q82 62 83 72 Q84 80 76 82 Q68 84 62 78 Q58 74 58 68 Z"
          fill={gc('pec-r')} stroke={C.outline} strokeWidth="0.8" opacity="0.95"/>

        {/* ── DELTOIDS (anterior) ── */}
        {/* Left */}
        <path id="delt-ant-l" d="M35 50 Q28 52 26 65 Q28 58 36 56 Z"
          fill={gc('delt-ant-l')} stroke={C.outline} strokeWidth="0.8"/>
        {/* Right */}
        <path id="delt-ant-r" d="M85 50 Q92 52 94 65 Q92 58 84 56 Z"
          fill={gc('delt-ant-r')} stroke={C.outline} strokeWidth="0.8"/>
        {/* Medial delt left */}
        <ellipse id="delt-med-l" cx="30" cy="63" rx="7" ry="8" fill={gc('delt-med-l')} stroke={C.outline} strokeWidth="0.8"/>
        {/* Medial delt right */}
        <ellipse id="delt-med-r" cx="90" cy="63" rx="7" ry="8" fill={gc('delt-med-r')} stroke={C.outline} strokeWidth="0.8"/>

        {/* ── BICEPS ── */}
        {/* Left arm */}
        <path d="M26 65 L20 70 L18 100 L24 102 L28 100 L30 70 Z" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <path id="bicep-l" d="M26 67 Q21 72 20 85 Q22 90 25 90 Q28 90 29 85 Q30 72 27 67 Z"
          fill={gc('bicep-l')} stroke={C.outline} strokeWidth="0.7"/>
        {/* Right arm */}
        <path d="M94 65 L100 70 L102 100 L96 102 L92 100 L90 70 Z" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <path id="bicep-r" d="M94 67 Q99 72 100 85 Q98 90 95 90 Q92 90 91 85 Q90 72 93 67 Z"
          fill={gc('bicep-r')} stroke={C.outline} strokeWidth="0.7"/>

        {/* ── FOREARMS ── */}
        <path d="M20 100 L18 130 L24 132 L28 130 L28 100 Z" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <path id="forearm-l" d="M20 100 L18 128 L24 130 L28 128 L28 100 Z" fill={gc('forearm-l')} stroke={C.outline} strokeWidth="0.7" opacity="0.9"/>
        <path d="M100 100 L102 130 L96 132 L92 130 L92 100 Z" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <path id="forearm-r" d="M100 100 L102 128 L96 130 L92 128 L92 100 Z" fill={gc('forearm-r')} stroke={C.outline} strokeWidth="0.7" opacity="0.9"/>

        {/* Hands */}
        <ellipse cx="21" cy="136" rx="6" ry="8" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <ellipse cx="99" cy="136" rx="6" ry="8" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>

        {/* ── ABS ── */}
        <path id="abs" d="M50 84 Q60 82 70 84 L72 115 Q60 118 48 115 Z"
          fill={gc('abs')} stroke={C.outline} strokeWidth="0.8"/>
        {/* Linea alba and ab separations */}
        <line x1="60" y1="84" x2="60" y2="116" stroke={C.outline} strokeWidth="0.6" opacity="0.5"/>
        <line x1="48" y1="95" x2="72" y2="95" stroke={C.outline} strokeWidth="0.6" opacity="0.5"/>
        <line x1="49" y1="105" x2="71" y2="105" stroke={C.outline} strokeWidth="0.6" opacity="0.5"/>

        {/* ── OBLIQUES ── */}
        <path id="oblique-l" d="M44 82 Q37 88 35 105 Q38 112 48 115 Q47 100 50 88 Z"
          fill={gc('oblique-l')} stroke={C.outline} strokeWidth="0.7"/>
        <path id="oblique-r" d="M76 82 Q83 88 85 105 Q82 112 72 115 Q73 100 70 88 Z"
          fill={gc('oblique-r')} stroke={C.outline} strokeWidth="0.7"/>

        {/* ── HIPS / PELVIS ── */}
        <path d="M32 118 L28 145 L45 148 L60 146 L75 148 L92 145 L88 118 Z"
          fill={C.skinLight} stroke={C.outline} strokeWidth="1.1"/>

        {/* ── QUADS ── */}
        {/* Left quad */}
        <path id="quad-l" d="M32 140 L28 190 Q30 200 38 200 Q46 200 48 190 L52 145 Z"
          fill={gc('quad-l')} stroke={C.outline} strokeWidth="0.9"/>
        {/* Right quad */}
        <path id="quad-r" d="M88 140 L92 190 Q90 200 82 200 Q74 200 72 190 L68 145 Z"
          fill={gc('quad-r')} stroke={C.outline} strokeWidth="0.9"/>

        {/* ── ADDUCTORS ── */}
        <path id="adductor-l" d="M52 145 L48 190 L56 192 L60 148 Z"
          fill={gc('adductor-l')} stroke={C.outline} strokeWidth="0.7"/>
        <path id="adductor-r" d="M68 145 L72 190 L64 192 L60 148 Z"
          fill={gc('adductor-r')} stroke={C.outline} strokeWidth="0.7"/>

        {/* ── CALVES (front, visible) ── */}
        {/* Left */}
        <path d="M30 202 L28 240 L38 242 L46 240 L48 202 Z" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <path id="calf-l" d="M30 202 L28 238 L38 240 L46 238 L48 202 Q40 215 39 202 Z"
          fill={gc('calf-l')} stroke={C.outline} strokeWidth="0.7" opacity="0.85"/>
        {/* Right */}
        <path d="M90 202 L92 240 L82 242 L74 240 L72 202 Z" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <path id="calf-r" d="M90 202 L92 238 L82 240 L74 238 L72 202 Q80 215 81 202 Z"
          fill={gc('calf-r')} stroke={C.outline} strokeWidth="0.7" opacity="0.85"/>

        {/* Feet */}
        <ellipse cx="37" cy="246" rx="11" ry="6" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <ellipse cx="83" cy="246" rx="11" ry="6" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
      </svg>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.08em', marginTop: '4px' }}>FRONT</div>
    </div>
  )
}

function PosteriorView({ gc }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <svg viewBox="0 0 120 260" width="110" height="220" style={{ display: 'block' }}>
        {/* Head (posterior) */}
        <ellipse cx="60" cy="22" rx="18" ry="20" fill={C.skinLight} stroke={C.outline} strokeWidth="1.2"/>
        {/* Neck */}
        <rect x="53" y="38" width="14" height="12" rx="3" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        {/* Torso back */}
        <path d="M35 50 Q28 52 26 65 L24 110 Q24 118 32 120 L88 120 Q96 118 96 110 L94 65 Q92 52 85 50 Z"
          fill={C.skinLight} stroke={C.outline} strokeWidth="1.2"/>

        {/* ── TRAPEZIUS ── */}
        <path id="trap-l" d="M60 42 Q52 44 44 50 Q36 55 35 62 Q42 56 50 54 Q56 52 60 50 Z"
          fill={gc('trap-l')} stroke={C.outline} strokeWidth="0.8"/>
        <path id="trap-r" d="M60 42 Q68 44 76 50 Q84 55 85 62 Q78 56 70 54 Q64 52 60 50 Z"
          fill={gc('trap-r')} stroke={C.outline} strokeWidth="0.8"/>

        {/* ── REAR DELTOIDS ── */}
        <ellipse id="delt-post-l" cx="30" cy="63" rx="7" ry="8" fill={gc('delt-post-l')} stroke={C.outline} strokeWidth="0.8"/>
        <ellipse id="delt-post-r" cx="90" cy="63" rx="7" ry="8" fill={gc('delt-post-r')} stroke={C.outline} strokeWidth="0.8"/>

        {/* ── RHOMBOIDS ── */}
        <path id="rhomboid-l" d="M60 54 Q56 58 48 66 Q50 72 56 72 Q62 70 62 64 Z"
          fill={gc('rhomboid-l')} stroke={C.outline} strokeWidth="0.7"/>
        <path id="rhomboid-r" d="M60 54 Q64 58 72 66 Q70 72 64 72 Q58 70 58 64 Z"
          fill={gc('rhomboid-r')} stroke={C.outline} strokeWidth="0.7"/>

        {/* ── LATS ── */}
        <path id="lat-l" d="M35 65 Q28 75 26 100 Q30 110 38 112 Q50 110 56 90 Q60 78 56 68 Z"
          fill={gc('lat-l')} stroke={C.outline} strokeWidth="0.8"/>
        <path id="lat-r" d="M85 65 Q92 75 94 100 Q90 110 82 112 Q70 110 64 90 Q60 78 64 68 Z"
          fill={gc('lat-r')} stroke={C.outline} strokeWidth="0.8"/>

        {/* ── ERECTORS ── */}
        <path id="erector-l" d="M57 70 Q54 80 54 112 Q57 116 60 116 Q60 80 57 70 Z"
          fill={gc('erector-l')} stroke={C.outline} strokeWidth="0.7"/>
        <path id="erector-r" d="M63 70 Q66 80 66 112 Q63 116 60 116 Q60 80 63 70 Z"
          fill={gc('erector-r')} stroke={C.outline} strokeWidth="0.7"/>

        {/* Arms (back view — triceps visible) */}
        {/* Left arm shell */}
        <path d="M26 65 L20 70 L18 100 L24 102 L28 100 L30 70 Z" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <path id="tricep-l" d="M26 67 Q20 72 19 86 Q21 92 25 92 Q29 92 30 86 Q30 72 27 67 Z"
          fill={gc('tricep-l')} stroke={C.outline} strokeWidth="0.7"/>
        {/* Right arm shell */}
        <path d="M94 65 L100 70 L102 100 L96 102 L92 100 L90 70 Z" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <path id="tricep-r" d="M94 67 Q100 72 101 86 Q99 92 95 92 Q91 92 90 86 Q90 72 93 67 Z"
          fill={gc('tricep-r')} stroke={C.outline} strokeWidth="0.7"/>

        {/* Forearms */}
        <path id="forearm-l" d="M20 100 L18 128 L24 130 L28 128 L28 100 Z" fill={gc('forearm-l')} stroke={C.outline} strokeWidth="0.7" opacity="0.9"/>
        <path id="forearm-r" d="M100 100 L102 128 L96 130 L92 128 L92 100 Z" fill={gc('forearm-r')} stroke={C.outline} strokeWidth="0.7" opacity="0.9"/>
        <ellipse cx="21" cy="136" rx="6" ry="8" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <ellipse cx="99" cy="136" rx="6" ry="8" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>

        {/* ── GLUTES ── */}
        <path id="glute-l" d="M32 118 L28 148 Q32 158 42 156 Q52 154 54 148 L52 120 Z"
          fill={gc('glute-l')} stroke={C.outline} strokeWidth="0.9"/>
        <path id="glute-r" d="M88 118 L92 148 Q88 158 78 156 Q68 154 66 148 L68 120 Z"
          fill={gc('glute-r')} stroke={C.outline} strokeWidth="0.9"/>
        {/* Glute center */}
        <path d="M52 120 L54 148 Q60 152 66 148 L68 120 Z" fill={C.skinLight} stroke={C.outline} strokeWidth="0.8"/>

        {/* ── HAMSTRINGS ── */}
        <path id="ham-l" d="M28 150 L26 195 Q28 204 36 204 Q46 204 48 195 L52 152 Q42 162 28 150 Z"
          fill={gc('ham-l')} stroke={C.outline} strokeWidth="0.9"/>
        <path id="ham-r" d="M92 150 L94 195 Q92 204 84 204 Q74 204 72 195 L68 152 Q78 162 92 150 Z"
          fill={gc('ham-r')} stroke={C.outline} strokeWidth="0.9"/>

        {/* ── CALVES (posterior) ── */}
        <path id="calf-l" d="M28 205 Q26 230 30 242 L38 244 L46 242 Q50 230 48 205 Q40 218 28 205 Z"
          fill={gc('calf-l')} stroke={C.outline} strokeWidth="0.9"/>
        <path id="calf-r" d="M92 205 Q94 230 90 242 L82 244 L74 242 Q70 230 72 205 Q80 218 92 205 Z"
          fill={gc('calf-r')} stroke={C.outline} strokeWidth="0.9"/>

        {/* Feet */}
        <ellipse cx="37" cy="248" rx="11" ry="6" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
        <ellipse cx="83" cy="248" rx="11" ry="6" fill={C.skinLight} stroke={C.outline} strokeWidth="1"/>
      </svg>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.08em', marginTop: '4px' }}>BACK</div>
    </div>
  )
}

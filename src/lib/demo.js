// Demo mode — lets visitors explore SteelSet with realistic sample data,
// no account required. Everything lives in sessionStorage, so it never
// touches Supabase and each visitor gets their own private sandbox.

const FLAG_KEY = 'steelset_demo'
const DATA_KEY = 'steelset_demo_data'

export const DEMO_USER = {
  id: 'demo-user',
  email: 'demo@steelset.app',
}

// ── session flag ──────────────────────────────────────
export function isDemo() {
  try {
    return sessionStorage.getItem(FLAG_KEY) === '1'
  } catch {
    return false
  }
}

export function startDemo() {
  sessionStorage.setItem(FLAG_KEY, '1')
  sessionStorage.setItem(DATA_KEY, JSON.stringify(seed()))
}

export function stopDemo() {
  sessionStorage.removeItem(FLAG_KEY)
  sessionStorage.removeItem(DATA_KEY)
}

// Allows linking straight into the demo, e.g. steelset.vercel.app/?demo=1
export function maybeStartFromUrl() {
  try {
    if (new URLSearchParams(window.location.search).get('demo') === '1' && !isDemo()) {
      startDemo()
    }
  } catch {
    /* no-op */
  }
}

// ── store ─────────────────────────────────────────────
function load() {
  try {
    return JSON.parse(sessionStorage.getItem(DATA_KEY)) || []
  } catch {
    return []
  }
}

function save(workouts) {
  sessionStorage.setItem(DATA_KEY, JSON.stringify(workouts))
}

let counter = 0
const uid = prefix => `${prefix}-${Date.now().toString(36)}-${counter++}`

function isoDaysAgo(days) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().slice(0, 10)
}

// ── seed data ─────────────────────────────────────────
// Sessions are laid out relative to today so the dashboard's
// "this week" stats always look alive.
const PLAN = [
  { daysAgo: 1, type: 'Push', notes: 'Felt strong, added 2.5kg to bench.', lifts: [
    { exercise: 'Bench Press', equipment: 'Barbell', sets: [[8, 80], [8, 80], [6, 85]] },
    { exercise: 'Overhead Press', equipment: 'Barbell', sets: [[10, 45], [9, 45], [8, 47.5]] },
    { exercise: 'Incline Dumbbell Press', equipment: 'Dumbbell', sets: [[12, 26], [10, 28]] },
    { exercise: 'Tricep Pushdown', equipment: 'Cable', sets: [[15, 30], [13, 32.5]] },
  ]},
  { daysAgo: 3, type: 'Pull', notes: '', lifts: [
    { exercise: 'Deadlift', equipment: 'Barbell', sets: [[5, 130], [5, 130], [3, 145]] },
    { exercise: 'Pull-Up', equipment: 'Bodyweight', sets: [[10, 0], [8, 0], [7, 0]] },
    { exercise: 'Barbell Row', equipment: 'Barbell', sets: [[10, 70], [10, 70], [8, 75]] },
    { exercise: 'Bicep Curl', equipment: 'Dumbbell', sets: [[12, 14], [11, 14]] },
  ]},
  { daysAgo: 5, type: 'Legs', notes: 'Depth felt much better today.', lifts: [
    { exercise: 'Squat', equipment: 'Barbell', sets: [[8, 100], [8, 100], [6, 110]] },
    { exercise: 'Romanian Deadlift', equipment: 'Barbell', sets: [[10, 80], [10, 80]] },
    { exercise: 'Leg Press', equipment: 'Machine', sets: [[12, 180], [12, 190], [10, 200]] },
    { exercise: 'Calf Raise', equipment: 'Machine', sets: [[15, 60], [15, 60], [14, 65]] },
  ]},
  { daysAgo: 6, type: 'Cardio', notes: '5k intervals.', lifts: [
    { exercise: 'Treadmill Run', equipment: 'Machine', sets: [[1, 0]] },
  ]},
  { daysAgo: 8, type: 'Push', notes: '', lifts: [
    { exercise: 'Bench Press', equipment: 'Barbell', sets: [[8, 77.5], [8, 77.5], [7, 80]] },
    { exercise: 'Overhead Press', equipment: 'Barbell', sets: [[10, 45], [8, 45]] },
    { exercise: 'Lateral Raise', equipment: 'Dumbbell', sets: [[15, 10], [14, 10]] },
  ]},
  { daysAgo: 10, type: 'Pull', notes: '', lifts: [
    { exercise: 'Deadlift', equipment: 'Barbell', sets: [[5, 125], [5, 125]] },
    { exercise: 'Lat Pulldown', equipment: 'Cable', sets: [[12, 55], [12, 55], [10, 60]] },
    { exercise: 'Barbell Row', equipment: 'Barbell', sets: [[10, 67.5], [10, 67.5]] },
  ]},
  { daysAgo: 12, type: 'Legs', notes: '', lifts: [
    { exercise: 'Squat', equipment: 'Barbell', sets: [[8, 95], [8, 95], [8, 95]] },
    { exercise: 'Leg Press', equipment: 'Machine', sets: [[12, 170], [12, 180]] },
  ]},
  { daysAgo: 15, type: 'Full', notes: 'Deload week.', lifts: [
    { exercise: 'Squat', equipment: 'Barbell', sets: [[10, 70], [10, 70]] },
    { exercise: 'Bench Press', equipment: 'Barbell', sets: [[10, 65], [10, 65]] },
    { exercise: 'Barbell Row', equipment: 'Barbell', sets: [[10, 60], [10, 60]] },
  ]},
  { daysAgo: 19, type: 'Push', notes: '', lifts: [
    { exercise: 'Bench Press', equipment: 'Barbell', sets: [[8, 75], [8, 75], [6, 77.5]] },
    { exercise: 'Incline Dumbbell Press', equipment: 'Dumbbell', sets: [[12, 24], [10, 26]] },
  ]},
  { daysAgo: 22, type: 'Legs', notes: '', lifts: [
    { exercise: 'Squat', equipment: 'Barbell', sets: [[8, 92.5], [8, 92.5]] },
    { exercise: 'Romanian Deadlift', equipment: 'Barbell', sets: [[10, 75], [10, 75]] },
  ]},
]

function seed() {
  return PLAN.map(session => {
    const workoutId = uid('w')
    const date = isoDaysAgo(session.daysAgo)
    const sets = []
    session.lifts.forEach(lift => {
      lift.sets.forEach(([reps, weight], i) => {
        sets.push({
          id: uid('s'),
          workout_id: workoutId,
          exercise: lift.exercise,
          set_number: i + 1,
          reps,
          weight,
          unit: 'kg',
          equipment: lift.equipment,
        })
      })
    })
    return {
      id: workoutId,
      user_id: DEMO_USER.id,
      date,
      type: session.type,
      notes: session.notes,
      created_at: `${date}T09:00:00.000Z`,
      sets,
    }
  })
}

// ── db surface (mirrors src/lib/db.js return shapes) ──
const ok = data => ({ data, error: null })

const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)

export const demoDb = {
  getWorkouts() {
    return ok([...load()].sort(byDateDesc))
  },

  getWorkoutsByDate(date) {
    return ok(load().filter(w => w.date === date))
  },

  createWorkout({ date, type, notes }) {
    const workouts = load()
    const workout = {
      id: uid('w'),
      user_id: DEMO_USER.id,
      date,
      type,
      notes: notes || '',
      created_at: new Date().toISOString(),
      sets: [],
    }
    workouts.push(workout)
    save(workouts)
    return ok(workout)
  },

  deleteWorkout(id) {
    save(load().filter(w => w.id !== id))
    return ok(null)
  },

  addSet(workoutId, fields) {
    const workouts = load()
    const workout = workouts.find(w => w.id === workoutId)
    if (!workout) return { data: null, error: { message: 'Workout not found' } }
    const set = { id: uid('s'), workout_id: workoutId, ...fields }
    workout.sets.push(set)
    save(workouts)
    return ok(set)
  },

  updateSet(id, fields) {
    const workouts = load()
    for (const w of workouts) {
      const set = w.sets.find(s => s.id === id)
      if (set) {
        Object.assign(set, fields)
        save(workouts)
        return ok(set)
      }
    }
    return { data: null, error: { message: 'Set not found' } }
  },

  deleteSet(id) {
    const workouts = load()
    workouts.forEach(w => { w.sets = w.sets.filter(s => s.id !== id) })
    save(workouts)
    return ok(null)
  },

  getExerciseHistory(exercise) {
    const rows = []
    load().forEach(w => {
      w.sets
        .filter(s => s.exercise === exercise)
        .forEach(s => rows.push({ ...s, workouts: { date: w.date, user_id: w.user_id } }))
    })
    rows.sort((a, b) => (a.workouts.date > b.workouts.date ? 1 : -1))
    return ok(rows)
  },
}

import { supabase } from './supabase'

// ── AUTH ──────────────────────────────────────────────
export async function signUp(email, password) {
  return supabase.auth.signUp({ email, password })
}

export async function signIn(email, password) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getSession() {
  return supabase.auth.getSession()
}

// ── WORKOUTS ──────────────────────────────────────────
export async function getWorkouts(userId) {
  return supabase
    .from('workouts')
    .select('*, sets(*)')
    .eq('user_id', userId)
    .order('date', { ascending: false })
}

export async function getWorkoutsByDate(userId, date) {
  return supabase
    .from('workouts')
    .select('*, sets(*)')
    .eq('user_id', userId)
    .eq('date', date)
    .order('created_at', { ascending: true })
}

export async function createWorkout(userId, { date, type, notes }) {
  return supabase
    .from('workouts')
    .insert({ user_id: userId, date, type, notes })
    .select()
    .single()
}

export async function deleteWorkout(id) {
  return supabase.from('workouts').delete().eq('id', id)
}

// ── SETS ──────────────────────────────────────────────
export async function addSet(workoutId, { exercise, set_number, reps, weight, unit, equipment }) {
  return supabase
    .from('sets')
    .insert({ workout_id: workoutId, exercise, set_number, reps, weight, unit, equipment: equipment || null })
    .select()
    .single()
}

export async function updateSet(id, fields) {
  return supabase.from('sets').update(fields).eq('id', id).select().single()
}

export async function deleteSet(id) {
  return supabase.from('sets').delete().eq('id', id)
}

// ── STATS ─────────────────────────────────────────────
export async function getExerciseHistory(userId, exercise) {
  return supabase
    .from('sets')
    .select('*, workouts!inner(date, user_id)')
    .eq('workouts.user_id', userId)
    .eq('exercise', exercise)
    .order('date', { referencedTable: 'workouts', ascending: true })
}

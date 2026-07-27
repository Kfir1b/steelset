-- ============================================================
-- SteelSet - Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

create extension if not exists "uuid-ossp";

-- Workouts table
create table workouts (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  date        date not null,
  type        text not null check (type in ('Push','Pull','Legs','Full','Cardio','Rest')),
  notes       text,
  created_at  timestamptz default now()
);

-- Sets table
create table sets (
  id          uuid primary key default uuid_generate_v4(),
  workout_id  uuid references workouts(id) on delete cascade not null,
  exercise    text not null,
  set_number  integer not null,
  reps        integer not null,
  weight      numeric(6,2) default 0,
  unit        text default 'kg' check (unit in ('kg','lbs')),
  equipment   text,
  created_at  timestamptz default now()
);

-- Row Level Security (users only see their own data)
alter table workouts enable row level security;
alter table sets enable row level security;

create policy "Users see own workouts" on workouts for select using (auth.uid() = user_id);
create policy "Users insert own workouts" on workouts for insert with check (auth.uid() = user_id);
create policy "Users delete own workouts" on workouts for delete using (auth.uid() = user_id);

create policy "Users see own sets" on sets for select
  using (exists (select 1 from workouts w where w.id = sets.workout_id and w.user_id = auth.uid()));
create policy "Users insert own sets" on sets for insert
  with check (exists (select 1 from workouts w where w.id = sets.workout_id and w.user_id = auth.uid()));
create policy "Users delete own sets" on sets for delete
  using (exists (select 1 from workouts w where w.id = sets.workout_id and w.user_id = auth.uid()));

-- Migration: add equipment column to existing databases
-- alter table sets add column if not exists equipment text;

-- Indexes for performance
create index workouts_user_date on workouts(user_id, date desc);
create index sets_workout_id on sets(workout_id);

-- Optional: Personal bests function
create or replace function get_personal_bests(p_user_id uuid)
returns table(exercise text, max_weight numeric, unit text, achieved_on date)
language sql stable as $$
  select distinct on (s.exercise)
    s.exercise, s.weight as max_weight, s.unit, w.date as achieved_on
  from sets s
  join workouts w on w.id = s.workout_id
  where w.user_id = p_user_id and s.weight > 0
  order by s.exercise, s.weight desc;
$$;

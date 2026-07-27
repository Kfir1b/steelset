# 🏋️ SteelSet — Training Tracker

**Load the bar, own the set, dominate your goals.**

A cross-platform training tracker that runs on **iOS, Android, desktop, and web** from a single codebase — with real-time cloud sync, secure per-user data, and native mobile builds.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Capacitor](https://img.shields.io/badge/Capacitor-6-119EFF?logo=capacitor&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E?logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

### 🔗 [**Live Demo → steelset.vercel.app**](https://steelset.vercel.app)

Built by **[Kfir Brodbeker](https://github.com/Kfir1b)**.

---

## ✨ What it does

- 🔐 **Email authentication** — sign up / sign in, secure sessions
- 🏋️ **Log workouts** — type, date, sets, reps, weight (kg or lbs)
- ⚡ **Quick-add exercises** by workout type
- 📊 **Dashboard** with weekly stats + volume tracking
- 📅 **Full history** grouped by month, filterable by type
- 🔎 **Workout detail** view with per-exercise set breakdown
- ☁️ **Real-time sync** across all devices via Supabase
- 🛡️ **Row Level Security** — every user only ever sees their own data

## 🧱 Tech & architecture

| Layer | Choice |
|-------|--------|
| **UI** | React 18 + React Router |
| **Build** | Vite 5 |
| **Backend** | Supabase (Postgres + Auth + real-time) |
| **Cross-platform** | Capacitor 6 → native iOS & Android from the same web codebase |
| **Deploy** | Vercel (web) |

One React codebase compiles to **web, iOS, Android, and desktop** — no separate native apps to maintain. Data security is enforced at the database level with **Postgres Row Level Security**, not just in the client.

---

## 🚀 Quick Start

### 1. Set up Supabase (5 min)
1. Create a free account at [supabase.com](https://supabase.com)
2. New Project → SQL Editor → New Query
3. Paste `supabase-schema.sql` contents → Run
4. Settings → API → copy **Project URL** and **anon public key**

### 2. Configure environment
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase URL and anon key
```

### 3. Install & run
```bash
npm install
npm run dev        # Web: http://localhost:3000
```

---

## 📱 iOS Build (requires Mac + Xcode)
```bash
npm run build
npm run cap:sync
npm run cap:ios    # Opens Xcode → hit Run
```
For a real .ipa: Product → Archive (needs Apple Developer account, $99/yr)

## 🤖 Android Build (requires Android Studio)
```bash
npm run build && npm run cap:sync && npm run cap:android
```

## 🖥️ Desktop (Electron)
```bash
npm install --save-dev @capacitor-community/electron
npx cap add @capacitor-community/electron
npm run build && npx cap sync @capacitor-community/electron
cd electron && npm install && npm start
```

---

## 🔮 Roadmap
- Progress charts per exercise
- Personal bests tracker
- Workout templates / programs
- Rest timer
- Export as CSV
- Apple Health / Google Fit integration

---

## 👤 Author
**Kfir Brodbeker** — [github.com/Kfir1b](https://github.com/Kfir1b)

## 📄 License
© 2026 Kfir Brodbeker. **All rights reserved.**
This source is published for portfolio and evaluation purposes. You may view it, but it may not be copied, reused, redistributed, or used to create derivative works without express written permission.

# 🏋️ SteelSet — Training Tracker

Cross-platform training tracker: **React + Capacitor + Supabase**
Runs on iOS, Android, macOS/Desktop, and Web from one codebase.

Built by **[Kfir Brodbeker](https://github.com/Kfir1b)**.

---

## 🚀 Quick Start

### 1. Set up Supabase (5 min)
1. Create free account at [supabase.com](https://supabase.com)
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

## ✨ Features
- Email auth (sign up / sign in)
- Log workouts: type, date, sets, reps, weight (kg or lbs)
- Quick-add exercises by workout type
- Dashboard with weekly stats + volume tracking
- Full history grouped by month, filterable by type
- Workout detail with per-exercise set breakdown
- Real-time sync across all devices via Supabase
- Row Level Security: users only ever see their own data

## 🔮 Ideas for Later
- Progress charts per exercise
- Personal bests tracker
- Workout templates / programs
- Rest timer
- Export as CSV
- Apple Health / Google Fit integration

---

## 👤 Author
**Kfir Brodbeker** — [github.com/Kfir1b](https://github.com/Kfir1b)

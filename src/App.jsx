import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { isConfigured } from './lib/supabase'
import SetupPage from './pages/SetupPage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import LogPage from './pages/LogPage'
import HistoryPage from './pages/HistoryPage'
import ProgressPage from './pages/ProgressPage'
import ExercisePage from './pages/ExercisePage'
import NavBar from './components/NavBar'

function ProtectedRoutes() {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/auth" replace />
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: '80px' }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/log" element={<LogPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/exercises" element={<ExercisePage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </div>
      <NavBar />
    </div>
  )
}

function LoadingScreen() {
  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0a', flexDirection: 'column', gap: '16px'
    }}>
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: 800, letterSpacing: '0.15em'
      }}>
        STEEL<span style={{ color: '#FF6B2B' }}>SET</span>
      </div>
      <div style={{
        width: '32px', height: '32px', border: '3px solid #2a2a2a',
        borderTop: '3px solid #FF6B2B', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  // Show setup screen if Supabase hasn't been configured yet
  if (!isConfigured) {
    return <SetupPage />
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

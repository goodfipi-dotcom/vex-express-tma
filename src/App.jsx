import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Plans from './pages/Plans'
import Guide from './pages/Guide'
import Profile from './pages/Profile'
import Support from './pages/Support'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return

    tg.ready()
    tg.expand()
    tg.setHeaderColor('#05060D')
    tg.setBackgroundColor('#000000')
    tg.disableVerticalSwipes?.()

    try { tg.requestFullscreen?.() } catch { /* ок */ }
  }, [])

  return (
    <div className="app-shell">
      <div className="safe-top" />

      <div key={location.pathname} className="animate-fade-in-up">
        <Routes location={location}>
          <Route path="/"        element={<Home />} />
          <Route path="/plans"   element={<Plans />} />
          <Route path="/guide"   element={<Guide />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>

      <NavBar />
    </div>
  )
}

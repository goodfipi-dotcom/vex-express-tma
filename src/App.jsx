import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Plans from './pages/Plans'
import Guide from './pages/Guide'
import Profile from './pages/Profile'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return

    tg.ready()
    tg.expand()
    tg.setHeaderColor('#05060D')
    tg.setBackgroundColor('#05060D')
    tg.disableVerticalSwipes?.()

    // Попросим у Telegram полноэкранный режим, если поддерживается (Bot API 8.0+)
    try {
      tg.requestFullscreen?.()
    } catch { /* не критично */ }
  }, [])

  return (
    <div className="min-h-screen bg-bg max-w-lg mx-auto relative safe-x">
      {/* Верхний safe-area для iPhone-челки */}
      <div className="safe-top" />

      {/* Ключ по pathname заставляет React перерисовать контент страницы
          с анимацией fade-in-up, которая задана в CSS корневого div страниц. */}
      <div key={location.pathname} className="animate-fade-in">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      <NavBar />
    </div>
  )
}

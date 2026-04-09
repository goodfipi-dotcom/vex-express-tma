import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Plans from './pages/Plans'
import Guide from './pages/Guide'
import Profile from './pages/Profile'

export default function App() {
  useEffect(() => {
    // Инициализация Telegram Web App
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.ready()
      tg.expand()
      tg.setHeaderColor('#111827')
      tg.setBackgroundColor('#111827')
    }
  }, [])

  return (
    <div className="min-h-screen bg-dark-900 max-w-lg mx-auto relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <NavBar />
    </div>
  )
}

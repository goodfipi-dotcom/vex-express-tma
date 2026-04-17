import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { getUserStatus } from '../api/client'
import { HomeSkeleton } from '../components/Skeleton'
import ErrorState from '../components/ErrorState'

export default function Home() {
  const navigate = useNavigate()
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadStatus = useCallback(async () => {
    setError(false)
    try {
      const data = await getUserStatus()
      setStatus(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadStatus() }, [loadStatus])

  useEffect(() => {
    const onFocus = () => loadStatus()
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onFocus)
    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onFocus)
    }
  }, [loadStatus])

  async function copyKey() {
    if (!status?.vless_key) return
    try {
      await navigator.clipboard.writeText(status.vless_key)
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred?.('success')
      window.Telegram?.WebApp?.showAlert?.('Ключ скопирован. Вставьте в приложение из раздела «Настройка».')
    } catch { /* ок */ }
  }

  function goToPlans() {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('medium')
    navigate('/plans')
  }

  function goToGuide() {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('light')
    navigate('/guide')
  }

  if (loading) return <HomeSkeleton />
  if (error)   return <ErrorState onRetry={loadStatus} />

  const active = !!status?.active
  const expiresStr = formatDate(status?.expires_at)

  return (
    <div className="px-6 pt-8 pb-40 flex flex-col">
      {/* ═══ Гигантский центральный щит ═══ */}
      <div className="relative flex items-center justify-center mt-4 mb-8" style={{ height: 220 }}>
        <div className="absolute w-52 h-52 rounded-full bg-neon/10 animate-pulse-ring" />
        <div className="absolute w-52 h-52 rounded-full bg-neon/10 animate-pulse-ring-delayed" />
        <div
          className="absolute w-52 h-52 rounded-full"
          style={{ boxShadow: '0 0 80px rgba(168, 85, 247, 0.3) inset' }}
        />
        <div className="animate-floaty">
          <ShieldCheckIcon
            className="w-40 h-40 text-neon"
            style={{
              filter: 'drop-shadow(0 0 24px rgba(168, 85, 247, 0.9)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.5))',
            }}
          />
        </div>
      </div>

      {/* ═══ Статус — bold дата + таблетка ═══ */}
      <div className="flex flex-col items-center mb-10">
        {active && expiresStr ? (
          <>
            <h1 className="text-white text-[28px] font-bold tracking-tight leading-tight mb-3 text-center">
              до {expiresStr}
            </h1>
            <span className="pill-status">подписка активна</span>
          </>
        ) : active ? (
          <h1 className="text-white text-[28px] font-bold tracking-tight leading-tight mb-3 text-center">
            VPN подключён
          </h1>
        ) : (
          <>
            <h1 className="text-white text-[28px] font-bold tracking-tight leading-tight mb-3 text-center">
              Подписка не активна
            </h1>
            <span className="pill-status">подписка истекла</span>
          </>
        )}
      </div>

      {/* ═══ Две pill-кнопки (Ultima style) ═══ */}
      <div className="flex flex-col gap-3">
        {active && status?.vless_key ? (
          <button onClick={copyKey} className="btn-pill btn-pill-primary">
            Скопировать VPN-ключ
          </button>
        ) : (
          <button onClick={goToPlans} className="btn-pill btn-pill-primary">
            <span className="flex-1 text-center">Купить подписку</span>
            <span className="text-sm opacity-90">от 150 ₽</span>
          </button>
        )}
        <button onClick={goToGuide} className="btn-pill btn-pill-dark">
          <Cog6ToothIcon className="w-5 h-5" />
          Установка и настройка
        </button>
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (isNaN(d)) return null
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

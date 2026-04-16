import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheckIcon, BoltIcon } from '@heroicons/react/24/solid'
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
      window.Telegram?.WebApp?.showAlert?.('Ключ скопирован. Вставьте в приложение из раздела "Настройка".')
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
  const expiresAt = status?.expires_at
  const expiresStr = formatDate(expiresAt)

  return (
    <div className="px-6 pt-10 pb-36 animate-fade-in-up flex flex-col min-h-screen">
      {/* Бренд-метка сверху */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-xl bg-gradient-neon flex items-center justify-center neon-glow">
          <BoltIcon className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold tracking-[0.24em] text-white">VEX</span>
      </div>

      {/* ═══ Гигантская центральная иконка-щит ═══ */}
      <div className="relative flex items-center justify-center mb-8 mt-4" style={{ height: 240 }}>
        {active && (
          <>
            <div className="absolute w-56 h-56 rounded-full bg-lime/15 animate-pulse-ring" />
            <div className="absolute w-56 h-56 rounded-full bg-lime/15 animate-pulse-ring-delayed" />
          </>
        )}
        <div
          className={`absolute w-56 h-56 rounded-full ${active ? 'bg-lime/5' : 'bg-neon/5'}`}
          style={{
            boxShadow: active
              ? '0 0 80px rgba(57, 255, 20, 0.25) inset'
              : '0 0 80px rgba(168, 85, 247, 0.22) inset',
          }}
        />
        <div className="animate-floaty">
          <ShieldCheckIcon
            className={`w-44 h-44 ${active ? 'text-lime neon-glow-lime' : 'text-neon'}`}
            style={{
              filter: active
                ? 'drop-shadow(0 0 24px rgba(57, 255, 20, 0.9)) drop-shadow(0 0 60px rgba(57, 255, 20, 0.5))'
                : 'drop-shadow(0 0 24px rgba(168, 85, 247, 0.9)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.5))',
            }}
          />
        </div>
      </div>

      {/* ═══ Статус одной жирной строкой ═══ */}
      <div className="text-center mb-auto">
        {active && expiresStr ? (
          <>
            <p className="text-text-dim text-sm mb-2">Подписка активна</p>
            <h1 className="text-white text-[28px] font-bold tracking-tight leading-tight">
              до {expiresStr}
            </h1>
          </>
        ) : active ? (
          <h1 className="text-white text-[28px] font-bold tracking-tight leading-tight">
            VPN подключён
          </h1>
        ) : (
          <>
            <p className="text-text-dim text-sm mb-2">Подписка не активна</p>
            <h1 className="text-white text-[28px] font-bold tracking-tight leading-tight">
              Подключите VPN за 1 минуту
            </h1>
          </>
        )}
      </div>

      {/* ═══ Две кнопки pill в стиле Ultima ═══ */}
      <div className="flex flex-col gap-3 mt-10">
        {active && status?.vless_key ? (
          <button onClick={copyKey} className="btn-pill btn-pill-lime">
            Скопировать VPN-ключ
          </button>
        ) : (
          <button onClick={goToPlans} className="btn-pill btn-pill-primary">
            Купить подписку от 150 ₽
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

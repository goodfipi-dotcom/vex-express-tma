import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BoltIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid'
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon,
  LockClosedIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { getUserStatus } from '../api/client'

export default function Home() {
  const navigate = useNavigate()
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    loadStatus()
  }, [])

  async function loadStatus() {
    try {
      const data = await getUserStatus()
      setStatus(data)
    } catch {
      setStatus({
        active: false,
        expires_at: null,
        vless_key: null,
        username: 'Пользователь',
      })
    } finally {
      setLoading(false)
    }
  }

  async function copyKey() {
    if (!status?.vless_key) return
    try {
      await navigator.clipboard.writeText(status.vless_key)
      setCopied(true)
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred?.('success')
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // fallback
    }
  }

  function goToPlans() {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('medium')
    navigate('/plans')
  }

  function daysLeft(dateStr) {
    if (!dateStr) return null
    const diff = new Date(dateStr) - new Date()
    const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
    return days
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <ArrowPathIcon className="w-7 h-7 text-accent animate-spin" />
      </div>
    )
  }

  const active = status?.active
  const days = daysLeft(status?.expires_at)

  return (
    <div className="px-5 pt-8 pb-28 animate-fade-in-up">
      {/* Бренд */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center">
          <BoltIcon className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-wider text-white">VEX</span>
      </div>

      {/* Центральный круг подключения */}
      <div className="relative flex items-center justify-center mb-10" style={{ height: 260 }}>
        {/* Пульсирующие кольца (только если активна) */}
        {active && (
          <>
            <div className="absolute w-56 h-56 rounded-full bg-success/20 animate-pulse-ring" />
            <div className="absolute w-56 h-56 rounded-full bg-success/20 animate-pulse-ring-delayed" />
          </>
        )}

        {/* Статичное внешнее кольцо */}
        <div
          className={`absolute w-56 h-56 rounded-full border transition-colors duration-500 ${
            active ? 'border-success/30' : 'border-border'
          }`}
        />
        <div
          className={`absolute w-44 h-44 rounded-full border transition-colors duration-500 ${
            active ? 'border-success/20' : 'border-border-soft'
          }`}
        />

        {/* Центральная кнопка */}
        <button
          onClick={active ? copyKey : goToPlans}
          className={`relative z-10 w-36 h-36 rounded-full flex flex-col items-center justify-center press transition-all duration-300 ${
            active
              ? 'bg-gradient-to-br from-success to-success-hover glow-success'
              : 'bg-gradient-to-br from-accent to-accent-dim glow-accent'
          }`}
        >
          {active ? (
            copied ? (
              <>
                <ClipboardDocumentCheckIcon className="w-10 h-10 text-white mb-1" />
                <span className="text-white text-[11px] font-bold uppercase tracking-wider">
                  Скопировано
                </span>
              </>
            ) : (
              <>
                <ShieldCheckIcon className="w-10 h-10 text-white mb-1" />
                <span className="text-white text-[11px] font-bold uppercase tracking-wider">
                  Подключено
                </span>
              </>
            )
          ) : (
            <>
              <BoltIcon className="w-10 h-10 text-white mb-1" />
              <span className="text-white text-[11px] font-bold uppercase tracking-wider">
                Подключить
              </span>
            </>
          )}
        </button>
      </div>

      {/* Подпись под кругом */}
      <div className="text-center mb-8">
        {active ? (
          <>
            <p className="text-gradient-success text-lg font-semibold mb-1">
              VPN активен
            </p>
            <p className="text-text-dim text-sm">
              {days > 0
                ? `Осталось ${days} ${pluralDays(days)}`
                : 'Истекает сегодня'}
            </p>
          </>
        ) : (
          <>
            <p className="text-white text-lg font-semibold mb-1">
              VPN не активен
            </p>
            <p className="text-text-dim text-sm">
              Оформите подписку, чтобы подключиться
            </p>
          </>
        )}
      </div>

      {/* Действие — ключ или купить */}
      {active && status?.vless_key ? (
        <button
          onClick={copyKey}
          className="w-full py-4 rounded-2xl font-semibold bg-surface border border-border text-white press hover-lift flex items-center justify-center gap-2 mb-6"
        >
          {copied ? (
            <>
              <ClipboardDocumentCheckIcon className="w-5 h-5 text-success" />
              <span>Ключ в буфере</span>
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="w-5 h-5 text-accent" />
              <span>Скопировать ключ</span>
            </>
          )}
        </button>
      ) : (
        <button
          onClick={goToPlans}
          className="w-full py-4 rounded-2xl font-semibold bg-accent hover:bg-accent-hover text-white press glow-accent mb-6"
        >
          Выбрать тариф
        </button>
      )}

      {/* Мини-фишки в одну строку */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-surface rounded-xl p-3 border border-border-soft text-center">
          <LockClosedIcon className="w-5 h-5 text-accent mx-auto mb-1.5" />
          <p className="text-white text-[11px] font-medium">Шифрование</p>
        </div>
        <div className="bg-surface rounded-xl p-3 border border-border-soft text-center">
          <BoltIcon className="w-5 h-5 text-accent mx-auto mb-1.5" />
          <p className="text-white text-[11px] font-medium">Без лимитов</p>
        </div>
        <div className="bg-surface rounded-xl p-3 border border-border-soft text-center">
          <GlobeAltIcon className="w-5 h-5 text-accent mx-auto mb-1.5" />
          <p className="text-white text-[11px] font-medium">Любая страна</p>
        </div>
      </div>
    </div>
  )
}

function pluralDays(n) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'день'
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'дня'
  return 'дней'
}

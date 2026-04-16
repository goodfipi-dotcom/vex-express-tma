import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BoltIcon,
  ShieldCheckIcon,
  SignalIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  LockClosedIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { getUserStatus } from '../api/client'
import { HomeSkeleton } from '../components/Skeleton'
import ErrorState from '../components/ErrorState'

export default function Home() {
  const navigate = useNavigate()
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)

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

  useEffect(() => {
    loadStatus()
  }, [loadStatus])

  // Авто-рефреш при возврате во вкладку (после оплаты)
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
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  if (loading) return <HomeSkeleton />
  if (error) return <ErrorState onRetry={loadStatus} />

  const active = status?.active
  const days = daysLeft(status?.expires_at)
  const expiringSoon = active && days !== null && days <= 3
  const maskedKey = status?.vless_key
    ? `${status.vless_key.slice(0, 14)}…${status.vless_key.slice(-6)}`
    : null

  return (
    <div className="px-5 pt-6 pb-28 animate-fade-in-up">
      {/* Бренд */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-neon flex items-center justify-center neon-glow">
          <BoltIcon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-[0.2em] text-white">VEX</span>
      </div>

      {/* ═══ Центральный круг подключения ═══ */}
      <div className="relative flex items-center justify-center mb-8" style={{ height: 280 }}>
        {active && (
          <>
            <div className="absolute w-60 h-60 rounded-full bg-lime/20 animate-pulse-ring" />
            <div className="absolute w-60 h-60 rounded-full bg-lime/20 animate-pulse-ring-delayed" />
          </>
        )}

        {/* Внешние кольца */}
        <div
          className={`absolute w-60 h-60 rounded-full border-2 transition-colors duration-500 ${
            active ? 'border-lime/40' : 'border-neon/30'
          }`}
          style={active ? {} : { boxShadow: '0 0 40px rgba(168, 85, 247, 0.15) inset' }}
        />
        <div
          className={`absolute w-48 h-48 rounded-full border transition-colors duration-500 ${
            active ? 'border-lime/25' : 'border-neon/15'
          }`}
        />

        {/* Центральная кнопка */}
        <button
          onClick={active ? copyKey : goToPlans}
          aria-label={active ? 'Скопировать ключ' : 'Подключить VPN'}
          className={`relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center press transition-all duration-500 ${
            active
              ? 'bg-gradient-lime neon-glow-lime'
              : 'bg-gradient-neon neon-glow-strong'
          }`}
        >
          {active ? (
            copied ? (
              <>
                <ClipboardDocumentCheckIcon className="w-11 h-11 text-bg mb-1" />
                <span className="text-bg text-[11px] font-bold uppercase tracking-[0.15em]">
                  Скопировано
                </span>
              </>
            ) : (
              <>
                <ShieldCheckIcon className="w-11 h-11 text-bg mb-1" />
                <span className="text-bg text-[11px] font-bold uppercase tracking-[0.15em]">
                  Подключено
                </span>
              </>
            )
          ) : (
            <>
              <BoltIcon className="w-11 h-11 text-white mb-1" />
              <span className="text-white text-[11px] font-bold uppercase tracking-[0.15em]">
                Подключить
              </span>
            </>
          )}
        </button>
      </div>

      {/* ═══ Статус-строка ═══ */}
      <div className="text-center mb-7">
        {active ? (
          <>
            <div className="inline-flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-neon-pulse text-lime" />
              <span className="text-gradient-lime text-base font-semibold neon-text-lime">
                VPN активен
              </span>
            </div>
            <p className="text-text-dim text-sm">
              {days > 0 ? `Осталось ${days} ${pluralDays(days)}` : 'Истекает сегодня'}
            </p>
          </>
        ) : (
          <>
            <p className="text-white text-base font-semibold mb-1">Подписка не активна</p>
            <p className="text-text-dim text-sm">Оформите тариф за 1 минуту</p>
          </>
        )}
      </div>

      {/* ═══ Баннер "скоро истечёт" ═══ */}
      {expiringSoon && (
        <button
          onClick={goToPlans}
          className="w-full flex items-center gap-3 p-4 rounded-2xl bg-warning/10 border border-warning/40 mb-4 press text-left"
        >
          <ClockIcon className="w-5 h-5 text-warning shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold">Скоро закончится</p>
            <p className="text-text-dim text-xs">Продлите сейчас, чтобы не остаться без VPN</p>
          </div>
          <span className="text-warning text-xs font-bold uppercase tracking-wider">
            Продлить →
          </span>
        </button>
      )}

      {/* ═══ Основное действие ═══ */}
      {active && status?.vless_key ? (
        <div className="mb-6">
          <button
            onClick={copyKey}
            className="w-full py-4 px-4 rounded-2xl font-semibold neon-border text-white press hover-lift flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-3 min-w-0">
              {copied ? (
                <ClipboardDocumentCheckIcon className="w-5 h-5 text-lime shrink-0" />
              ) : (
                <ClipboardDocumentIcon className="w-5 h-5 text-neon shrink-0" />
              )}
              <div className="text-left min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  {copied ? 'Ключ в буфере обмена' : 'Скопировать ключ'}
                </p>
                <p className="text-text-muted text-[11px] truncate font-mono">
                  {maskedKey}
                </p>
              </div>
            </div>
          </button>
          <p className="text-text-muted text-xs text-center mt-3">
            Вставьте ключ в приложение V2Box или v2rayNG
          </p>
        </div>
      ) : (
        <button
          onClick={goToPlans}
          className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-neon neon-glow-strong press mb-6 text-base"
        >
          Выбрать тариф →
        </button>
      )}

      {/* ═══ Мини-фишки ═══ */}
      <div className="grid grid-cols-3 gap-2.5">
        <Feature icon={LockClosedIcon} label="Шифрование" color="neon" />
        <Feature icon={SignalIcon} label="Без лимитов" color="electric" />
        <Feature icon={GlobeAltIcon} label="Все страны" color="neon" />
      </div>
    </div>
  )
}

function Feature({ icon: Icon, label, color = 'neon' }) {
  const colors = {
    neon: 'text-neon',
    electric: 'text-electric',
    lime: 'text-lime',
  }
  return (
    <div className="bg-surface/60 backdrop-blur-sm rounded-xl p-3 border border-border-soft text-center">
      <Icon className={`w-5 h-5 mx-auto mb-1.5 ${colors[color]}`} />
      <p className="text-white text-[11px] font-medium">{label}</p>
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

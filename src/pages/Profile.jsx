import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRightIcon,
  CreditCardIcon,
  ClockIcon,
  GiftIcon,
  KeyIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline'
import { getTransactions, getUserStatus } from '../api/client'
import { ProfileSkeleton } from '../components/Skeleton'

export default function Profile() {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([])
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user
  const userId = tgUser?.id || '—'
  const firstName = tgUser?.first_name || 'Пользователь'
  const lastName = tgUser?.last_name || ''
  const username = tgUser?.username

  const initials =
    (firstName?.[0] || 'V').toUpperCase() +
    (lastName?.[0] || '').toUpperCase()

  const load = useCallback(async () => {
    setError(false)
    try {
      const [tx, st] = await Promise.all([
        getTransactions().catch(() => ({ transactions: [] })),
        getUserStatus().catch(() => null),
      ])
      setTransactions(tx.transactions || [])
      setStatus(st)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  function hap(kind = 'light') {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.(kind)
  }

  function openPayments() {
    hap()
    window.Telegram?.WebApp?.showAlert?.('Все доступные способы оплаты — Telegram, карта, СБП, Stars.')
  }

  function openRefs() {
    hap()
    window.Telegram?.WebApp?.showAlert?.('Реферальная программа: +7 дней за каждого приглашённого друга. Скоро.')
  }

  function toggleHistory() {
    hap()
    setShowHistory(v => !v)
  }

  async function copySubLink() {
    const link = status?.vless_key || `https://t.me/vex_express_bot?startapp=ref_${userId}`
    try {
      await navigator.clipboard.writeText(link)
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred?.('success')
      window.Telegram?.WebApp?.showAlert?.('Ссылка скопирована')
    } catch { /* ок */ }
  }

  if (loading) return <ProfileSkeleton />

  return (
    <div className="px-5 pt-8 pb-40">
      {/* ═══ Аватар + имя ═══ */}
      <div className="card-glass flex items-center gap-4 p-4 mb-6">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-neon neon-glow flex items-center justify-center text-white font-bold text-xl">
            {initials}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-white text-base font-bold truncate">
            {firstName} {lastName}
          </h2>
          <p className="text-text-muted text-xs truncate">
            {username ? `@${username}` : `ID: ${userId}`}
          </p>
        </div>
      </div>

      {/* ═══ Заголовок секции ═══ */}
      <p className="text-text-dim text-[11px] font-semibold uppercase tracking-[0.14em] mb-3 px-1">
        Настройки профиля
      </p>

      {/* ═══ Единый блок настроек (как у Ultima) ═══ */}
      <div className="card-glass overflow-hidden mb-5">
        <Row
          icon={CreditCardIcon}
          title="Способы оплаты"
          subtitle="Карта, Telegram Stars, СБП"
          onClick={openPayments}
          isFirst
        />
        <Row
          icon={ClockIcon}
          title="История операций"
          subtitle={transactions.length ? `${transactions.length} ${plural(transactions.length, 'платёж', 'платежа', 'платежей')}` : 'Платежей пока нет'}
          onClick={toggleHistory}
          expanded={showHistory}
        />
        {showHistory && (
          <div className="bg-white/[0.025] border-t border-white/5">
            {error ? (
              <div className="p-5 text-center">
                <p className="text-text-dim text-sm mb-3">Не удалось загрузить историю</p>
                <button onClick={load} className="text-neon-hover text-sm font-semibold press">
                  Повторить
                </button>
              </div>
            ) : transactions.length > 0 ? (
              transactions.map((tx, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-5 py-3 ${
                    i < transactions.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{tx.plan_name}</p>
                    <p className="text-text-muted text-xs">
                      {new Date(tx.created_at).toLocaleDateString('ru-RU', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className="text-white text-sm font-semibold shrink-0 ml-3">
                    {tx.amount} ₽
                  </span>
                </div>
              ))
            ) : (
              <div className="px-5 py-5 text-center">
                <p className="text-text-muted text-sm">Платежей пока нет</p>
              </div>
            )}
          </div>
        )}
        <Row
          icon={GiftIcon}
          title="Реферальная программа"
          subtitle="+7 дней за каждого друга"
          onClick={openRefs}
        />
        <Row
          icon={KeyIcon}
          title="Сохранение доступа"
          subtitle="Ваш VPN-ключ привязан к Telegram"
          onClick={() => window.Telegram?.WebApp?.showAlert?.('Ваш доступ сохранён. Откройте бота с другого устройства — всё продолжит работать.')}
          isLast
        />
      </div>

      {/* ═══ Ссылка на подписку (копируемая) ═══ */}
      <button
        onClick={copySubLink}
        className="w-full card-glass flex items-center gap-3 px-4 py-3 press"
      >
        <div className="squircle squircle-soft">
          <ClipboardDocumentIcon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="text-white text-sm font-semibold truncate">
            {status?.vless_key ? 'Скопировать VPN-ключ' : 'Ваша ссылка-приглашение'}
          </p>
          <p className="text-text-muted text-xs truncate">
            {status?.vless_key ? 'Одна ссылка — все устройства' : 'Пригласите друга и получите +7 дней'}
          </p>
        </div>
        <ChevronRightIcon className="w-4 h-4 text-text-muted shrink-0" />
      </button>

      <p className="text-text-muted text-[11px] text-center mt-5">
        VEX VPN · версия 1.0
      </p>
    </div>
  )
}

function Row({ icon: Icon, title, subtitle, onClick, isFirst = false, isLast = false, expanded = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 press ${
        isFirst ? '' : 'border-t border-white/5'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="squircle squircle-neon">
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left min-w-0">
          <p className="text-white text-sm font-semibold truncate">{title}</p>
          <p className="text-text-muted text-xs truncate">{subtitle}</p>
        </div>
      </div>
      <ChevronRightIcon
        className={`w-4 h-4 text-text-muted shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
      />
    </button>
  )
}

function plural(n, one, few, many) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return few
  return many
}

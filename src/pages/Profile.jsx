import { useState, useEffect, useCallback } from 'react'
import {
  ChatBubbleLeftRightIcon,
  ArrowTopRightOnSquareIcon,
  ReceiptPercentIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { getTransactions } from '../api/client'
import { ProfileSkeleton } from '../components/Skeleton'

export default function Profile() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user
  const userId = tgUser?.id || '—'
  const firstName = tgUser?.first_name || 'Пользователь'
  const lastName = tgUser?.last_name || ''
  const username = tgUser?.username

  const initials =
    (firstName?.[0] || '').toUpperCase() +
    (lastName?.[0] || '').toUpperCase()

  const load = useCallback(async () => {
    setError(false)
    try {
      const data = await getTransactions()
      setTransactions(data.transactions || [])
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  function openSupport() {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('light')
    window.Telegram?.WebApp?.openTelegramLink?.('https://t.me/vex_support')
  }

  function openFAQ() {
    window.Telegram?.WebApp?.HapticFeedback?.selectionChanged?.()
    window.Telegram?.WebApp?.openTelegramLink?.('https://t.me/vex_support')
  }

  if (loading) return <ProfileSkeleton />

  return (
    <div className="px-5 pt-6 pb-28 animate-fade-in-up">
      {/* Карточка профиля */}
      <div className="bg-surface neon-border rounded-2xl p-5 mb-5 flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-neon neon-glow flex items-center justify-center text-white font-bold text-xl">
            {initials || firstName?.[0]?.toUpperCase() || 'V'}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-surface flex items-center justify-center">
            <CheckBadgeIcon className="w-5 h-5 text-neon" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-white text-lg font-semibold truncate">
            {firstName} {lastName}
          </h2>
          <p className="text-text-muted text-xs truncate">
            {username ? `@${username}` : `ID: ${userId}`}
          </p>
        </div>
      </div>

      {/* История платежей */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-text-dim text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-1.5">
            <ReceiptPercentIcon className="w-3.5 h-3.5" />
            История платежей
          </h3>
          {transactions.length > 0 && (
            <span className="text-text-muted text-xs">
              {transactions.length}
            </span>
          )}
        </div>

        {error ? (
          <div className="bg-surface rounded-2xl border border-border p-5 text-center">
            <p className="text-text-dim text-sm mb-3">Не удалось загрузить историю</p>
            <button
              onClick={load}
              className="text-neon text-sm font-semibold press"
            >
              Повторить
            </button>
          </div>
        ) : transactions.length > 0 ? (
          <div className="bg-surface rounded-2xl border border-border overflow-hidden">
            {transactions.map((tx, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3.5 ${
                  i < transactions.length - 1 ? 'border-b border-border-soft' : ''
                }`}
              >
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {tx.plan_name}
                  </p>
                  <p className="text-text-muted text-xs">
                    {new Date(tx.created_at).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <span className="text-white text-sm font-semibold shrink-0 ml-3">
                  {tx.amount} ₽
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface rounded-2xl border border-border p-6 text-center">
            <p className="text-text-muted text-sm">Платежей пока нет</p>
          </div>
        )}
      </div>

      {/* Действия */}
      <div className="space-y-2.5">
        <ActionRow
          icon={ChatBubbleLeftRightIcon}
          title="Поддержка"
          subtitle="Ответим за 5 минут"
          onClick={openSupport}
          accent="neon"
        />
        <ActionRow
          icon={QuestionMarkCircleIcon}
          title="Частые вопросы"
          subtitle="Ответы на вопросы о подключении"
          onClick={openFAQ}
          accent="electric"
        />
      </div>

      {/* Мета */}
      <p className="text-text-muted text-[10px] text-center mt-6">
        VEX VPN · версия 1.0
      </p>
    </div>
  )
}

function ActionRow({ icon: Icon, title, subtitle, onClick, accent = 'neon' }) {
  const accents = {
    neon: 'bg-neon/15 border-neon/30 text-neon',
    electric: 'bg-electric/15 border-electric/30 text-electric',
    lime: 'bg-lime/15 border-lime/30 text-lime',
  }
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-4 rounded-2xl bg-surface border border-border press hover-lift"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${accents[accent]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left min-w-0">
          <p className="text-white text-sm font-semibold truncate">{title}</p>
          <p className="text-text-muted text-xs truncate">{subtitle}</p>
        </div>
      </div>
      <ArrowTopRightOnSquareIcon className="w-4 h-4 text-text-muted shrink-0" />
    </button>
  )
}

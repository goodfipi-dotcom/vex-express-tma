import { useState, useEffect } from 'react'
import {
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { getTransactions } from '../api/client'

export default function Profile() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user
  const userId = tgUser?.id || '—'
  const firstName = tgUser?.first_name || 'Пользователь'
  const lastName = tgUser?.last_name || ''
  const username = tgUser?.username

  const initials =
    (firstName?.[0] || '').toUpperCase() + (lastName?.[0] || '').toUpperCase()

  useEffect(() => {
    loadTransactions()
  }, [])

  async function loadTransactions() {
    try {
      const data = await getTransactions()
      setTransactions(data.transactions || [])
    } catch {
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  function openSupport() {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('light')
    window.Telegram?.WebApp?.openTelegramLink?.('https://t.me/vex_support')
  }

  return (
    <div className="px-5 pt-8 pb-28 animate-fade-in-up">
      {/* Профиль */}
      <div className="flex items-center gap-4 mb-7">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center text-white font-bold text-xl">
            {initials || firstName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-surface flex items-center justify-center">
            <CheckBadgeIcon className="w-5 h-5 text-accent" />
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
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-text-dim text-xs font-semibold uppercase tracking-wider">
            История
          </h3>
          {transactions.length > 0 && (
            <span className="text-text-muted text-xs">
              {transactions.length}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-6 bg-surface rounded-2xl border border-border">
            <ArrowPathIcon className="w-5 h-5 text-accent animate-spin" />
          </div>
        ) : transactions.length > 0 ? (
          <div className="bg-surface rounded-2xl border border-border overflow-hidden">
            {transactions.map((tx, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3.5 ${
                  i < transactions.length - 1
                    ? 'border-b border-border-soft'
                    : ''
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

      {/* Поддержка */}
      <button
        onClick={openSupport}
        className="w-full flex items-center justify-between px-4 py-4 rounded-2xl bg-surface border border-border press hover-lift"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-accent" />
          </div>
          <div className="text-left">
            <p className="text-white text-sm font-medium">Поддержка</p>
            <p className="text-text-muted text-xs">Ответим за 5 минут</p>
          </div>
        </div>
        <ArrowTopRightOnSquareIcon className="w-4 h-4 text-text-muted" />
      </button>
    </div>
  )
}

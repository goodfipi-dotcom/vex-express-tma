import { useState, useEffect, useCallback } from 'react'
import {
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  ReceiptPercentIcon,
  QuestionMarkCircleIcon,
  CreditCardIcon,
  GiftIcon,
} from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { getTransactions } from '../api/client'
import { ProfileSkeleton } from '../components/Skeleton'

export default function Profile() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

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

  useEffect(() => { load() }, [load])

  function hap(kind = 'light') {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.(kind)
  }

  function openSupport() {
    hap('medium')
    window.Telegram?.WebApp?.openTelegramLink?.('https://t.me/vex_support')
  }

  function openFAQ() {
    hap()
    window.Telegram?.WebApp?.openTelegramLink?.('https://t.me/vex_support')
  }

  function openRefs() {
    hap()
    window.Telegram?.WebApp?.showAlert?.('Реферальная программа скоро появится.')
  }

  function openPayments() {
    hap()
    window.Telegram?.WebApp?.showAlert?.('Управление способами оплаты — в разработке.')
  }

  function toggleHistory() {
    hap()
    setShowHistory((v) => !v)
  }

  if (loading) return <ProfileSkeleton />

  return (
    <div className="px-5 pt-8 pb-36 animate-fade-in-up">
      {/* Шапка профиля */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full bg-gradient-neon neon-glow flex items-center justify-center text-white font-bold text-2xl">
            {initials || firstName?.[0]?.toUpperCase() || 'V'}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-bg flex items-center justify-center">
            <CheckBadgeIcon className="w-6 h-6 text-neon" />
          </div>
        </div>
        <h2 className="text-white text-xl font-bold">
          {firstName} {lastName}
        </h2>
        <p className="text-text-muted text-sm mt-0.5">
          {username ? `@${username}` : `ID: ${userId}`}
        </p>
      </div>

      {/* Заголовок раздела */}
      <p className="text-text-dim text-xs font-semibold uppercase tracking-[0.14em] mb-3 px-1">
        Настройки профиля
      </p>

      {/* Стеклянные строки-настройки (как у Ultima) */}
      <div className="card-glass overflow-hidden mb-6">
        <Row
          icon={CreditCardIcon}
          title="Способы оплаты"
          subtitle="Карта, Telegram Stars, СБП"
          accent="neon"
          onClick={openPayments}
          isFirst
        />
        <Row
          icon={ReceiptPercentIcon}
          title="История операций"
          subtitle={transactions.length ? `${transactions.length} ${plural(transactions.length, 'платёж', 'платежа', 'платежей')}` : 'Платежей пока нет'}
          accent="electric"
          onClick={toggleHistory}
          expanded={showHistory}
        />
        {showHistory && (
          <div className="bg-white/[0.02] border-t border-white/5">
            {error ? (
              <div className="p-5 text-center">
                <p className="text-text-dim text-sm mb-3">Не удалось загрузить историю</p>
                <button onClick={load} className="text-neon text-sm font-semibold press">
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
          accent="lime"
          onClick={openRefs}
          isLast={false}
        />
        <Row
          icon={ChatBubbleLeftRightIcon}
          title="Поддержка"
          subtitle="Ответим за 5 минут"
          accent="neon"
          onClick={openSupport}
          isLast={false}
        />
        <Row
          icon={QuestionMarkCircleIcon}
          title="Частые вопросы"
          subtitle="Ответы о подключении"
          accent="electric"
          onClick={openFAQ}
          isLast
        />
      </div>

      <p className="text-text-muted text-[11px] text-center">
        VEX VPN · версия 1.0
      </p>
    </div>
  )
}

function Row({ icon: Icon, title, subtitle, accent = 'neon', onClick, isFirst = false, isLast = false, expanded = false }) {
  const accents = {
    neon:     'bg-neon/15 border-neon/30 text-neon',
    electric: 'bg-electric/15 border-electric/30 text-electric',
    lime:     'bg-lime/15 border-lime/30 text-lime',
  }
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-3 px-5 py-4 press ${
        isFirst ? '' : 'border-t border-white/5'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${accents[accent]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left min-w-0">
          <p className="text-white text-sm font-semibold truncate">{title}</p>
          <p className="text-text-muted text-xs truncate">{subtitle}</p>
        </div>
      </div>
      <ChevronRightIcon
        className={`w-4 h-4 text-text-muted shrink-0 transition-transform ${
          expanded ? 'rotate-90' : ''
        }`}
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

import { useState, useEffect } from 'react'
import {
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import { getTransactions } from '../api/client'

export default function Profile() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  // Получаем данные пользователя из Telegram
  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user
  const userId = tgUser?.id || '—'
  const firstName = tgUser?.first_name || 'Пользователь'

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
    // Открываем чат поддержки в Telegram
    window.Telegram?.WebApp?.openTelegramLink?.('https://t.me/vex_support')
  }

  return (
    <div className="px-4 pt-6 pb-24 animate-fade-in-up">
      {/* Аватар и имя */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-dark-700 border-2 border-dark-600 flex items-center justify-center">
          <UserCircleIcon className="w-12 h-12 text-gray-500" />
        </div>
        <h2 className="text-xl font-bold text-white">{firstName}</h2>
        <p className="text-gray-500 text-sm">ID: {userId}</p>
      </div>

      {/* Транзакции */}
      <div className="bg-dark-800 rounded-2xl border border-dark-600 p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <ClockIcon className="w-5 h-5 text-indigo-400" />
          <h3 className="text-white font-medium">История платежей</h3>
        </div>

        {loading ? (
          <div className="flex justify-center py-4">
            <ArrowPathIcon className="w-6 h-6 text-indigo-400 animate-spin" />
          </div>
        ) : transactions.length > 0 ? (
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-dark-700 rounded-xl p-3"
              >
                <div>
                  <p className="text-white text-sm">{tx.plan_name}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(tx.created_at).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <span className="text-indigo-400 text-sm font-medium">
                  {tx.amount} ₽
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">
            Платежей пока нет
          </p>
        )}
      </div>

      {/* Кнопка поддержки */}
      <button
        onClick={openSupport}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-dark-700 border border-dark-600 text-white font-medium hover:bg-dark-600 transition-colors active:scale-[0.98]"
      >
        <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-400" />
        Связаться с поддержкой
      </button>
    </div>
  )
}

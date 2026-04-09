import { useState, useEffect } from 'react'
import {
  BoltIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid'
import { ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import StatusBadge from '../components/StatusBadge'
import { getUserStatus } from '../api/client'

export default function Home() {
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
      // Демо-данные если бэкенд недоступен
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
      // Тактильный отклик в Telegram
      window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ArrowPathIcon className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="px-4 pt-6 pb-24 animate-fade-in-up">
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center glow-indigo">
          <BoltIcon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">VEX EXPRESS</h1>
        <p className="text-gray-400 text-sm">Быстрый и безлимитный VPN</p>
      </div>

      {/* Статус подписки */}
      <div className="bg-dark-800 rounded-2xl p-5 mb-4 border border-dark-600">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm">Подписка</span>
          <StatusBadge active={status.active} />
        </div>

        {status.active && status.expires_at && (
          <p className="text-gray-400 text-sm">
            Действует до:{' '}
            <span className="text-white font-medium">
              {new Date(status.expires_at).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </p>
        )}

        {!status.active && (
          <p className="text-gray-500 text-sm">
            Оформите подписку, чтобы получить доступ к VPN
          </p>
        )}
      </div>

      {/* Кнопка подключения / копирования ключа */}
      {status.active && status.vless_key ? (
        <button
          onClick={copyKey}
          className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mb-4"
        >
          {copied ? (
            <>
              <ClipboardDocumentCheckIcon className="w-5 h-5" />
              Ключ скопирован!
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="w-5 h-5" />
              Скопировать ключ подключения
            </>
          )}
        </button>
      ) : (
        <a
          href="/plans"
          className="block w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-indigo-500/25 text-center mb-4"
        >
          Подключить VPN
        </a>
      )}

      {/* Фишки */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="bg-dark-800 rounded-xl p-4 border border-dark-600">
          <ShieldCheckIcon className="w-8 h-8 text-indigo-400 mb-2" />
          <p className="text-white text-sm font-medium">Безопасно</p>
          <p className="text-gray-500 text-xs mt-1">Шифрование данных</p>
        </div>
        <div className="bg-dark-800 rounded-xl p-4 border border-dark-600">
          <GlobeAltIcon className="w-8 h-8 text-indigo-400 mb-2" />
          <p className="text-white text-sm font-medium">Без лимитов</p>
          <p className="text-gray-500 text-xs mt-1">Безлимитный трафик</p>
        </div>
        <div className="bg-dark-800 rounded-xl p-4 border border-dark-600">
          <BoltIcon className="w-8 h-8 text-amber-400 mb-2" />
          <p className="text-white text-sm font-medium">Быстрый</p>
          <p className="text-gray-500 text-xs mt-1">Высокая скорость</p>
        </div>
        <div className="bg-dark-800 rounded-xl p-4 border border-dark-600">
          <div className="w-8 h-8 text-green-400 mb-2 flex items-center justify-center text-xl">📱</div>
          <p className="text-white text-sm font-medium">Все устройства</p>
          <p className="text-gray-500 text-xs mt-1">iOS, Android, PC, Mac</p>
        </div>
      </div>
    </div>
  )
}

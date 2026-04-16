import { useState, useEffect } from 'react'
import {
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'
import { PLATFORMS } from '../api/config'
import { getUserStatus } from '../api/client'

// Детектим платформу пользователя чтобы сразу раскрыть правильную вкладку
function detectPlatform() {
  if (typeof navigator === 'undefined') return 'ios'
  const ua = navigator.userAgent || ''
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  if (/Mac/i.test(ua)) return 'macos'
  if (/Windows/i.test(ua)) return 'windows'
  return 'ios'
}

export default function Guide() {
  const [activeId, setActiveId] = useState(() => detectPlatform())
  const [vlessKey, setVlessKey] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Загружаем ключ тихо — если нет подписки, просто спрячем кнопку копирования
    getUserStatus()
      .then((s) => setVlessKey(s?.vless_key || null))
      .catch(() => {})
  }, [])

  const active = PLATFORMS.find((p) => p.id === activeId) || PLATFORMS[0]

  function pickPlatform(id) {
    window.Telegram?.WebApp?.HapticFeedback?.selectionChanged?.()
    setActiveId(id)
  }

  function openDownload() {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('medium')
    window.Telegram?.WebApp?.openLink?.(active.app.downloadUrl) ||
      window.open(active.app.downloadUrl, '_blank')
  }

  async function copyKey() {
    if (!vlessKey) {
      window.Telegram?.WebApp?.showAlert?.('Сначала оформите тариф — ключ появится автоматически')
      return
    }
    try {
      await navigator.clipboard.writeText(vlessKey)
      setCopied(true)
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred?.('success')
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // fallback
    }
  }

  return (
    <div className="px-5 pt-6 pb-28 animate-fade-in-up">
      {/* Заголовок */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
          Подключение
        </h2>
        <p className="text-text-dim text-sm">
          Выберите устройство и подключайтесь за 2 минуты
        </p>
      </div>

      {/* Табы платформ (горизонтальный скролл) */}
      <div
        className="flex gap-2 mb-5 overflow-x-auto -mx-5 px-5 pb-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {PLATFORMS.map((p) => {
          const isActive = p.id === activeId
          return (
            <button
              key={p.id}
              onClick={() => pickPlatform(p.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 press ${
                isActive
                  ? 'bg-gradient-neon text-white neon-glow'
                  : 'bg-surface border border-border text-text-dim'
              }`}
            >
              {p.name}
            </button>
          )
        })}
      </div>

      {/* Карточка активной платформы */}
      <div
        key={active.id}
        className="bg-surface neon-border rounded-2xl p-5 mb-4 animate-fade-in"
      >
        {/* Рекомендуемое приложение */}
        <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.15em] mb-3">
          Шаг 1 · приложение
        </p>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0"
            style={{
              background: `linear-gradient(135deg, ${active.brand} 0%, ${active.brand}dd 100%)`,
              boxShadow: `0 0 24px ${active.brand}40, 0 8px 16px ${active.brand}30`,
            }}
          >
            {active.app.name[0]}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-white text-base font-bold mb-0.5 truncate">
              {active.app.name}
            </h3>
            <p className="text-text-dim text-xs truncate">
              {active.app.subtitle}
            </p>
            <p className="text-text-muted text-[11px] mt-0.5">
              {active.os} · {active.app.size}
            </p>
          </div>
        </div>

        <button
          onClick={openDownload}
          className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-neon press neon-glow flex items-center justify-center gap-2 mb-2"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          {active.app.downloadLabel}
        </button>
      </div>

      {/* Кнопка копирования ключа */}
      <button
        onClick={copyKey}
        disabled={!vlessKey}
        className={`w-full py-3.5 rounded-2xl font-semibold text-sm press mb-5 flex items-center justify-center gap-2 transition-all ${
          vlessKey
            ? copied
              ? 'bg-lime/15 border border-lime/40 text-lime'
              : 'neon-border text-white'
            : 'bg-surface border border-border text-text-muted cursor-not-allowed'
        }`}
      >
        {copied ? (
          <>
            <ClipboardDocumentCheckIcon className="w-5 h-5" />
            Ключ скопирован — вставьте в {active.app.name}
          </>
        ) : vlessKey ? (
          <>
            <ClipboardDocumentIcon className="w-5 h-5 text-neon" />
            Скопировать ключ
          </>
        ) : (
          <>
            <ClipboardDocumentIcon className="w-5 h-5" />
            Ключ появится после оплаты
          </>
        )}
      </button>

      {/* Пошаговая инструкция */}
      <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.15em] mb-3 px-1">
        Шаги подключения
      </p>

      <div className="space-y-3">
        {active.steps.map((step, i) => {
          const num = i + 1
          const isLast = i === active.steps.length - 1
          return (
            <div
              key={i}
              className={`flex gap-3 bg-surface rounded-2xl p-4 border ${
                isLast ? 'border-lime/30' : 'border-border'
              }`}
            >
              <div className="shrink-0">
                {isLast ? (
                  <div className="w-8 h-8 rounded-full bg-lime/15 flex items-center justify-center">
                    <CheckCircleSolid className="w-5 h-5 text-lime" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-neon/15 border border-neon/40 flex items-center justify-center">
                    <span className="text-neon text-xs font-bold">{num}</span>
                  </div>
                )}
              </div>
              <div className="pt-1 min-w-0 flex-1">
                <p
                  className={`text-sm font-medium mb-0.5 ${
                    isLast ? 'text-lime' : 'text-white'
                  }`}
                >
                  {step.title}
                </p>
                {step.hint && (
                  <p className="text-text-muted text-xs leading-relaxed">
                    {step.hint}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Финальный CTA */}
      <div className="mt-5 flex items-center gap-2 bg-lime/5 border border-lime/20 rounded-2xl p-4">
        <CheckCircleIcon className="w-5 h-5 text-lime shrink-0" />
        <p className="text-text-dim text-xs leading-relaxed">
          Если что-то не получилось — напишите в поддержку. Ответим за 5 минут.
        </p>
      </div>
    </div>
  )
}

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
    } catch { /* ок */ }
  }

  return (
    <div className="px-5 pt-8 pb-40">
      {/* ═══ Заголовок ═══ */}
      <div className="mb-5">
        <h2 className="text-[28px] font-bold text-white tracking-tight leading-tight mb-2">
          Подключение
        </h2>
        <p className="text-text-dim text-sm">
          Выберите устройство и подключайтесь за 2 минуты.
        </p>
      </div>

      {/* ═══ Табы платформ (pill) ═══ */}
      <div
        className="flex gap-2 mb-6 overflow-x-auto -mx-5 px-5 pb-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {PLATFORMS.map((p) => {
          const isActive = p.id === activeId
          return (
            <button
              key={p.id}
              onClick={() => pickPlatform(p.id)}
              className={`shrink-0 px-5 h-10 rounded-full text-sm font-semibold transition-all duration-200 press ${
                isActive
                  ? 'bg-gradient-neon text-white neon-glow-soft'
                  : 'bg-white/5 border border-neon/20 text-text-dim backdrop-blur-md'
              }`}
            >
              {p.name}
            </button>
          )
        })}
      </div>

      {/* ═══ Карточка рекомендуемого приложения (большая) ═══ */}
      <div key={active.id} className="card-neon p-5 mb-4 animate-fade-in">
        <p className="text-text-dim text-[11px] font-semibold uppercase tracking-[0.14em] mb-3">
          Шаг 1 · Приложение
        </p>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-neon neon-glow flex items-center justify-center text-2xl font-bold text-white shrink-0">
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
      </div>

      {/* ═══ Две pill-кнопки ═══ */}
      <div className="flex flex-col gap-3 mb-6">
        <button onClick={openDownload} className="btn-pill btn-pill-primary">
          <ArrowDownTrayIcon className="w-5 h-5" />
          {active.app.downloadLabel}
        </button>
        <button
          onClick={copyKey}
          disabled={!vlessKey}
          className={`btn-pill btn-pill-dark ${copied ? 'neon-glow-soft' : ''} ${!vlessKey ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {copied ? (
            <>
              <ClipboardDocumentCheckIcon className="w-5 h-5 text-neon-hover" />
              Ключ скопирован
            </>
          ) : vlessKey ? (
            <>
              <ClipboardDocumentIcon className="w-5 h-5" />
              Скопировать VPN-ключ
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="w-5 h-5" />
              Ключ появится после оплаты
            </>
          )}
        </button>
      </div>

      {/* ═══ Пошаговая инструкция ═══ */}
      <p className="text-text-dim text-[11px] font-semibold uppercase tracking-[0.14em] mb-3 px-1">
        Шаги подключения
      </p>

      <div className="card-glass overflow-hidden">
        {active.steps.map((step, i) => {
          const num = i + 1
          const isLast = i === active.steps.length - 1
          return (
            <div
              key={i}
              className={`flex gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-white/5' : ''}`}
            >
              <div className="shrink-0">
                {isLast ? (
                  <div className="squircle squircle-neon">
                    <CheckCircleSolid className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="squircle squircle-neon">
                    <span className="text-neon-hover text-sm font-bold">{num}</span>
                  </div>
                )}
              </div>
              <div className="pt-1 min-w-0 flex-1">
                <p className="text-white text-sm font-semibold mb-0.5">
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

      {/* ═══ Подсказка про поддержку ═══ */}
      <div className="mt-4 flex items-center gap-3 card-glass p-4">
        <CheckCircleIcon className="w-5 h-5 text-neon-hover shrink-0" />
        <p className="text-text-dim text-xs leading-relaxed">
          Если что-то не получилось — напишите в поддержку. Ответим за 5 минут.
        </p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { PLATFORMS } from '../api/config'

const iconMap = {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
}

export default function Guide() {
  const [openId, setOpenId] = useState(null)

  function toggle(id) {
    window.Telegram?.WebApp?.HapticFeedback?.selectionChanged?.()
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="px-5 pt-8 pb-28 animate-fade-in-up">
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
          Подключение
        </h2>
        <p className="text-text-dim text-sm">
          Три шага — и VPN работает. Выберите устройство.
        </p>
      </div>

      <div className="space-y-2.5">
        {PLATFORMS.map((platform) => {
          const Icon = iconMap[platform.icon]
          const isOpen = openId === platform.id

          return (
            <div
              key={platform.id}
              className={`bg-surface rounded-2xl border overflow-hidden transition-colors duration-200 ${
                isOpen ? 'border-accent/40' : 'border-border'
              }`}
            >
              <button
                onClick={() => toggle(platform.id)}
                className="w-full flex items-center justify-between p-4 text-left press"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-accent/20' : 'bg-surface-2'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isOpen ? 'text-accent' : 'text-text-dim'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {platform.name}
                    </p>
                    <p className="text-text-muted text-xs">
                      {platform.apps.map((a) => a.name).join(' • ')}
                    </p>
                  </div>
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 text-text-muted transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-accent' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 animate-fade-in">
                  <div className="h-px bg-border-soft mb-4" />

                  <p className="text-text-dim text-[10px] font-semibold mb-2 uppercase tracking-wider">
                    Приложения
                  </p>
                  <div className="space-y-2 mb-5">
                    {platform.apps.map((app) => (
                      <div
                        key={app.name}
                        className="bg-surface-2 rounded-xl p-3"
                      >
                        <p className="text-white text-sm font-medium mb-0.5">
                          {app.name}
                        </p>
                        <p className="text-text-muted text-xs">{app.desc}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-text-dim text-[10px] font-semibold mb-3 uppercase tracking-wider">
                    Шаги
                  </p>
                  <ol className="space-y-2.5">
                    {platform.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-accent/15 text-accent text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <p className="text-text-dim text-sm pt-0.5 leading-relaxed">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

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
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="px-4 pt-6 pb-24 animate-fade-in-up">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white">Как подключить</h2>
        <p className="text-gray-400 text-sm mt-1">Выберите вашу платформу</p>
      </div>

      <div className="space-y-3">
        {PLATFORMS.map((platform) => {
          const Icon = iconMap[platform.icon]
          const isOpen = openId === platform.id

          return (
            <div
              key={platform.id}
              className="bg-dark-800 rounded-2xl border border-dark-600 overflow-hidden"
            >
              {/* Заголовок платформы */}
              <button
                onClick={() => toggle(platform.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{platform.name}</p>
                    <p className="text-gray-500 text-xs">
                      {platform.apps.map((a) => a.name).join(' / ')}
                    </p>
                  </div>
                </div>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Развёрнутое содержимое */}
              {isOpen && (
                <div className="px-4 pb-4 animate-fade-in-up">
                  {/* Рекомендуемые приложения */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                      Приложения
                    </p>
                    {platform.apps.map((app) => (
                      <div
                        key={app.name}
                        className="bg-dark-700 rounded-xl p-3 mb-2 last:mb-0"
                      >
                        <p className="text-white text-sm font-medium">{app.name}</p>
                        <p className="text-gray-500 text-xs">{app.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Шаги */}
                  <p className="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                    Пошаговая инструкция
                  </p>
                  <ol className="space-y-2">
                    {platform.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <p className="text-gray-300 text-sm pt-0.5">{step}</p>
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

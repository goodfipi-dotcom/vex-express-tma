import { useNavigate } from 'react-router-dom'
import {
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

export default function Support() {
  const navigate = useNavigate()

  function hap(kind = 'light') {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.(kind)
  }

  function openTG(url) {
    hap('medium')
    window.Telegram?.WebApp?.openTelegramLink?.(url) || window.open(url, '_blank')
  }

  return (
    <div className="px-5 pt-10 pb-40">
      {/* ═══ Иконка по центру ═══ */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-neon/15 animate-pulse-ring" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-neon neon-glow flex items-center justify-center">
            <ChatBubbleLeftRightIcon className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-white text-[24px] font-bold tracking-tight text-center mb-2">
          Связаться с поддержкой
        </h1>
        <p className="text-text-dim text-sm text-center max-w-[280px]">
          Получите ответы на популярные вопросы или обратитесь к нам за помощью
        </p>
      </div>

      {/* ═══ 3 строки (как в Ultima) ═══ */}
      <div className="card-glass overflow-hidden">
        <Row
          icon={QuestionMarkCircleIcon}
          title="Часто задаваемые вопросы"
          subtitle="Оплата, подключение, устройства"
          onClick={() => openTG('https://t.me/vex_support')}
          isFirst
        />
        <Row
          icon={Cog6ToothIcon}
          title="Установка на другом устройстве"
          subtitle="Инструкции для всех платформ"
          onClick={() => navigate('/guide')}
        />
        <Row
          icon={ChatBubbleLeftRightIcon}
          title="Написать в поддержку"
          subtitle="Ответим в течение 5 минут"
          onClick={() => openTG('https://t.me/vex_support')}
          isLast
        />
      </div>
    </div>
  )
}

function Row({ icon: Icon, title, subtitle, onClick, isFirst = false, isLast = false }) {
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
      <ChevronRightIcon className="w-4 h-4 text-text-muted shrink-0" />
    </button>
  )
}

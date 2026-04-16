import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

export default function ErrorState({ onRetry, message = 'Не удалось подключиться к серверу' }) {
  return (
    <div className="px-5 pt-16 pb-28 flex flex-col items-center text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-danger/10 border border-danger/30 flex items-center justify-center mb-5">
        <ExclamationTriangleIcon className="w-8 h-8 text-danger" />
      </div>
      <h3 className="text-white text-lg font-semibold mb-2">Нет связи</h3>
      <p className="text-text-dim text-sm max-w-xs mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neon hover:bg-neon-hover text-white font-semibold text-sm press neon-glow"
      >
        <ArrowPathIcon className="w-4 h-4" />
        Повторить
      </button>
      <p className="text-text-muted text-xs mt-5 max-w-xs">
        Если ошибка повторяется, напишите в поддержку
      </p>
    </div>
  )
}

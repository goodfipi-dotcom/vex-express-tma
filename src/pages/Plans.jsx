import { PLANS } from '../api/config'
import { createInvoice } from '../api/client'
import PlanCard from '../components/PlanCard'
import { SparklesIcon } from '@heroicons/react/24/solid'

export default function Plans() {
  async function handleBuy(plan) {
    try {
      // Запрашиваем инвойс у бэкенда
      const { invoice_url } = await createInvoice(plan.id)

      // Открываем Telegram Payment
      if (window.Telegram?.WebApp?.openInvoice) {
        window.Telegram.WebApp.openInvoice(invoice_url, (status) => {
          if (status === 'paid') {
            window.Telegram.WebApp.showAlert('Оплата прошла успешно! VPN подключён.')
            window.location.href = '/'
          }
        })
      } else {
        // Fallback для браузера
        window.open(invoice_url, '_blank')
      }
    } catch {
      window.Telegram?.WebApp?.showAlert?.('Ошибка при создании платежа. Попробуйте позже.')
    }
  }

  return (
    <div className="px-4 pt-6 pb-24 animate-fade-in-up">
      {/* Заголовок */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-medium mb-3">
          <SparklesIcon className="w-3.5 h-3.5" />
          Тарифы
        </div>
        <h2 className="text-xl font-bold text-white">Выберите план</h2>
        <p className="text-gray-400 text-sm mt-1">Безлимитный VPN без ограничений скорости</p>
      </div>

      {/* Карточки тарифов */}
      <div className="space-y-4">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onBuy={handleBuy} />
        ))}
      </div>

      {/* Гарантия */}
      <div className="mt-6 text-center">
        <p className="text-gray-500 text-xs">
          🔒 Безопасная оплата через Telegram Payments
        </p>
        <p className="text-gray-600 text-xs mt-1">
          Подписка активируется мгновенно после оплаты
        </p>
      </div>
    </div>
  )
}

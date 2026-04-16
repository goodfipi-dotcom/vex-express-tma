import { PLANS } from '../api/config'
import { createInvoice } from '../api/client'
import PlanCard from '../components/PlanCard'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function Plans() {
  async function handleBuy(plan) {
    try {
      window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('medium')
      const { invoice_url } = await createInvoice(plan.id)

      if (window.Telegram?.WebApp?.openInvoice) {
        window.Telegram.WebApp.openInvoice(invoice_url, (status) => {
          if (status === 'paid') {
            window.Telegram.WebApp.HapticFeedback?.notificationOccurred?.('success')
            window.Telegram.WebApp.showAlert('Оплата прошла. VPN подключён!')
            window.location.href = '/'
          } else if (status === 'failed') {
            window.Telegram.WebApp.HapticFeedback?.notificationOccurred?.('error')
          }
        })
      } else {
        window.open(invoice_url, '_blank')
      }
    } catch {
      window.Telegram?.WebApp?.showAlert?.('Не удалось создать платёж. Попробуйте позже.')
    }
  }

  return (
    <div className="px-5 pt-8 pb-28 animate-fade-in-up">
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
          Тарифы
        </h2>
        <p className="text-text-dim text-sm">
          Один VPN — все устройства. Отменить можно в любой момент.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onBuy={handleBuy} />
        ))}
      </div>

      <div className="bg-surface/50 rounded-2xl border border-border-soft p-4 flex items-start gap-3">
        <ShieldCheckIcon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div>
          <p className="text-white text-sm font-medium mb-0.5">
            Оплата через Telegram
          </p>
          <p className="text-text-muted text-xs leading-relaxed">
            VPN активируется сразу после оплаты. Картой или Telegram Stars.
          </p>
        </div>
      </div>
    </div>
  )
}

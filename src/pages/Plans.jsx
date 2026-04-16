import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PLANS } from '../api/config'
import { createInvoice, getUserStatus } from '../api/client'
import PlanCard from '../components/PlanCard'
import { ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline'

export default function Plans() {
  const navigate = useNavigate()
  const [busyPlanId, setBusyPlanId] = useState(null)

  async function handleBuy(plan) {
    if (busyPlanId) return

    setBusyPlanId(plan.id)
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('medium')

    try {
      const { invoice_url } = await createInvoice(plan.id)

      if (window.Telegram?.WebApp?.openInvoice) {
        window.Telegram.WebApp.openInvoice(invoice_url, async (status) => {
          if (status === 'paid') {
            window.Telegram.WebApp.HapticFeedback?.notificationOccurred?.('success')
            try { await getUserStatus() } catch { /* ок */ }
            window.Telegram.WebApp.showAlert('Оплата прошла. VPN подключён ⚡')
            navigate('/')
          } else if (status === 'failed') {
            window.Telegram.WebApp.HapticFeedback?.notificationOccurred?.('error')
            window.Telegram.WebApp.showAlert('Платёж не прошёл. Попробуйте ещё раз.')
          }
          setBusyPlanId(null)
        })
      } else {
        window.open(invoice_url, '_blank')
        setBusyPlanId(null)
      }
    } catch {
      window.Telegram?.WebApp?.showAlert?.('Не удалось создать платёж. Попробуйте позже.')
      setBusyPlanId(null)
    }
  }

  return (
    <div className="px-5 pt-8 pb-36 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-[28px] font-bold text-white tracking-tight leading-tight mb-2">
          Выберите тариф
        </h2>
        <p className="text-text-dim text-sm">
          Один VPN — все устройства. Без лимитов и рекламы.
        </p>
      </div>

      <div className="space-y-4 mb-5">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onBuy={handleBuy}
            busy={busyPlanId === plan.id}
            disabled={busyPlanId !== null && busyPlanId !== plan.id}
          />
        ))}
      </div>

      <div className="card-glass p-4 flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-neon/15 border border-neon/30 flex items-center justify-center shrink-0">
          <ShieldCheckIcon className="w-5 h-5 text-neon" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-0.5">Оплата через Telegram</p>
          <p className="text-text-dim text-xs leading-relaxed">
            VPN активируется сразу после оплаты. Без подписок и автосписаний.
          </p>
        </div>
      </div>

      <div className="card-glass p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-electric/15 border border-electric/30 flex items-center justify-center shrink-0">
          <CreditCardIcon className="w-5 h-5 text-electric" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-0.5">Любой способ оплаты</p>
          <p className="text-text-dim text-xs leading-relaxed">
            Картой, Telegram Stars или СБП. Мгновенная активация.
          </p>
        </div>
      </div>
    </div>
  )
}

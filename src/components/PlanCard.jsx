import { CheckIcon } from '@heroicons/react/24/solid'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function PlanCard({ plan, onBuy, busy = false, disabled = false }) {
  const { name, priceLabel, perMonth, period, badge, popular, oldPrice, discount } = plan

  return (
    <div
      className={`relative p-5 transition-all duration-300 ${
        popular ? 'card-neon' : 'card-glass'
      } ${disabled ? 'opacity-60' : ''}`}
    >
      {badge && (
        <span
          className={`absolute -top-2.5 left-5 text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-md ${
            popular
              ? 'bg-gradient-neon text-white neon-glow-soft'
              : 'bg-surface-2 text-text-dim border border-border-soft'
          }`}
        >
          {badge}
        </span>
      )}

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white text-base font-semibold mb-0.5">{name}</h3>
          <p className="text-text-muted text-xs">{period}</p>
        </div>
        {discount && (
          <span className="text-[10px] font-bold bg-neon/15 text-neon-hover px-2 py-1 rounded-md border border-neon/25">
            {discount}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-[32px] font-bold text-white tracking-tight leading-none">
          {priceLabel}
        </span>
        {oldPrice && (
          <span className="text-text-muted line-through text-sm">{oldPrice}</span>
        )}
      </div>
      {perMonth && <p className="text-text-muted text-xs mb-4">{perMonth}</p>}

      <ul className="space-y-1.5 mb-5">
        <Feature text="Безлимитный трафик" />
        <Feature text="Все устройства одновременно" />
        <Feature text="Максимальная скорость" />
      </ul>

      <button
        onClick={() => !disabled && !busy && onBuy(plan)}
        disabled={disabled || busy}
        className={`btn-pill ${
          popular ? 'btn-pill-primary' : 'btn-pill-dark'
        } ${busy ? 'cursor-wait' : ''} ${disabled ? 'cursor-not-allowed' : ''}`}
        style={{ height: 48, fontSize: 14 }}
      >
        {busy ? (
          <>
            <ArrowPathIcon className="w-4 h-4 animate-spin" />
            <span>Обработка…</span>
          </>
        ) : (
          <>Купить за {priceLabel}</>
        )}
      </button>
    </div>
  )
}

function Feature({ text }) {
  return (
    <li className="flex items-center gap-2 text-text-dim text-xs">
      <CheckIcon className="w-3.5 h-3.5 text-neon shrink-0" />
      {text}
    </li>
  )
}

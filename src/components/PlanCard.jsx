import { CheckIcon } from '@heroicons/react/24/solid'

export default function PlanCard({ plan, onBuy }) {
  const { name, priceLabel, period, badge, popular, oldPrice, discount } = plan

  return (
    <div
      className={`relative rounded-2xl p-5 transition-all duration-300 ${
        popular
          ? 'bg-surface border-2 border-accent/60 glow-accent'
          : 'bg-surface border border-border hover-lift'
      }`}
    >
      {badge && (
        <span
          className={`absolute -top-2.5 left-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
            popular
              ? 'bg-accent text-white'
              : 'bg-surface-3 text-text-dim border border-border'
          }`}
        >
          {badge}
        </span>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-base font-semibold mb-0.5">{name}</h3>
          <p className="text-text-muted text-xs">{period}</p>
        </div>
        {discount && (
          <span className="text-[10px] font-bold bg-success/15 text-success px-2 py-1 rounded-md">
            {discount}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-5">
        <span className="text-3xl font-bold text-white tracking-tight">
          {priceLabel}
        </span>
        {oldPrice && (
          <span className="text-text-muted line-through text-sm">
            {oldPrice}
          </span>
        )}
      </div>

      <ul className="space-y-1.5 mb-5">
        <li className="flex items-center gap-2 text-text-dim text-xs">
          <CheckIcon className="w-3.5 h-3.5 text-accent shrink-0" />
          Безлимитный трафик
        </li>
        <li className="flex items-center gap-2 text-text-dim text-xs">
          <CheckIcon className="w-3.5 h-3.5 text-accent shrink-0" />
          Все устройства
        </li>
        <li className="flex items-center gap-2 text-text-dim text-xs">
          <CheckIcon className="w-3.5 h-3.5 text-accent shrink-0" />
          Максимальная скорость
        </li>
      </ul>

      <button
        onClick={() => onBuy(plan)}
        className={`w-full py-3.5 rounded-xl font-semibold text-sm press ${
          popular
            ? 'bg-accent hover:bg-accent-hover text-white'
            : 'bg-surface-2 hover:bg-surface-3 text-white border border-border'
        }`}
      >
        Купить за {priceLabel}
      </button>
    </div>
  )
}

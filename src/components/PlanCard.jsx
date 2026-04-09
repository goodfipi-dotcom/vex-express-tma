import { CheckIcon } from '@heroicons/react/24/solid'

export default function PlanCard({ plan, onBuy }) {
  const { name, priceLabel, period, badge, popular, oldPrice, discount } = plan

  return (
    <div
      className={`relative rounded-2xl p-5 transition-all duration-300 ${
        popular
          ? 'bg-gradient-to-br from-indigo-600/30 to-indigo-900/30 border-2 border-indigo-500/50 glow-indigo scale-[1.02]'
          : 'bg-dark-700 border border-dark-600 hover:border-dark-500'
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </span>
      )}

      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
        <p className="text-gray-400 text-sm">{period}</p>
      </div>

      <div className="text-center mb-4">
        {oldPrice && (
          <span className="text-gray-500 line-through text-sm mr-2">{oldPrice}</span>
        )}
        <span className="text-3xl font-bold text-white">{priceLabel}</span>
        {discount && (
          <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-medium">
            {discount}
          </span>
        )}
      </div>

      <ul className="space-y-2 mb-5 text-sm text-gray-300">
        <li className="flex items-center gap-2">
          <CheckIcon className="w-4 h-4 text-indigo-400 shrink-0" />
          Безлимитный трафик
        </li>
        <li className="flex items-center gap-2">
          <CheckIcon className="w-4 h-4 text-indigo-400 shrink-0" />
          Высокая скорость
        </li>
        <li className="flex items-center gap-2">
          <CheckIcon className="w-4 h-4 text-indigo-400 shrink-0" />
          Все устройства
        </li>
      </ul>

      <button
        onClick={() => onBuy(plan)}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
          popular
            ? 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25'
            : 'bg-dark-600 hover:bg-dark-500 text-white'
        }`}
      >
        Купить
      </button>
    </div>
  )
}

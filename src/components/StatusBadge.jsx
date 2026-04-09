import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

export default function StatusBadge({ active }) {
  if (active) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 text-green-400 text-sm font-medium">
        <CheckCircleIcon className="w-4 h-4" />
        Активна
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 text-red-400 text-sm font-medium">
      <XCircleIcon className="w-4 h-4" />
      Не активна
    </span>
  )
}

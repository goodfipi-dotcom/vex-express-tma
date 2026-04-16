export function Skeleton({ className = '', style }) {
  return <div className={`skeleton ${className}`} style={style} />
}

/* Шаблоны скелетонов для страниц */

export function HomeSkeleton() {
  return (
    <div className="px-5 pt-8 pb-28 animate-fade-in">
      <div className="flex items-center justify-center gap-2 mb-10">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <Skeleton className="w-14 h-5" />
      </div>

      <div className="flex items-center justify-center mb-10" style={{ height: 260 }}>
        <Skeleton className="w-36 h-36 rounded-full" />
      </div>

      <div className="text-center mb-8 space-y-2">
        <Skeleton className="h-6 w-40 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>

      <Skeleton className="h-14 rounded-2xl mb-6" />

      <div className="grid grid-cols-3 gap-2.5">
        <Skeleton className="h-[72px] rounded-xl" />
        <Skeleton className="h-[72px] rounded-xl" />
        <Skeleton className="h-[72px] rounded-xl" />
      </div>
    </div>
  )
}

export function PlansSkeleton() {
  return (
    <div className="px-5 pt-8 pb-28 animate-fade-in">
      <div className="mb-7 space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-56" />
      </div>
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-[220px] rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="px-5 pt-8 pb-28 animate-fade-in">
      <div className="flex items-center gap-4 mb-7">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-20 mb-3" />
      <div className="space-y-0 bg-surface rounded-2xl border border-border overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div key={i} className="p-4 border-b border-border-soft last:border-0">
            <div className="flex justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

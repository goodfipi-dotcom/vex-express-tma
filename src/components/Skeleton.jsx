export function Skeleton({ className = '', style }) {
  return <div className={`skeleton ${className}`} style={style} />
}

export function HomeSkeleton() {
  return (
    <div className="px-6 pt-8 pb-40 animate-fade-in flex flex-col">
      <div className="flex items-center justify-center mt-4 mb-8" style={{ height: 220 }}>
        <Skeleton className="w-40 h-40 rounded-full" />
      </div>
      <div className="flex flex-col items-center mb-10 space-y-3">
        <Skeleton className="h-8 w-64 rounded-xl" />
        <Skeleton className="h-6 w-36 rounded-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-14 rounded-full" />
        <Skeleton className="h-14 rounded-full" />
      </div>
    </div>
  )
}

export function PlansSkeleton() {
  return (
    <div className="px-5 pt-8 pb-40 animate-fade-in">
      <div className="mb-7 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="space-y-5">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-[230px] rounded-3xl" />
        ))}
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="px-5 pt-8 pb-40 animate-fade-in">
      <Skeleton className="h-[80px] rounded-3xl mb-6" />
      <Skeleton className="h-4 w-40 mb-3" />
      <Skeleton className="h-[280px] rounded-3xl mb-5" />
      <Skeleton className="h-[64px] rounded-3xl" />
    </div>
  )
}

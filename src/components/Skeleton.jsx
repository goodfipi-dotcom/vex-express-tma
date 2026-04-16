export function Skeleton({ className = '', style }) {
  return <div className={`skeleton ${className}`} style={style} />
}

export function HomeSkeleton() {
  return (
    <div className="px-6 pt-10 pb-36 animate-fade-in flex flex-col min-h-screen">
      <div className="flex items-center justify-center gap-2 mb-10">
        <Skeleton className="w-8 h-8 rounded-xl" />
        <Skeleton className="w-14 h-5" />
      </div>
      <div className="flex items-center justify-center mb-8 mt-4" style={{ height: 240 }}>
        <Skeleton className="w-44 h-44 rounded-full" />
      </div>
      <div className="text-center mb-auto space-y-3">
        <Skeleton className="h-4 w-40 mx-auto" />
        <Skeleton className="h-8 w-64 mx-auto rounded-xl" />
      </div>
      <div className="flex flex-col gap-3 mt-10">
        <Skeleton className="h-14 rounded-full" />
        <Skeleton className="h-14 rounded-full" />
      </div>
    </div>
  )
}

export function PlansSkeleton() {
  return (
    <div className="px-5 pt-8 pb-36 animate-fade-in">
      <div className="mb-7 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-[240px] rounded-3xl" />
        ))}
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="px-5 pt-8 pb-36 animate-fade-in">
      <div className="flex flex-col items-center mb-8">
        <Skeleton className="w-20 h-20 rounded-full mb-3" />
        <Skeleton className="h-5 w-36 mb-2" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-4 w-40 mb-3" />
      <Skeleton className="h-[340px] rounded-3xl" />
    </div>
  )
}

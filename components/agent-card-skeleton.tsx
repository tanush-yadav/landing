export function AgentCardSkeleton() {
  return (
    <div className="relative w-full rounded-xl border border-gray-100 bg-white/70 backdrop-blur-sm p-6 shadow-lg animate-pulse">
      {/* Avatar Skeleton */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          </div>
          <div className="space-y-2">
            <div className="h-5 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      </div>

      {/* Activity Skeleton */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
          </div>
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-3 gap-4 mb-4 border-t border-gray-100 pt-4">
        <div className="space-y-1">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-5 w-12 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-1">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-5 w-12 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-1">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-5 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="h-10 bg-gray-200 rounded-lg"></div>
    </div>
  )
}
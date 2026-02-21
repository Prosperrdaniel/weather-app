export default function WeatherSkeleton() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen animate-pulse">
      {/* Navbar skeleton */}
      <div className="shadow-sm sticky top-0 left-0 z-50 bg-white h-[80px] flex items-center justify-between px-6">
        <div className="h-8 w-32 bg-gray-200 rounded-md" />
        <div className="flex gap-3 items-center">
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
          <div className="h-8 w-24 bg-gray-200 rounded-md" />
          <div className="h-10 w-48 bg-gray-200 rounded-md" />
        </div>
      </div>

      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* Today section */}
        <section className="space-y-4">
          <div className="space-y-2">
            {/* Date header */}
            <div className="flex gap-2 items-end">
              <div className="h-8 w-28 bg-gray-300 rounded-md" />
              <div className="h-6 w-24 bg-gray-200 rounded-md" />
            </div>

            {/* Main weather container */}
            <div className="flex bg-white rounded-xl p-6 gap-10 items-center shadow-sm">
              {/* Temperature block */}
              <div className="flex flex-col gap-2 px-4 shrink-0">
                <div className="h-14 w-24 bg-gray-300 rounded-lg" />
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>

              {/* Hourly scroll */}
              <div className="flex gap-10 overflow-hidden w-full">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                    <div className="h-4 w-14 bg-gray-200 rounded" />
                    <div className="h-10 w-10 bg-gray-300 rounded-full" />
                    <div className="h-4 w-8 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row: weather description + details */}
          <div className="flex gap-4">
            {/* Left: weather icon + description */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm w-32 shrink-0">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-12 w-12 bg-gray-300 rounded-full" />
            </div>

            {/* Right: weather details */}
            <div className="bg-yellow-100 rounded-xl p-6 flex gap-6 flex-1 shadow-sm overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                  <div className="h-4 w-16 bg-yellow-200 rounded" />
                  <div className="h-8 w-8 bg-yellow-300 rounded-full" />
                  <div className="h-4 w-12 bg-yellow-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Forecast section */}
        <section className="flex flex-col gap-4">
          <div className="h-8 w-44 bg-gray-300 rounded-md" />

          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 flex items-center gap-6 shadow-sm">
              {/* Date/day */}
              <div className="flex flex-col gap-1 w-20 shrink-0">
                <div className="h-4 w-16 bg-gray-300 rounded" />
                <div className="h-4 w-12 bg-gray-200 rounded" />
              </div>

              {/* Icon + description */}
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="h-10 w-10 bg-gray-300 rounded-full" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>

              {/* Temp */}
              <div className="flex gap-2 shrink-0">
                <div className="h-6 w-12 bg-gray-300 rounded" />
                <div className="h-6 w-12 bg-gray-200 rounded" />
              </div>

              {/* Details */}
              <div className="flex gap-6 flex-1 overflow-hidden">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div key={j} className="flex flex-col items-center gap-1 shrink-0">
                    <div className="h-3 w-14 bg-gray-200 rounded" />
                    <div className="h-6 w-6 bg-gray-300 rounded-full" />
                    <div className="h-3 w-10 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

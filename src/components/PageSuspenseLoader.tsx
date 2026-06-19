import React from 'react';

export function PageSuspenseLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="h-10 bg-black/5 dark:bg-white/5 rounded-2xl w-1/3 mb-8"></div>
      
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col gap-4 p-6 border border-border rounded-3xl bg-card/50">
            <div className="w-full aspect-[4/3] bg-black/5 dark:bg-white/5 rounded-2xl"></div>
            <div className="h-6 bg-black/5 dark:bg-white/5 rounded-xl w-3/4"></div>
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded-xl w-1/2"></div>
            <div className="h-10 bg-black/5 dark:bg-white/5 rounded-full w-full mt-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

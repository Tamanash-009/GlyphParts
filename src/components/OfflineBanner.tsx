import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#111111] dark:bg-zinc-900 border border-red-500/30 rounded-full py-3.5 px-6 flex items-center justify-center gap-3 z-50 shadow-2xl animate-in slide-in-from-bottom-5 duration-500 hover-lift">
      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
      <WifiOff className="w-4 h-4 text-red-500" />
      <span className="font-mono text-xs uppercase tracking-widest text-zinc-200 font-medium">Offline Mode</span>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Cloud, ChevronRight } from 'lucide-react';

export default function SystemStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="mx-4 my-4 bg-white rounded-lg p-4 shadow-sm border border-[#e2e8f0] flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <Cloud size={20} className="text-[#64748b]" />
        <div>
          <p className="text-sm font-bold text-[#001F5B]">
            {isOnline ? 'Operacional' : 'Offline'} (Modo offline-first)
          </p>
          <p className="text-xs text-[#94a3b8]">
            {isOnline ? '🟢 Sistema sincronizado' : '🔴 Sincronização pendente'}
          </p>
        </div>
      </div>
      <ChevronRight size={20} className="text-[#94a3b8]" />
    </div>
  );
}

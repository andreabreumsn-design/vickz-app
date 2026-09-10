import React from 'react';
import { Bell } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-[#001F5B] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
      {/* Logo SVG */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded bg-gradient-to-br from-[#FF6600] to-[#FF8533] flex items-center justify-center">
          <span className="text-white font-bold text-xs">V</span>
        </div>
      </div>

      {/* Dashboard Title */}
      <h1 className="text-sm font-bold flex-1 text-center">Dashboard</h1>

      {/* Notification Badge */}
      <div className="relative">
        <Bell size={20} className="text-white cursor-pointer hover:opacity-80" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#FF6600] rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">3</span>
        </div>
      </div>
    </div>
  );
}

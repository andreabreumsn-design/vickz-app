import React from 'react';
import { ChevronRight, Check } from 'lucide-react';

export default function EngineerCard() {
  return (
    <div className="mx-4 my-4 bg-white rounded-lg p-4 shadow-sm border border-[#e2e8f0]">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#FF6600] to-[#FF8533] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-2xl font-bold">AA</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            <div>
              <h3 className="text-sm font-bold text-[#001F5B]">André Abreu</h3>
              <p className="text-xs text-[#64748b]">CREA SP-1234/D • CAU A1234567</p>
            </div>
            <div className="bg-[#FF6600] text-white rounded px-2 py-0.5 flex items-center gap-1 flex-shrink-0">
              <Check size={12} />
              <span className="text-xs font-bold">Verificado</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-1 text-xs text-[#64748b]">
            <p>📧 andre@abreu.eng.br</p>
            <p>📱 (11) 98765-4321</p>
            <p>📍 São Paulo, SP</p>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight size={20} className="text-[#94a3b8] flex-shrink-0 mt-2" />
      </div>
    </div>
  );
}

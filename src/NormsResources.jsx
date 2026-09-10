import React from 'react';

export default function NormsResources() {
  const norms = [
    { id: 1, label: 'ABNT NBR 13752:2024', icon: '📋' },
    { id: 2, label: 'IBAPE/SP 2025', icon: '🏛️' },
    { id: 3, label: 'ABNT NBR 9061', icon: '📐' },
    { id: 4, label: 'Central de Ajuda', icon: '❓' },
    { id: 5, label: 'Tutoriais', icon: '📚' },
  ];

  return (
    <div className="px-4 py-4 space-y-3">
      <h3 className="text-sm font-bold text-[#cbd5e1] px-2">Normas e Recursos</h3>
      <div className="grid grid-cols-2 gap-3">
        {norms.slice(0, 4).map(norm => (
          <button
            key={norm.id}
            className="bg-white rounded-lg p-3 shadow-sm border border-[#e2e8f0] text-center hover:shadow-md transition-all active:scale-95"
          >
            <div className="text-xl mb-1">{norm.icon}</div>
            <p className="text-xs font-semibold text-[#001F5B]">{norm.label}</p>
          </button>
        ))}
      </div>
      <button className="w-full bg-white rounded-lg p-3 shadow-sm border border-[#e2e8f0] text-center hover:shadow-md transition-all active:scale-95">
        <div className="text-xl mb-1">{norms[4].icon}</div>
        <p className="text-xs font-semibold text-[#001F5B]">{norms[4].label}</p>
      </button>
    </div>
  );
}

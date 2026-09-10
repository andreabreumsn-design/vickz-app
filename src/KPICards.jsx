import React from 'react';

export default function KPICards() {
  const kpis = [
    { id: 1, label: 'Vistorias Concluídas', value: 0, bg: 'bg-[#001F5B]', icon: '✓' },
    { id: 2, label: 'Laudos Emitidos', value: 0, bg: 'bg-[#10b981]', icon: '📄' },
    { id: 3, label: 'Imóveis Monitorados', value: 0, bg: 'bg-[#FF6600]', icon: '🏢' },
    { id: 4, label: 'Lindeiros Cadastrados', value: '0/6', bg: 'bg-[#E62117]', icon: '👥' },
  ];

  return (
    <div className="px-4 py-4 space-y-3">
      <h3 className="text-sm font-bold text-[#cbd5e1] px-2">Indicadores do Projeto</h3>
      <div className="grid grid-cols-2 gap-3">
        {kpis.map(kpi => (
          <div
            key={kpi.id}
            className={`${kpi.bg} text-white rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm`}
          >
            <span className="text-2xl mb-2">{kpi.icon}</span>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-xs text-white/80 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

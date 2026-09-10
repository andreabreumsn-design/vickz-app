import React from 'react';

export default function QuickActions() {
  const actions = [
    { id: 1, label: 'Copiar Logo', bg: 'bg-[#001F5B]', text: 'text-white', icon: '📋' },
    { id: 2, label: 'Baixar Avatar', bg: 'bg-[#FF6600]', text: 'text-white', icon: '⬇️' },
    { id: 3, label: 'Manual da Marca', bg: 'bg-white', text: 'text-[#001F5B]', border: 'border-2 border-[#001F5B]', icon: '📘' },
    { id: 4, label: 'Diretrizes de Uso', bg: 'bg-white', text: 'text-[#001F5B]', border: 'border-2 border-[#001F5B]', icon: '📏' },
  ];

  return (
    <div className="px-4 py-6 space-y-3">
      <h3 className="text-sm font-bold text-[#cbd5e1] px-2">Ações Rápidas</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(action => (
          <button
            key={action.id}
            className={`${action.bg} ${action.text} ${action.border || ''} py-3 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95`}
          >
            <span>{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

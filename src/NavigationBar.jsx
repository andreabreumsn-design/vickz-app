import React from 'react';

export default function NavigationBar({ activeTab, onNavigate }) {
  const tabs = [
    { id: 'tela06', icon: '📋', label: 'Identificação' },
    { id: 'tela07a', icon: '📸', label: 'Fotos' },
    { id: 'tela07b', icon: '🗺️', label: 'Mapa' },
    { id: 'tela08', icon: '🏘️', label: 'Vizinhos' },
    { id: 'tela09', icon: '✍️', label: 'Assinatura' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e8f0] py-3 px-4">
      <div className="max-w-[430px] mx-auto flex justify-around">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`text-center text-xs transition-all ${
              activeTab === tab.id
                ? 'text-[#FF6600] font-bold'
                : 'text-[#64748b] hover:text-[#FF6600]'
            }`}
            title={tab.label}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

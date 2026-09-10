import React from 'react';

export default function NavigationBar({ activeTab, onNavigate }) {
  const tabs = [
    { id: 'dash', label: 'Dashboard', icon: '🏠' },
    { id: 'obra', label: 'Obra', icon: '🏗️' },
    { id: 'viz', label: 'Vizinhança', icon: '👥' },
    { id: 'anexo1', label: 'Vistoria', icon: '📸' },
    { id: 'laudo', label: 'Laudo', icon: '📄' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#001F5B] rounded-t-2xl border-t border-[#334155] max-w-[430px] mx-auto">
      <div className="flex justify-around">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex-1 py-3 px-2 text-center transition-colors ${
              activeTab === tab.id
                ? 'text-[#FF6600] border-b-2 border-[#FF6600]'
                : 'text-[#9BB0C9] border-b-2 border-transparent'
            }`}
          >
            <div className="text-xl mb-1">{tab.icon}</div>
            <p className="text-xs font-bold">{tab.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

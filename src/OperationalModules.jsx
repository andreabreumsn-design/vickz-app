import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function OperationalModules({ onNavigate }) {
  const modules = [
    {
      id: 1,
      number: 1,
      title: 'Dados do Empreendimento',
      description: 'Construtora, endereço, projeto e delimitação de área',
      badge: 'bg-[#001F5B]',
      screen: 'obra'
    },
    {
      id: 2,
      number: 2,
      title: 'Gestão de Vizinhança',
      description: 'Imóveis lindeiros, fachadas e autorizações de acesso',
      badge: 'bg-[#FF6600]',
      screen: 'viz'
    },
    {
      id: 3,
      number: 3,
      title: 'Vistoria Fotográfica',
      description: 'Registro em campo com marcação de patologias',
      badge: 'bg-[#E62117]',
      screen: 'anexo1'
    },
    {
      id: 4,
      number: 4,
      title: 'Fechamento e Laudo Técnico',
      description: 'Entrevistas, relatórios, assinatura digital e ART/RRT',
      badge: 'bg-[#001F5B]',
      screen: 'laudo'
    },
  ];

  return (
    <div className="px-4 py-4 space-y-3">
      <h3 className="text-sm font-bold text-[#cbd5e1] px-2">Módulos Operacionais</h3>
      <div className="space-y-2">
        {modules.map(module => (
          <button
            key={module.id}
            onClick={() => onNavigate && onNavigate(module.screen)}
            className="w-full bg-white rounded-lg p-4 shadow-sm border border-[#e2e8f0] text-left hover:shadow-md transition-all active:scale-95"
          >
            <div className="flex items-start gap-3">
              <div className={`${module.badge} text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                {module.number}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#001F5B]">{module.title}</h4>
                <p className="text-xs text-[#64748b] mt-1">{module.description}</p>
              </div>
              <ChevronRight size={20} className="text-[#94a3b8] flex-shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

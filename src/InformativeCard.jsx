import React from 'react';
import { Info } from 'lucide-react';

export default function InformativeCard() {
  return (
    <div className="mx-4 my-4 bg-[#dbeafe] border-l-4 border-[#3b82f6] rounded-lg p-4 flex gap-3">
      <Info size={20} className="text-[#3b82f6] flex-shrink-0 mt-1" />
      <div>
        <p className="text-sm font-semibold text-[#1e40af] mb-1">
          Imóveis Vizinhos Detectados
        </p>
        <p className="text-xs text-[#1e3a8a]">
          Foram identificados 2 imóveis lindeiros através do mapa. Verifique os dados e adicione as informações de contato dos proprietários.
        </p>
      </div>
    </div>
  );
}

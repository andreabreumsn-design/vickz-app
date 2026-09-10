import React, { useState } from 'react';
import { ChevronUp, MapPin, Trash2 } from 'lucide-react';

export default function PointsPanel({ points = [], onDeletePoint, onNext }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const obraPoint = points.find(p => p.type === 'obra');
  const vizinhos = points.filter(p => p.type === 'vizinhos');

  const handleDeletePoint = (pointId) => {
    onDeletePoint(pointId);
  };

  return (
    <div className="fixed bottom-24 left-0 right-0 bg-[#0f1419] border-t-2 border-[#FF6600] rounded-t-2xl shadow-2xl z-[300] max-w-[430px] mx-auto transition-all">
      {/* Handle / Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-black/30"
      >
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white">Pontos Georreferenciados</h3>
          <p className="text-xs text-[#cbd5e1]">
            {points.length} ponto{points.length !== 1 ? 's' : ''} adicionado{points.length !== 1 ? 's' : ''}
          </p>
        </div>
        <ChevronUp
          size={20}
          className={`text-[#FF6600] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 max-h-64 overflow-y-auto">
          {/* Obra Section */}
          {obraPoint && (
            <div className="bg-[#FF6600]/10 border-l-4 border-[#FF6600] rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#FF6600] uppercase">Local da Obra</p>
                  <p className="text-white text-sm font-semibold mt-1">{obraPoint.label}</p>
                  <div className="mt-2 space-y-1 text-xs text-[#cbd5e1]">
                    <p>📍 Lat: {obraPoint.lat.toFixed(6)}</p>
                    <p>📍 Lng: {obraPoint.lng.toFixed(6)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeletePoint(obraPoint.id)}
                  className="p-2 hover:bg-[#FF6600] rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-[#FF6600] hover:text-white" />
                </button>
              </div>
            </div>
          )}

          {/* Vizinhos Section */}
          {vizinhos.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#E62117] uppercase">Imóveis Lindeiros (Vizinhança)</p>
              <div className="space-y-2">
                {vizinhos.map((vizinho, idx) => (
                  <div
                    key={vizinho.id}
                    className="bg-[#E62117]/10 border-l-4 border-[#E62117] rounded-lg p-3 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">Vizinho {idx + 1}</p>
                      <div className="mt-2 space-y-1 text-xs text-[#cbd5e1]">
                        <p>📍 Lat: {vizinho.lat.toFixed(6)}</p>
                        <p>📍 Lng: {vizinho.lng.toFixed(6)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeletePoint(vizinho.id)}
                      className="p-2 hover:bg-[#E62117] rounded-lg transition-colors"
                    >
                      <Trash2 size={16} className="text-[#E62117] hover:text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {points.length === 0 && (
            <div className="text-center py-6">
              <MapPin size={24} className="mx-auto text-[#94a3b8] mb-2" />
              <p className="text-xs text-[#94a3b8]">Nenhum ponto adicionado. Clique nos botões acima para começar.</p>
            </div>
          )}

          {/* Action Buttons */}
          {points.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#334155]">
              <button className="py-2 px-3 rounded-lg border-2 border-[#334155] text-[#cbd5e1] text-xs font-bold hover:border-[#FF6600] hover:text-[#FF6600] transition-all">
                💾 Salvar Rascunho
              </button>
              <button
                onClick={onNext}
                className="py-2 px-3 rounded-lg bg-[#FF6600] text-white text-xs font-bold hover:bg-[#E55A00] transition-all"
              >
                Avançar ➔
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

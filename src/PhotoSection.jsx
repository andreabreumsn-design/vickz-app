import React, { useState } from 'react';
import { Camera, RotateCcw, AlertCircle } from 'lucide-react';

export default function PhotoSection({ photoUrl, onPhotoCapture, onPhotoCorrect }) {
  const [showWarning, setShowWarning] = useState(true);

  const placeholderImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect fill='%23f0f9ff' width='300' height='200'/%3E%3Ctext x='50%25' y='40%25' font-size='16' fill='%2394a3b8' text-anchor='middle' font-family='Arial' font-weight='bold'%3EFoto da Fachada%3C/text%3E%3Ctext x='50%25' y='60%25' font-size='14' fill='%2394a3b8' text-anchor='middle' font-family='Arial'%3EModo Paisagem%3C/text%3E%3C/svg%3E`;

  return (
    <div className="mx-4 my-4 bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-sm">
      {/* Section Title */}
      <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#001F5B]">Foto da Fachada</h3>
        <span className="text-xs font-semibold text-[#FF6600] bg-[#FFF4E6] px-2 py-1 rounded">
          * Paisagem
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Warning Alert */}
        {showWarning && (
          <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-lg p-3 flex gap-2">
            <AlertCircle size={16} className="text-[#FF6600] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#92400E]">Modo Paisagem</p>
              <p className="text-xs text-[#78350F]">Tire fotos com o dispositivo em modo paisagem para melhor qualidade</p>
            </div>
          </div>
        )}

        {/* Photo Preview */}
        <div className="rounded-lg overflow-hidden border border-[#e2e8f0] bg-[#f0f9ff]">
          <img
            src={photoUrl || placeholderImage}
            alt="Foto da Fachada"
            className="w-full aspect-video object-cover"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {/* Capture Button */}
          <button
            onClick={onPhotoCapture}
            className="py-2 px-3 rounded-lg bg-[#FF6600] text-white font-semibold text-sm hover:bg-[#E55A00] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Camera size={16} />
            Tirar Foto
          </button>

          {/* Correct Button */}
          <button
            onClick={onPhotoCorrect}
            className="py-2 px-3 rounded-lg bg-white border-2 border-[#e2e8f0] text-[#001F5B] font-semibold text-sm hover:border-[#FF6600] hover:text-[#FF6600] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <RotateCcw size={16} />
            Corrigir
          </button>
        </div>

        {/* Info Text */}
        <div className="bg-[#DBEAFE] border-l-4 border-[#3B82F6] rounded p-3">
          <p className="text-xs text-[#1E40AF]">
            <span className="font-semibold">Nota:</span> A declaração com o termo de identificação será gerada automaticamente após você confirmar todas as fotos no próximo passo.
          </p>
        </div>

        {/* Landscape Reminder */}
        <div className="text-center pt-2 border-t border-[#e2e8f0]">
          <p className="text-xs font-semibold text-[#FF6600]">* Fotos em modo paisagem</p>
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function SignaturePadExpanded({
  signatureId = 'declarant',
  signerName = '',
  signerInfo = '',
  onSignatureChange,
  signatureData = null
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#001F5B';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Load existing signature if available
    if (signatureData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        setIsEmpty(false);
      };
      img.src = signatureData;
    }
  }, [signatureData]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setIsEmpty(false);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const signatureImageData = canvas.toDataURL('image/png');
    onSignatureChange?.(signatureId, signatureImageData);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const ctx = canvas.getContext('2d');

    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
    setIsEmpty(false);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const signatureImageData = canvas.toDataURL('image/png');
    onSignatureChange?.(signatureId, signatureImageData);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    onSignatureChange?.(signatureId, null);
  };

  return (
    <div className="mx-4 my-4 bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <h3 className="text-sm font-bold text-[#001F5B] mb-1">Assinatura Digital</h3>
        <p className="text-xs text-[#64748b]">{signerName}</p>
        {signerInfo && (
          <p className="text-xs text-[#94a3b8] mt-0.5">{signerInfo}</p>
        )}
      </div>

      {/* Canvas Container */}
      <div className="p-4 space-y-3">
        {/* Landscape Instruction */}
        <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-lg p-2">
          <p className="text-xs text-[#92400E]">
            💡 <span className="font-semibold">Dica:</span> Gire seu celular para o modo paisagem para maior conforto ao assinar
          </p>
        </div>

        {/* Signature Canvas */}
        <div className="border-2 border-dashed border-[#e2e8f0] rounded-lg bg-white overflow-hidden">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full h-48 cursor-crosshair block touch-none"
            style={{ backgroundColor: isEmpty ? '#f9fafb' : '#ffffff' }}
          />
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          disabled={isEmpty}
          className="w-full py-2 px-3 rounded-lg border-2 border-[#e2e8f0] text-[#001F5B] font-semibold text-sm hover:border-[#EF4444] hover:text-[#EF4444] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          <Trash2 size={16} />
          Limpar Assinatura
        </button>

        {/* Status */}
        {isEmpty && (
          <p className="text-xs text-[#64748b] text-center">
            Clique acima para assinar
          </p>
        )}
        {!isEmpty && (
          <p className="text-xs text-[#10b981] text-center font-semibold">
            ✓ Assinatura capturada
          </p>
        )}
      </div>
    </div>
  );
}

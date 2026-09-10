import React, { useState, useRef } from 'react';
import { Trash2, Copy } from 'lucide-react';

export default function PhotoGalleryCard({
  photoIndex = 1,
  photoUrl,
  environment = '',
  pathology = '',
  onEnvironmentChange,
  onPathologyChange,
  onDelete,
  onCameraCapture
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState(null); // 'arrow' | 'square' | null
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const placeholderImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect fill='%23f0f9ff' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%2394a3b8' text-anchor='middle' font-family='Arial' font-weight='bold'%3EFoto %23${photoIndex}%3C/text%3E%3C/svg%3E`;

  const handleCanvasMouseDown = (e) => {
    if (!drawMode) return;

    const rect = canvasRef.current.getBoundingClientRect();
    setStartX(e.clientX - rect.left);
    setStartY(e.clientY - rect.top);
    setIsDrawing(true);
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDrawing || !drawMode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw base image
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 3;

      if (drawMode === 'arrow') {
        drawArrow(ctx, startX, startY, currentX, currentY);
      } else if (drawMode === 'square') {
        const width = currentX - startX;
        const height = currentY - startY;
        ctx.strokeRect(startX, startY, width, height);
      }
    };
    img.src = photoUrl || placeholderImage;
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const drawArrow = (ctx, fromX, fromY, toX, toY) => {
    const headlen = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    // Draw line
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Draw arrowhead
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  };

  return (
    <div className="mx-4 my-4 bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-sm">
      {/* Card Header */}
      <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#001F5B]">Foto #{photoIndex}</h3>
        {onDelete && (
          <button
            onClick={() => onDelete(photoIndex)}
            className="p-1 text-[#64748b] hover:text-[#EF4444] transition-colors"
            title="Deletar foto"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Photo Display Area */}
      <div className="p-4 space-y-4">
        {/* Photo Preview */}
        <div className="rounded-lg overflow-hidden border border-[#e2e8f0] bg-[#f0f9ff]">
          <div className="relative aspect-video w-full">
            <img
              src={photoUrl || placeholderImage}
              alt={`Foto ${photoIndex}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Canvas for Drawing (Hidden) */}
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          className="hidden"
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
        />

        {/* Camera & Annotation Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {/* Camera Button */}
          <button
            onClick={onCameraCapture}
            className="py-2 px-2 rounded-lg bg-[#001F5B] text-white font-semibold text-xs hover:bg-[#0B1220] transition-all flex items-center justify-center gap-1 active:scale-95"
          >
            📷 Foto
          </button>

          {/* Red Arrow Button */}
          <button
            onClick={() => setDrawMode(drawMode === 'arrow' ? null : 'arrow')}
            className={`py-2 px-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-1 active:scale-95 ${
              drawMode === 'arrow'
                ? 'bg-[#EF4444] text-white'
                : 'bg-white border-2 border-[#e2e8f0] text-[#001F5B] hover:border-[#EF4444]'
            }`}
          >
            ➜ Seta
          </button>

          {/* Red Square Button */}
          <button
            onClick={() => setDrawMode(drawMode === 'square' ? null : 'square')}
            className={`py-2 px-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-1 active:scale-95 ${
              drawMode === 'square'
                ? 'bg-[#EF4444] text-white'
                : 'bg-white border-2 border-[#e2e8f0] text-[#001F5B] hover:border-[#EF4444]'
            }`}
          >
            ■ Quadrado
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-3 pt-2 border-t border-[#e2e8f0]">
          {/* Ambiente */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#001F5B]">
              Ambiente *
            </label>
            <input
              type="text"
              value={environment}
              onChange={(e) => onEnvironmentChange(photoIndex, e.target.value)}
              placeholder="Ex: Sala de estar"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>

          {/* Patologia */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#001F5B]">
              Patologia (se houver)
            </label>
            <input
              type="text"
              value={pathology}
              onChange={(e) => onPathologyChange(photoIndex, e.target.value)}
              placeholder="Ex: Trinca na alvenaria"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Camera, Phone, MapPin, FileText, Home } from 'lucide-react';

export default function PropertyCard({ terrainNumber = 1, onPhotoView }) {
  const [formData, setFormData] = useState({
    owner: '',
    address: '',
    registration: '',
    currentUse: '',
    contact: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const placeholderImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23e2e8f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle' font-family='Arial'%3EFoto da Fachada%3C/text%3E%3C/svg%3E`;

  return (
    <div className="mx-4 my-4 bg-white rounded-lg shadow-sm border border-[#e2e8f0] overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-[#E62117] to-[#991b1b] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="font-bold text-white text-sm">{terrainNumber}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Terreno {terrainNumber}</p>
            <p className="text-xs text-white/80">Imóvel Lindeiro</p>
          </div>
        </div>
        <div className="bg-[#10b981] text-white px-3 py-1 rounded-full text-xs font-bold">
          ✓ Selecionado
        </div>
      </div>

      {/* Card Body - Two Columns */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Left Column - Form Fields */}
        <div className="space-y-3">
          {/* Owner */}
          <div className="space-y-1">
            <label className="flex items-center text-xs font-semibold text-[#001F5B]">
              <Home size={14} className="mr-1 text-[#FF6600]" />
              Proprietário *
            </label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
              placeholder="Nome completo"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="flex items-center text-xs font-semibold text-[#001F5B]">
              <MapPin size={14} className="mr-1 text-[#FF6600]" />
              Endereço *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Rua, nº, cidade"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>

          {/* Registration */}
          <div className="space-y-1">
            <label className="flex items-center text-xs font-semibold text-[#001F5B]">
              <FileText size={14} className="mr-1 text-[#FF6600]" />
              Matrícula
            </label>
            <input
              type="text"
              name="registration"
              value={formData.registration}
              onChange={handleInputChange}
              placeholder="Nº matrícula"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>

          {/* Current Use */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#001F5B]">
              Uso Atual
            </label>
            <select
              name="currentUse"
              value={formData.currentUse}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all bg-white"
            >
              <option value="">Selecione...</option>
              <option value="residential">Residencial</option>
              <option value="commercial">Comercial</option>
              <option value="industrial">Industrial</option>
              <option value="mixed">Misto</option>
              <option value="vacant">Vago</option>
            </select>
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <label className="flex items-center text-xs font-semibold text-[#001F5B]">
              <Phone size={14} className="mr-1 text-[#FF6600]" />
              Contato *
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="(11) 98765-4321"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Column - Photo */}
        <div className="flex flex-col gap-2">
          <div className="relative rounded-lg overflow-hidden bg-[#f8fafc] border border-[#e2e8f0] aspect-square flex items-center justify-center">
            <img
              src={placeholderImage}
              alt={`Fachada Terreno ${terrainNumber}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center">
              <Camera size={24} className="text-white opacity-0 hover:opacity-100 transition-all" />
            </div>
          </div>
          <button
            onClick={() => onPhotoView && onPhotoView(terrainNumber)}
            className="py-2 px-3 rounded-lg bg-white border-2 border-[#e2e8f0] text-[#001F5B] text-xs font-bold hover:border-[#FF6600] hover:text-[#FF6600] transition-all active:scale-95"
          >
            📷 Ver fotos
          </button>
        </div>
      </div>
    </div>
  );
}

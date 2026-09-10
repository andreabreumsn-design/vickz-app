import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Building2 } from 'lucide-react';

export default function IdentificationForm({ formData, onFormChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="mx-4 my-4 bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-sm">
      {/* Section Title */}
      <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <h3 className="text-sm font-bold text-[#001F5B]">Seção 1 — Identificação da Vistoria</h3>
      </div>

      {/* Form Content */}
      <div className="p-4 space-y-4">
        {/* Row 1: Nº Reference & Date */}
        <div className="grid grid-cols-2 gap-3">
          {/* Nº / Referência */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#001F5B]">Nº / Referência *</label>
            <input
              type="text"
              name="reference"
              value={formData.reference || ''}
              onChange={handleChange}
              placeholder="Ex: VIZ-001"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>

          {/* Data */}
          <div className="space-y-1">
            <label className="flex items-center text-xs font-semibold text-[#001F5B]">
              <Calendar size={14} className="mr-1 text-[#FF6600]" />
              Data *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 2: Horário */}
        <div className="space-y-1">
          <label className="flex items-center text-xs font-semibold text-[#001F5B]">
            <Clock size={14} className="mr-1 text-[#FF6600]" />
            Horário *
          </label>
          <input
            type="time"
            name="time"
            value={formData.time || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
          />
        </div>

        {/* Row 3: Endereço */}
        <div className="space-y-1">
          <label className="flex items-center text-xs font-semibold text-[#001F5B]">
            <MapPin size={14} className="mr-1 text-[#FF6600]" />
            Endereço do Imóvel Vistoriado *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            placeholder="Rua, Avenida, etc."
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
          />
        </div>

        {/* Row 4: Complemento / Unidade */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#001F5B]">Complemento / Unidade</label>
          <input
            type="text"
            name="complement"
            value={formData.complement || ''}
            onChange={handleChange}
            placeholder="Apto, loja, número da unidade, etc."
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
          />
        </div>

        {/* Row 5: Município & UF */}
        <div className="grid grid-cols-2 gap-3">
          {/* Município */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#001F5B]">Município *</label>
            <input
              type="text"
              name="municipality"
              value={formData.municipality || ''}
              onChange={handleChange}
              placeholder="São Paulo"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>

          {/* UF */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#001F5B]">UF *</label>
            <select
              name="state"
              value={formData.state || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all bg-white"
            >
              <option value="">Selecione...</option>
              <option value="SP">SP</option>
              <option value="RJ">RJ</option>
              <option value="MG">MG</option>
              <option value="BA">BA</option>
              <option value="SC">SC</option>
              <option value="RS">RS</option>
              <option value="PR">PR</option>
              <option value="DF">DF</option>
            </select>
          </div>
        </div>

        {/* Row 6: CEP */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#001F5B]">CEP *</label>
          <input
            type="text"
            name="cep"
            value={formData.cep || ''}
            onChange={handleChange}
            placeholder="00000-000"
            maxLength="9"
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}

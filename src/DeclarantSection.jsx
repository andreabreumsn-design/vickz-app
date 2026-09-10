import React, { useState } from 'react';
import { User, FileText, Phone, Mail, Paperclip } from 'lucide-react';

export default function DeclarantSection({ formData, onFormChange }) {
  const [attachmentName, setAttachmentName] = useState(formData.attachmentName || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
      onFormChange({
        ...formData,
        attachment: file,
        attachmentName: file.name
      });
    }
  };

  return (
    <div className="mx-4 my-4 bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-sm">
      {/* Section Title */}
      <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <h3 className="text-sm font-bold text-[#001F5B]">Seção 2 — Identificação do Declarante</h3>
      </div>

      {/* Form Content */}
      <div className="p-4 space-y-4">
        {/* Row 1: Nome Completo */}
        <div className="space-y-1">
          <label className="flex items-center text-xs font-semibold text-[#001F5B]">
            <User size={14} className="mr-1 text-[#FF6600]" />
            Nome Completo *
          </label>
          <input
            type="text"
            name="declarantName"
            value={formData.declarantName || ''}
            onChange={handleChange}
            placeholder="João da Silva"
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
          />
        </div>

        {/* Row 2: CPF / CNPJ & RG */}
        <div className="grid grid-cols-2 gap-3">
          {/* CPF / CNPJ */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#001F5B]">CPF / CNPJ *</label>
            <input
              type="text"
              name="cpfCnpj"
              value={formData.cpfCnpj || ''}
              onChange={handleChange}
              placeholder="000.000.000-00"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>

          {/* RG / Órgão Emissor */}
          <div className="space-y-1">
            <label className="flex items-center text-xs font-semibold text-[#001F5B]">
              <FileText size={14} className="mr-1 text-[#FF6600]" />
              RG / Órgão *
            </label>
            <input
              type="text"
              name="rgAgency"
              value={formData.rgAgency || ''}
              onChange={handleChange}
              placeholder="SSP/SP"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 3: Qualidade */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#001F5B]">Qualidade *</label>
          <select
            name="quality"
            value={formData.quality || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all bg-white"
          >
            <option value="">Selecione...</option>
            <option value="proprietario">Proprietário</option>
            <option value="locatario">Locatário</option>
            <option value="inquilino">Inquilino</option>
            <option value="representante">Representante Legal</option>
            <option value="sindico">Síndico</option>
            <option value="administrador">Administrador</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        {/* Row 4: Anexo - Print de Conversa */}
        <div className="space-y-1">
          <label className="flex items-center text-xs font-semibold text-[#001F5B]">
            <Paperclip size={14} className="mr-1 text-[#FF6600]" />
            Anexar Print de Conversa (WhatsApp/Email) *
          </label>
          <p className="text-xs text-[#64748b] mb-2">
            Demonstração de autorização/agendamento da visita de vistoria
          </p>
          <div className="relative">
            <input
              type="file"
              id="attachment"
              name="attachment"
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="hidden"
            />
            <label
              htmlFor="attachment"
              className="block w-full px-3 py-2 rounded-lg border-2 border-dashed border-[#e2e8f0] text-center text-xs text-[#64748b] cursor-pointer hover:border-[#FF6600] hover:text-[#FF6600] transition-all"
            >
              {attachmentName ? (
                <span className="font-semibold text-[#001F5B]">✓ {attachmentName}</span>
              ) : (
                <span>📎 Clique para anexar arquivo (JPG, PNG, PDF)</span>
              )}
            </label>
          </div>
        </div>

        {/* Row 5: Telefone & Email */}
        <div className="grid grid-cols-2 gap-3">
          {/* Telefone */}
          <div className="space-y-1">
            <label className="flex items-center text-xs font-semibold text-[#001F5B]">
              <Phone size={14} className="mr-1 text-[#FF6600]" />
              Telefone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="(11) 98765-4321"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="flex items-center text-xs font-semibold text-[#001F5B]">
              <Mail size={14} className="mr-1 text-[#FF6600]" />
              E-mail *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="joao@email.com"
              className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

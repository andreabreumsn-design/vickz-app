import React, { useState } from 'react';
import { Upload, MapPin, Building2, FileText, User, Briefcase } from 'lucide-react';

export default function PropertyForm() {
  const [formData, setFormData] = useState({
    propertyName: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    builderName: '',
    professionalName: '',
    professionalCrea: '',
    matriculas: null,
    project: null,
  });

  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState({ matriculas: 0, project: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (type, file) => {
    if (file) {
      setFormData(prev => ({ ...prev, [type]: file }));
      // Simular progresso
      setUploadProgress(prev => ({ ...prev, [type]: 100 }));
      setTimeout(() => {
        setUploadProgress(prev => ({ ...prev, [type]: 0 }));
      }, 1000);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.propertyName) newErrors.propertyName = 'Nome obrigatório';
    if (!formData.street) newErrors.street = 'Logradouro obrigatório';
    if (!formData.builderName) newErrors.builderName = 'Construtora obrigatória';
    if (!formData.professionalName) newErrors.professionalName = 'Nome do profissional obrigatório';
    if (!formData.professionalCrea) newErrors.professionalCrea = 'CREA/CAU obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    console.log('Salvando rascunho...', formData);
    // Aqui implementar lógica de salvamento
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log('Avançando com dados:', formData);
      // Aqui implementar navegação para próxima tela
    }
  };

  return (
    <div className="px-4 py-6 space-y-6 max-w-[430px] mx-auto">
      {/* Section Title */}
      <div>
        <h2 className="text-2xl font-bold text-[#001F5B] mb-2">Dados do Empreendimento</h2>
        <p className="text-sm text-[#64748b]">Preencha as informações básicas do empreendimento para iniciar a vistoria.</p>
      </div>

      {/* Property Name */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-[#001F5B]">
          <Building2 size={16} className="mr-2 text-[#FF6600]" />
          Nome do Empreendimento *
        </label>
        <input
          type="text"
          name="propertyName"
          value={formData.propertyName}
          onChange={handleInputChange}
          placeholder="Ex: Residencial Parque das Araucárias"
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
            errors.propertyName
              ? 'border-[#E62117] bg-[#E62117]/5'
              : 'border-[#e2e8f0] focus:border-[#FF6600]'
          }`}
        />
        {errors.propertyName && <p className="text-xs text-[#E62117]">{errors.propertyName}</p>}
      </div>

      {/* Street */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-[#001F5B]">
          <MapPin size={16} className="mr-2 text-[#FF6600]" />
          Logradouro *
        </label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          placeholder="Ex: Rua das Flores"
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
            errors.street
              ? 'border-[#E62117] bg-[#E62117]/5'
              : 'border-[#e2e8f0] focus:border-[#FF6600]'
          }`}
        />
        {errors.street && <p className="text-xs text-[#E62117]">{errors.street}</p>}
      </div>

      {/* Address Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#001F5B]">Nº *</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            placeholder="123"
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#001F5B]">Complemento</label>
          <input
            type="text"
            name="complement"
            value={formData.complement}
            onChange={handleInputChange}
            placeholder="Apt. 101"
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none"
          />
        </div>
      </div>

      {/* Address Grid 2 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#001F5B]">Bairro</label>
          <input
            type="text"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleInputChange}
            placeholder="Vila Clara"
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#001F5B]">Cidade</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="São Paulo"
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none"
          />
        </div>
      </div>

      {/* Address Grid 3 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#001F5B]">UF</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="SP"
            maxLength="2"
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none uppercase"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#001F5B]">CEP</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            placeholder="01310-100"
            className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm focus:border-[#FF6600] focus:outline-none"
          />
        </div>
      </div>

      {/* Builder Name */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-[#001F5B]">
          <Briefcase size={16} className="mr-2 text-[#FF6600]" />
          Construtora / Incorporadora *
        </label>
        <input
          type="text"
          name="builderName"
          value={formData.builderName}
          onChange={handleInputChange}
          placeholder="Nome da Construtora"
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
            errors.builderName
              ? 'border-[#E62117] bg-[#E62117]/5'
              : 'border-[#e2e8f0] focus:border-[#FF6600]'
          }`}
        />
        {errors.builderName && <p className="text-xs text-[#E62117]">{errors.builderName}</p>}
      </div>

      {/* Professional Name */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-[#001F5B]">
          <User size={16} className="mr-2 text-[#FF6600]" />
          Profissional que executa a vistoria *
        </label>
        <input
          type="text"
          name="professionalName"
          value={formData.professionalName}
          onChange={handleInputChange}
          placeholder="Nome do Profissional"
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
            errors.professionalName
              ? 'border-[#E62117] bg-[#E62117]/5'
              : 'border-[#e2e8f0] focus:border-[#FF6600]'
          }`}
        />
        {errors.professionalName && <p className="text-xs text-[#E62117]">{errors.professionalName}</p>}
      </div>

      {/* Professional CREA/CAU */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#001F5B]">CREA / CAU *</label>
        <input
          type="text"
          name="professionalCrea"
          value={formData.professionalCrea}
          onChange={handleInputChange}
          placeholder="Ex: SP-1234/D ou A1234567"
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
            errors.professionalCrea
              ? 'border-[#E62117] bg-[#E62117]/5'
              : 'border-[#e2e8f0] focus:border-[#FF6600]'
          }`}
        />
        {errors.professionalCrea && <p className="text-xs text-[#E62117]">{errors.professionalCrea}</p>}
      </div>

      {/* Upload Sections */}
      <div className="space-y-4 pt-2">
        {/* Matriculas Upload */}
        <div className="border-2 border-dashed border-[#e2e8f0] rounded-lg p-4 text-center hover:border-[#FF6600] transition-colors">
          <input
            type="file"
            id="matriculas"
            className="hidden"
            onChange={(e) => handleFileUpload('matriculas', e.target.files?.[0])}
            accept=".pdf,.doc,.docx"
          />
          <label htmlFor="matriculas" className="cursor-pointer block">
            <Upload size={24} className="mx-auto text-[#FF6600] mb-2" />
            <p className="text-sm font-semibold text-[#001F5B]">Anexar Matrículas</p>
            <p className="text-xs text-[#94a3b8]">PDF, DOC ou DOCX</p>
            {uploadProgress.matriculas > 0 && (
              <div className="mt-2 bg-[#e2e8f0] rounded-full h-1 overflow-hidden">
                <div
                  className="bg-[#FF6600] h-full transition-all"
                  style={{ width: `${uploadProgress.matriculas}%` }}
                />
              </div>
            )}
            {formData.matriculas && (
              <p className="text-xs text-[#10b981] mt-2">✓ {formData.matriculas.name}</p>
            )}
          </label>
        </div>

        {/* Project Upload */}
        <div className="border-2 border-dashed border-[#e2e8f0] rounded-lg p-4 text-center hover:border-[#FF6600] transition-colors">
          <input
            type="file"
            id="project"
            className="hidden"
            onChange={(e) => handleFileUpload('project', e.target.files?.[0])}
            accept=".pdf,.dwg,.dxf"
          />
          <label htmlFor="project" className="cursor-pointer block">
            <FileText size={24} className="mx-auto text-[#FF6600] mb-2" />
            <p className="text-sm font-semibold text-[#001F5B]">Anexar Projeto Arquitetônico</p>
            <p className="text-xs text-[#94a3b8]">PDF, DWG ou DXF</p>
            {uploadProgress.project > 0 && (
              <div className="mt-2 bg-[#e2e8f0] rounded-full h-1 overflow-hidden">
                <div
                  className="bg-[#FF6600] h-full transition-all"
                  style={{ width: `${uploadProgress.project}%` }}
                />
              </div>
            )}
            {formData.project && (
              <p className="text-xs text-[#10b981] mt-2">✓ {formData.project.name}</p>
            )}
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <button
          onClick={handleSaveDraft}
          className="py-3 px-4 rounded-lg border-2 border-[#e2e8f0] text-[#001F5B] font-semibold text-sm hover:border-[#FF6600] hover:text-[#FF6600] transition-all active:scale-95"
        >
          Salvar Rascunho
        </button>
        <button
          onClick={handleNext}
          className="py-3 px-4 rounded-lg bg-[#FF6600] text-white font-semibold text-sm hover:bg-[#E55A00] transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Avançar <span>→</span>
        </button>
      </div>

      {/* Spacing for bottom nav */}
      <div className="h-8" />
    </div>
  );
}

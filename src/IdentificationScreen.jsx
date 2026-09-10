import React, { useState } from 'react';
import Header from './Header';
import Stepper06 from './Stepper06';
import IdentificationForm from './IdentificationForm';
import DeclarantSection from './DeclarantSection';
import PhotoSection from './PhotoSection';
import NavigationBar from './NavigationBar';

export default function IdentificationScreen() {
  const [activeTab, setActiveTab] = useState('identificacao');
  const [photoUrl, setPhotoUrl] = useState('');
  const [formData, setFormData] = useState({
    // Section 1 - Identification
    reference: '',
    date: '',
    time: '',
    address: '',
    complement: '',
    municipality: '',
    state: '',
    cep: '',
    // Section 2 - Declarant
    declarantName: '',
    cpfCnpj: '',
    rgAgency: '',
    quality: '',
    attachment: null,
    attachmentName: '',
    phone: '',
    email: '',
  });

  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
  };

  const handlePhotoCapture = () => {
    // Placeholder for camera functionality
    console.log('Opening camera...');
    // In production: Use mediaDevices API or device camera
  };

  const handlePhotoCorrect = () => {
    console.log('Clearing photo...');
    setPhotoUrl('');
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    // Placeholder for localStorage/backend save
    alert('Rascunho salvo com sucesso!');
  };

  const handleNext = () => {
    // Validation check
    const requiredFields = [
      'reference', 'date', 'time', 'address',
      'municipality', 'state', 'cep',
      'declarantName', 'cpfCnpj', 'rgAgency', 'quality',
      'phone', 'email'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Campos obrigatórios faltando: ${missingFields.join(', ')}`);
      return;
    }

    if (!formData.attachment) {
      alert('Por favor, anexe um print de conversa de autorização');
      return;
    }

    console.log('Advancing to photo screen with data:', formData);
    // Navigate to next screen
  };

  const handleNavigate = (screen) => {
    setActiveTab(screen);
    console.log(`Navigating to: ${screen}`);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Header */}
      <Header title="Anexo 1 — Identificação" />

      {/* Stepper */}
      <Stepper06 />

      {/* Main Title */}
      <div className="max-w-[430px] mx-auto px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-[#001F5B] mb-1">Anexo 1 — Identificação</h2>
            <p className="text-sm text-[#64748b]">
              Preencha as informações da vistoria e do declarante para gerar o laudo técnico
            </p>
          </div>
          <div className="text-xs font-semibold text-[#FF6600] bg-[#FFF4E6] px-2 py-1 rounded whitespace-nowrap flex-shrink-0">
            * Paisagem
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-[430px] mx-auto space-y-2 py-2">
        {/* Section 1 - Identification */}
        <IdentificationForm formData={formData} onFormChange={handleFormChange} />

        {/* Section 2 - Declarant */}
        <DeclarantSection formData={formData} onFormChange={handleFormChange} />

        {/* Section 3 - Photo */}
        <PhotoSection
          photoUrl={photoUrl}
          onPhotoCapture={handlePhotoCapture}
          onPhotoCorrect={handlePhotoCorrect}
        />

        {/* Action Buttons */}
        <div className="mx-4 my-4 space-y-2">
          {/* Save Draft Button */}
          <button
            onClick={handleSaveDraft}
            className="w-full py-3 px-4 rounded-lg border-2 border-[#e2e8f0] text-[#001F5B] font-semibold text-sm hover:border-[#FF6600] hover:text-[#FF6600] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            💾 Salvar Rascunho
          </button>

          {/* Advance Button */}
          <button
            onClick={handleNext}
            className="w-full py-3 px-4 rounded-lg bg-[#FF6600] text-white font-semibold text-sm hover:bg-[#E55A00] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Avançar → fotos na hora ➔
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <NavigationBar activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}

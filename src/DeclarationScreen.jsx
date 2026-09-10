import React, { useState } from 'react';
import Header from './Header';
import Stepper08 from './Stepper08';
import WarrantyDeclarationSection from './WarrantyDeclarationSection';
import SignaturePadExpanded from './SignaturePadExpanded';
import NavigationBar from './NavigationBar';

export default function DeclarationScreen() {
  const [activeTab, setActiveTab] = useState('declaracao');
  const [signatures, setSignatures] = useState({
    declarant: null,
    professional: null
  });

  // Mock data - in production, these would come from previous screens
  const inspectionData = {
    reference: 'VICKZ-2024-001-SP',
    date: '10/09/2026',
    declarantName: 'João da Silva',
    declarantQuality: 'Proprietário',
    cpfCnpj: '123.456.789-00',
    professionalName: 'André Abreu Silva',
    professionalCrea: 'SP123456/D',
    email: 'joao@email.com',
    phone: '(11) 98765-4321'
  };

  const handleSignatureChange = (signatureId, signatureData) => {
    setSignatures(prev => ({
      ...prev,
      [signatureId]: signatureData
    }));
  };

  const handleSaveDraft = () => {
    console.log('Saving declaration draft with signatures:', signatures);
    alert('✓ Rascunho da declaração salvo com sucesso!');
  };

  const handleFinalSubmit = () => {
    // Validation
    if (!signatures.declarant) {
      alert('Por favor, assine na seção do Declarante');
      return;
    }

    if (!signatures.professional) {
      alert('Por favor, assine na seção do Profissional Responsável');
      return;
    }

    console.log('Submitting final report with all data:', {
      inspection: inspectionData,
      signatures: signatures
    });

    alert('✓ Relatório Final concluído e salvo com sucesso!\n\nArtigo de responsabilidade técnica gerado.');
  };

  const handleNavigate = (screen) => {
    setActiveTab(screen);
    console.log(`Navigating to: ${screen}`);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Header */}
      <Header title="Declaração e Assinatura" />

      {/* Stepper */}
      <Stepper08 />

      {/* Title */}
      <div className="max-w-[430px] mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold text-[#001F5B] mb-2">Declaração e Assinatura</h2>
        <p className="text-sm text-[#64748b]">
          Revise as informações da vistoria e assine digitalmente para conclusão do laudo
        </p>
      </div>

      {/* Content */}
      <div className="max-w-[430px] mx-auto space-y-2 py-2">
        {/* Warranty Declaration Section */}
        <WarrantyDeclarationSection
          inspectionRef={inspectionData.reference}
          inspectionDate={inspectionData.date}
          declarantName={inspectionData.declarantName}
          declarantQuality={inspectionData.declarantQuality}
          professionalName={inspectionData.professionalName}
          professionalCrea={inspectionData.professionalCrea}
        />

        {/* Declarant Signature */}
        <SignaturePadExpanded
          signatureId="declarant"
          signerName={inspectionData.declarantName}
          signerInfo={`${inspectionData.declarantQuality} • CPF: ${inspectionData.cpfCnpj}`}
          onSignatureChange={handleSignatureChange}
          signatureData={signatures.declarant}
        />

        {/* Professional Signature */}
        <SignaturePadExpanded
          signatureId="professional"
          signerName={inspectionData.professionalName}
          signerInfo={`Profissional Responsável • CREA: ${inspectionData.professionalCrea}`}
          onSignatureChange={handleSignatureChange}
          signatureData={signatures.professional}
        />

        {/* Action Buttons */}
        <div className="mx-4 my-4 space-y-2">
          {/* Save Draft */}
          <button
            onClick={handleSaveDraft}
            className="w-full py-3 px-4 rounded-lg border-2 border-[#e2e8f0] text-[#001F5B] font-semibold text-sm hover:border-[#FF6600] hover:text-[#FF6600] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            💾 Salvar Rascunho
          </button>

          {/* Final Submit */}
          <button
            onClick={handleFinalSubmit}
            className="w-full py-3 px-4 rounded-lg bg-[#FF6600] text-white font-semibold text-sm hover:bg-[#E55A00] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Concluir e Salvar Relatório Final ➔
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <NavigationBar activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}

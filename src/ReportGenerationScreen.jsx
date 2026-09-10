import React, { useState } from 'react';
import Header from './Header';
import Stepper09 from './Stepper09';
import ReportActionCard from './ReportActionCard';
import PropertyReportCard from './PropertyReportCard';
import NavigationBar from './NavigationBar';

export default function ReportGenerationScreen() {
  const [activeTab, setActiveTab] = useState('relatorio');

  // Mock data - properties/neighbors
  const properties = [
    {
      id: 1,
      index: 1,
      name: 'Imóvel Lindeiro 1',
      owner: 'Silva Imóveis LTDA',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      status: 'Pendente'
    },
    {
      id: 2,
      index: 2,
      name: 'Imóvel Lindeiro 2',
      owner: 'José Pereira',
      address: 'Avenida Paulista, 456 - São Paulo, SP',
      status: 'Pendente'
    },
    {
      id: 3,
      index: 3,
      name: 'Imóvel Lindeiro 3',
      owner: 'Condomínio Residencial Park',
      address: 'Rua Principal, 789 - São Paulo, SP',
      status: 'Pendente'
    }
  ];

  // Global actions
  const handlePdfAll = () => {
    console.log('Generating PDF for all properties');
    alert('✓ PDF integral (todos) gerado com sucesso!\n\nArquivo: relatorio-completo.pdf');
  };

  const handleWordAll = () => {
    console.log('Generating Word document for all properties');
    alert('✓ Word integral (todos) gerado com sucesso!\n\nArquivo: relatorio-completo.docx');
  };

  const handleSubmitBackend = async () => {
    console.log('Submitting to backend: http://localhost:3001');
    try {
      const response = await fetch('http://localhost:3001/api/reports/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: 'VICKZ-2024-001-SP',
          properties: properties,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        alert('✓ Relatório enviado ao backend com sucesso!\n\nURL: http://localhost:3001/api/reports/view');
        console.log('Backend response:', await response.json());
      } else {
        alert('⚠️ Erro ao enviar para o backend.\n\nVerifique se http://localhost:3001 está acessível.');
      }
    } catch (error) {
      console.error('Backend error:', error);
      alert('⚠️ Erro ao conectar ao backend.\n\nVerifique se http://localhost:3001 está acessível.');
    }
  };

  // Individual property actions
  const handlePropertyPdf = (propertyId, propertyName) => {
    console.log(`Generating PDF for property ${propertyId}`);
    alert(`✓ PDF de "${propertyName}" gerado com sucesso!\n\nArquivo: relatorio-imovel-${propertyId}.pdf`);
  };

  const handlePropertyWord = (propertyId, propertyName) => {
    console.log(`Generating Word for property ${propertyId}`);
    alert(`✓ Word de "${propertyName}" gerado com sucesso!\n\nArquivo: relatorio-imovel-${propertyId}.docx`);
  };

  const handlePropertyReopen = (propertyId, propertyName) => {
    console.log(`Reopening inspection for property ${propertyId}`);
    alert(`⚠️ Reabrindo vistoria de "${propertyName}"...\n\nVoltando para Tela 07 (Registro Fotográfico)`);
  };

  const handleNavigate = (screen) => {
    setActiveTab(screen);
    console.log(`Navigating to: ${screen}`);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Header */}
      <Header title="Gerar Relatórios" />

      {/* Stepper */}
      <Stepper09 />

      {/* Title */}
      <div className="max-w-[430px] mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold text-[#001F5B] mb-2">Gerar relatórios</h2>
        <p className="text-sm text-[#64748b]">
          PDF (imprimir/salvar) ou Word (.doc) — integral ou por imóvel.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-[430px] mx-auto space-y-2 py-2">
        {/* Global Actions Card */}
        <ReportActionCard
          onPdfAll={handlePdfAll}
          onWordAll={handleWordAll}
          onSubmitBackend={handleSubmitBackend}
        />

        {/* Properties Section Title */}
        <div className="mx-4 mt-6 mb-3">
          <h3 className="text-sm font-bold text-[#001F5B]">Relatórios por Imóvel ({properties.length})</h3>
          <p className="text-xs text-[#64748b] mt-1">Gere ou reabra a vistoria de cada imóvel lindeiro</p>
        </div>

        {/* Property Cards */}
        {properties.map((property) => (
          <PropertyReportCard
            key={property.id}
            propertyIndex={property.index}
            propertyName={property.name}
            ownerName={property.owner}
            address={property.address}
            status={property.status}
            onPdfDownload={() => handlePropertyPdf(property.id, property.name)}
            onWordDownload={() => handlePropertyWord(property.id, property.name)}
            onReopen={() => handlePropertyReopen(property.id, property.name)}
          />
        ))}

        {/* Completion Message */}
        <div className="mx-4 my-6 px-4 py-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg">
          <p className="text-sm font-semibold text-[#065F46] mb-2">✓ Vistoria Completa</p>
          <p className="text-xs text-[#047857] leading-relaxed">
            Todas as etapas foram completadas. Você pode gerar os relatórios em PDF ou Word e enviá-los ao backend para armazenamento e consulta posterior.
          </p>
        </div>
      </div>

      {/* Navigation Bar */}
      <NavigationBar activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}

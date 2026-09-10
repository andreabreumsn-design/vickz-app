import React, { useState } from 'react';
import Header from './Header';
import Stepper07 from './Stepper07';
import PhotoGalleryCard from './PhotoGalleryCard';
import NavigationBar from './NavigationBar';

export default function PhotoRegistrationScreen() {
  const [activeTab, setActiveTab] = useState('fotos');
  const [photos, setPhotos] = useState([
    { id: 1, url: '', environment: '', pathology: '' }
  ]);

  const handleAddPhoto = () => {
    const newId = Math.max(...photos.map(p => p.id), 0) + 1;
    setPhotos([...photos, { id: newId, url: '', environment: '', pathology: '' }]);
  };

  const handleDeletePhoto = (photoIndex) => {
    if (photos.length === 1) {
      alert('Você precisa ter pelo menos uma foto');
      return;
    }
    setPhotos(photos.filter(p => p.id !== photoIndex));
  };

  const handleEnvironmentChange = (photoIndex, value) => {
    setPhotos(photos.map(p =>
      p.id === photoIndex ? { ...p, environment: value } : p
    ));
  };

  const handlePathologyChange = (photoIndex, value) => {
    setPhotos(photos.map(p =>
      p.id === photoIndex ? { ...p, pathology: value } : p
    ));
  };

  const handleCameraCapture = () => {
    console.log('Opening camera...');
    // Placeholder for camera functionality
    // In production: Use mediaDevices API
  };

  const handleSaveDraft = () => {
    console.log('Saving draft with photos:', photos);
    alert('✓ Rascunho salvo com sucesso!');
  };

  const handleNext = () => {
    // Validation: at least one photo with environment
    const photosWithEnvironment = photos.filter(p => p.environment.trim());

    if (photosWithEnvironment.length === 0) {
      alert('Por favor, preencha o campo "Ambiente" para pelo menos uma foto');
      return;
    }

    console.log('Advancing to declaration screen with photos:', photos);
    // Navigate to next screen (Declaração e Assinatura)
    alert(`Avançando com ${photos.length} foto(s) registrada(s)`);
  };

  const handleNavigate = (screen) => {
    setActiveTab(screen);
    console.log(`Navigating to: ${screen}`);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Header */}
      <Header title="Registro Fotográfico" />

      {/* Stepper */}
      <Stepper07 />

      {/* Title & Instructions */}
      <div className="max-w-[430px] mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold text-[#001F5B] mb-2">Registro Fotográfico</h2>
        <div className="bg-[#DBEAFE] border-l-4 border-[#3B82F6] rounded-lg p-3">
          <p className="text-xs text-[#1E40AF] leading-relaxed">
            <span className="font-semibold">Instruções:</span>
            {'\n'}1. Tire a foto
            {'\n'}2. Escreva o ambiente
            {'\n'}3. Se houver patologia, use a seta ou o quadrado na foto
          </p>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="max-w-[430px] mx-auto space-y-2 py-2">
        {photos.map(photo => (
          <PhotoGalleryCard
            key={photo.id}
            photoIndex={photo.id}
            photoUrl={photo.url}
            environment={photo.environment}
            pathology={photo.pathology}
            onEnvironmentChange={handleEnvironmentChange}
            onPathologyChange={handlePathologyChange}
            onDelete={handleDeletePhoto}
            onCameraCapture={handleCameraCapture}
          />
        ))}

        {/* Action Buttons */}
        <div className="mx-4 my-4 space-y-2">
          {/* Add Photo Button */}
          <button
            onClick={handleAddPhoto}
            className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-[#e2e8f0] text-[#001F5B] font-semibold text-sm hover:border-[#FF6600] hover:text-[#FF6600] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            + Mais foto na hora
          </button>

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
            Avançar → declaração e assinatura
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <NavigationBar activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}

import React, { useState } from 'react';
import Header from './Header';
import Stepper05 from './Stepper05';
import InformativeCard from './InformativeCard';
import MiniMap from './MiniMap';
import PropertyCard from './PropertyCard';
import NavigationBar from './NavigationBar';
import { Plus } from 'lucide-react';

export default function NeighborsScreen() {
  const [activeTab, setActiveTab] = useState('viz');
  const [terrains, setTerrains] = useState([
    { id: 1, number: 1 },
    { id: 2, number: 2 },
  ]);

  const handleNavigate = (screen) => {
    setActiveTab(screen);
    console.log(`Navigating to: ${screen}`);
  };

  const handleAddTerrain = () => {
    const newNumber = terrains.length + 1;
    setTerrains([...terrains, { id: Date.now(), number: newNumber }]);
  };

  const handlePhotoView = (terrainNumber) => {
    console.log(`Viewing photos for Terrain ${terrainNumber}`);
    // Navigate to photo gallery or open modal
  };

  const handleNext = () => {
    console.log('Advancing to Confirmação with terrains:', terrains);
    // Navigate to next screen
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Header */}
      <Header title="Imóveis Vizinhos" />

      {/* Stepper */}
      <Stepper05 />

      {/* Content */}
      <div className="max-w-[430px] mx-auto space-y-4 py-4">
        {/* Title */}
        <div className="px-4">
          <h2 className="text-2xl font-bold text-[#001F5B] mb-2">Imóveis Vizinhos</h2>
          <p className="text-sm text-[#64748b]">
            Registre as informações dos proprietários dos imóveis lindeiros para complementar a vistoria.
          </p>
        </div>

        {/* Informative Card */}
        <InformativeCard />

        {/* Mini Map */}
        <MiniMap />

        {/* Terrains Cards */}
        <div className="space-y-4">
          <h3 className="px-4 text-sm font-bold text-[#001F5B]">
            Terrenos Cadastrados ({terrains.length})
          </h3>
          {terrains.map((terrain) => (
            <PropertyCard
              key={terrain.id}
              terrainNumber={terrain.number}
              onPhotoView={handlePhotoView}
            />
          ))}
        </div>

        {/* Add Another Property Button */}
        <button
          onClick={handleAddTerrain}
          className="mx-4 py-3 px-4 rounded-lg border-2 border-dashed border-[#e2e8f0] text-[#001F5B] font-semibold text-sm hover:border-[#FF6600] hover:text-[#FF6600] transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Plus size={18} />
          Adicionar outro imóvel
        </button>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="mx-4 py-3 px-4 rounded-lg bg-[#FF6600] text-white font-semibold text-sm hover:bg-[#E55A00] transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Avançar <span>→</span>
        </button>
      </div>

      {/* Navigation Bar */}
      <NavigationBar activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}

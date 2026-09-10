import React, { useState } from 'react';
import Header from './Header';
import StepperScreen04 from './StepperScreen04';
import MapContainer from './MapContainer';
import PointsPanel from './PointsPanel';
import NavigationBar from './NavigationBar';

export default function MapScreen() {
  const [activeTab, setActiveTab] = useState('obra');
  const [points, setPoints] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: -23.5505, lng: -46.6333 });

  const handleNavigate = (screen) => {
    setActiveTab(screen);
    console.log(`Navigating to: ${screen}`);
  };

  const handlePointsChange = (newPoints) => {
    setPoints(newPoints);
  };

  const handleCoordinatesChange = (lat, lng) => {
    setCoordinates({ lat, lng });
  };

  const handleDeletePoint = (pointId) => {
    const newPoints = points.filter(p => p.id !== pointId);
    setPoints(newPoints);
  };

  const handleNext = () => {
    if (points.length > 0) {
      console.log('Advancing to Vizinhança with points:', points);
      // Implement navigation to next screen
    } else {
      alert('Adicione pelo menos um ponto antes de avançar');
    }
  };

  return (
    <div className="bg-[#0a0e13] min-h-screen pb-24">
      {/* Header */}
      <Header title="Mapa da Obra" />

      {/* Stepper */}
      <StepperScreen04 />

      {/* Map Container */}
      <div className="px-4 py-4">
        <MapContainer
          onPointsChange={handlePointsChange}
          onCoordinatesChange={handleCoordinatesChange}
        />
      </div>

      {/* Points Panel (Bottom Sheet) */}
      <PointsPanel
        points={points}
        onDeletePoint={handleDeletePoint}
        onNext={handleNext}
      />

      {/* Navigation Bar */}
      <NavigationBar activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}

/**
 * App.jsx - VICKZ Fase 3 - Roteamento Principal
 *
 * Estrutura:
 * Tela 06 → IdentificationScreen (Dados da vistoria)
 * Tela 07a → PhotoRegistrationScreen (Fotos)
 * Tela 07b → MapScreen (GPS/Localização)
 * Tela 08 → NeighborsScreen (Vizinhos)
 * Tela 09 → ReportGenerationScreen (Assinatura + Export)
 */

import React, { useState } from 'react';
import { AppProvider } from './AppContext';
import IdentificationScreen from './IdentificationScreen';
import PhotoRegistrationScreen from './PhotoRegistrationScreen';
import MapScreen from './MapScreen';
import NeighborsScreen from './NeighborsScreen';
import ReportGenerationScreen from './ReportGenerationScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('tela06'); // tela06, tela07a, tela07b, tela08, tela09

  const handleNavigate = (screenName) => {
    setCurrentScreen(screenName);
    // Scroll to top quando mudar de tela
    window.scrollTo(0, 0);
  };

  return (
    <AppProvider>
      <div className="w-full">
        {currentScreen === 'tela06' && (
          <IdentificationScreen
            onNext={() => handleNavigate('tela07a')}
          />
        )}

        {currentScreen === 'tela07a' && (
          <PhotoRegistrationScreen
            onNext={() => handleNavigate('tela07b')}
            onPrevious={() => handleNavigate('tela06')}
          />
        )}

        {currentScreen === 'tela07b' && (
          <MapScreen
            onNext={() => handleNavigate('tela08')}
            onPrevious={() => handleNavigate('tela07a')}
          />
        )}

        {currentScreen === 'tela08' && (
          <NeighborsScreen
            onNext={() => handleNavigate('tela09')}
            onPrevious={() => handleNavigate('tela07b')}
          />
        )}

        {currentScreen === 'tela09' && (
          <ReportGenerationScreen
            onPrevious={() => handleNavigate('tela08')}
          />
        )}
      </div>
    </AppProvider>
  );
}

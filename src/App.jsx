import React, { useState } from 'react';
import VickzLoginScreen from './VickzLoginScreen';
import { AppProvider, useAppContext } from './AppContext';
import IdentificationScreen from './IdentificationScreen';
import PhotoRegistrationScreen from './PhotoRegistrationScreen';
import MapScreen from './MapScreen';
import NeighborsScreen from './NeighborsScreen';
import ReportGenerationScreen from './ReportGenerationScreen';
import Banner from './Banner';
import NavigationBar from './NavigationBar';
import Stepper06 from './Stepper06';
import Stepper07 from './Stepper07';
import Stepper08 from './Stepper08';
import Stepper09 from './Stepper09';

/**
 * Conteúdo da aplicação após login
 */
const AppContent = () => {
  const { currentScreen, setCurrentScreen, laudoData } = useAppContext();

  const screens = {
    'identification': {
      name: 'Identificação da Vistoria',
      component: IdentificationScreen,
      stepper: Stepper06
    },
    'photos': {
      name: 'Registros Fotográficos',
      component: PhotoRegistrationScreen,
      stepper: Stepper07
    },
    'map': {
      name: 'Georreferenciamento',
      component: MapScreen,
      stepper: Stepper07
    },
    'neighbors': {
      name: 'Propriedades Lindeiras',
      component: NeighborsScreen,
      stepper: Stepper08
    },
    'report': {
      name: 'Geração e Submissão do Laudo',
      component: ReportGenerationScreen,
      stepper: Stepper09
    }
  };

  const screenSequence = ['identification', 'photos', 'map', 'neighbors', 'report'];
  const currentIndex = screenSequence.indexOf(currentScreen);
  const currentScreenData = screens[currentScreen];
  const CurrentComponent = currentScreenData?.component;
  const CurrentStepper = currentScreenData?.stepper;

  const handleNext = () => {
    if (currentIndex < screenSequence.length - 1) {
      setCurrentScreen(screenSequence[currentIndex + 1]);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentScreen(screenSequence[currentIndex - 1]);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <NavigationBar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Stepper de Progresso */}
        {CurrentStepper && (
          <div className="mb-8">
            <CurrentStepper currentStep={screenSequence.indexOf(currentScreen) + 1} />
          </div>
        )}

        {/* Conteúdo da Tela Atual */}
        {CurrentComponent && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {currentScreenData.name}
            </h1>
            <div className="border-b-2 border-orange-500 mb-8"></div>
            <CurrentComponent
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirstScreen={currentIndex === 0}
              isLastScreen={currentIndex === screenSequence.length - 1}
            />
          </div>
        )}

        {/* Botões de Navegação */}
        <div className="flex justify-between items-center mt-8 pb-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            ← Anterior
          </button>

          <div className="text-center">
            <p className="text-gray-700 font-semibold">
              Tela {currentIndex + 1} de {screenSequence.length}
            </p>
            {laudoData.reference && (
              <p className="text-sm text-gray-600 mt-1">
                Ref: <strong>{laudoData.reference}</strong>
              </p>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === screenSequence.length - 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentIndex === screenSequence.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Próximo →
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * App principal com gerenciamento de estado e login
 */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0b1220]">
        <VickzLoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

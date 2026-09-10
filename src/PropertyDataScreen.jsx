import React, { useState } from 'react';
import Header from './Header';
import Stepper from './Stepper';
import PropertyForm from './PropertyForm';
import NavigationBar from './NavigationBar';

export default function PropertyDataScreen() {
  const [activeTab, setActiveTab] = useState('obra');

  const handleNavigate = (screen) => {
    setActiveTab(screen);
    console.log(`Navigating to: ${screen}`);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Header */}
      <Header />

      {/* Stepper */}
      <Stepper />

      {/* Content */}
      <PropertyForm />

      {/* Navigation Bar */}
      <NavigationBar activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}

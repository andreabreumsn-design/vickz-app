import React, { useState } from 'react';
import Header from './Header';
import Banner from './Banner';
import QuickActions from './QuickActions';
import EngineerCard from './EngineerCard';
import KPICards from './KPICards';
import SystemStatus from './SystemStatus';
import OperationalModules from './OperationalModules';
import NormsResources from './NormsResources';
import NavigationBar from './NavigationBar';

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('dash');

  const handleNavigate = (screen) => {
    setActiveTab(screen);
    console.log(`Navigating to: ${screen}`);
    // Aqui você pode integrar com um router (React Router, Next.js, etc)
    // navigate(`/${screen}`);
  };

  return (
    <div className="bg-[#F4F6F8] min-h-screen pb-24">
      {/* Header */}
      <Header />

      {/* Banner Hero */}
      <Banner />

      {/* Content Wrapper */}
      <div className="max-w-[430px] mx-auto">
        {/* Quick Actions */}
        <QuickActions />

        {/* Engineer Responsible Card */}
        <EngineerCard />

        {/* KPI Cards */}
        <KPICards />

        {/* System Status */}
        <SystemStatus />

        {/* Operational Modules */}
        <OperationalModules onNavigate={handleNavigate} />

        {/* Norms & Resources */}
        <NormsResources />

        {/* Spacing for navigation bar */}
        <div className="h-8"></div>
      </div>

      {/* Navigation Bar */}
      <NavigationBar activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}

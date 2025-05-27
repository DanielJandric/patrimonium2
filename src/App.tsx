// Optimized version of App.tsx with reduced memory usage
import React, { useState, useEffect, lazy, Suspense } from 'react';
import './index.css';

// Lazy load components to reduce initial memory usage
const ResumeExecutif = lazy(() => import('./components/ResumeExecutif'));
const ImpactIAEnergie = lazy(() => import('./components/ImpactIAEnergie'));
const Repartition = lazy(() => import('./components/Repartition'));
const Apercu = lazy(() => import('./components/Apercu'));
const CompteInvestisseur = lazy(() => import('./components/CompteInvestisseur'));
const DonneesFonds = lazy(() => import('./components/DonneesFonds'));
const Durabilite = lazy(() => import('./components/Durabilite'));

// --- Main Application Component ---
function App() {
  const [activeTab, setActiveTab] = useState('resume_executif');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => document.querySelectorAll('.animate-on-scroll').forEach(el => observer.unobserve(el));
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  // Define tabs
  const tabs = [
    { id: 'resume_executif', label: 'Résumé Exécutif', icon: '📊' },
    { id: 'impact_ia_energie', label: 'Impact IA & Énergie', icon: '⚡' },
    { id: 'repartition', label: 'Répartition', icon: '🔄' },
    { id: 'apercu', label: 'Aperçu', icon: '👁️' },
    { id: 'compte_investisseur', label: 'Compte Investisseur', icon: '💰' },
    { id: 'donnees_fonds', label: 'Données du Fonds', icon: '📈' },
    { id: 'durabilite', label: 'Durabilité', icon: '🌱' }
  ];

  const mainTabs = tabs.slice(0, 4);
  const moreTabs = tabs.slice(4);

  // Map tab IDs to components
  const renderTabContent = () => {
    return (
      <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>}>
        {activeTab === 'resume_executif' && <ResumeExecutif />}
        {activeTab === 'impact_ia_energie' && <ImpactIAEnergie />}
        {activeTab === 'repartition' && <Repartition />}
        {activeTab === 'apercu' && <Apercu />}
        {activeTab === 'compte_investisseur' && <CompteInvestisseur />}
        {activeTab === 'donnees_fonds' && <DonneesFonds />}
        {activeTab === 'durabilite' && <Durabilite />}
      </Suspense>
    );
  };

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Desktop Navigation */}
      {!isMobile && (
        <nav className="navbar sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="font-bold text-xl text-primary">Patrimonium</span>
              </div>
              <div className="flex space-x-4">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`tab-button px-3 py-2 rounded-md text-sm font-medium ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className={`pt-4 pb-24 ${isMobile ? 'pb-20' : ''}`}>
        {renderTabContent()}
      </main>

      {/* Mobile Navigation */}
      {isMobile && (
        <nav className="mobile-nav shadow-lg">
          {mainTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`mobile-nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="mobile-nav-icon">{tab.icon}</span>
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
          <div className="relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`mobile-nav-item ${moreTabs.some(tab => tab.id === activeTab) ? 'active' : ''}`}
            >
              <span className="mobile-nav-icon">➕</span>
              <span className="text-xs">Plus</span>
            </button>
            {mobileMenuOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                {moreTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`block w-full text-left px-4 py-2 text-sm ${activeTab === tab.id ? 'bg-gray-100 text-primary' : 'text-gray-700'} hover:bg-gray-50`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}

export default App;

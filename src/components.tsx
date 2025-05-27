import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Interface pour les données financières
interface FinancialData {
  investissementInitial: number;
  valeurActuelle: number;
  rendementPourcentage: number;
  rendementAnnualise: number;
  premiereDistribution: number;
}

// Interface pour les données de répartition
interface AllocationData {
  name: string;
  value: number;
}

// Composant pour le Résumé Exécutif
export const ResumeExecutif: React.FC<{ financialData: FinancialData }> = ({ financialData }) => {
  // Données pour les cartes du résumé exécutif
  const execSummaryCards = [
    {
      title: "Capital Investi",
      value: new Intl.NumberFormat('fr-FR').format(financialData.investissementInitial) + " €",
      subtitle: "Sur 1 500 000 € engagés",
      description: "65,4% du capital engagé a été appelé à ce jour",
      color: "bg-gradient-to-br from-primary to-primary-dark"
    },
    {
      title: "Valeur Actuelle",
      value: new Intl.NumberFormat('fr-FR').format(financialData.valeurActuelle) + " €",
      subtitle: "Au 31 décembre 2024",
      description: "Combinaison de performance et de nouveaux investissements",
      color: "bg-gradient-to-br from-secondary to-secondary-dark"
    },
    {
      title: "Rendement Total",
      value: "+" + financialData.rendementPourcentage.toFixed(1) + "%",
      subtitle: "Depuis l'investissement initial",
      description: "Soit environ " + financialData.rendementAnnualise.toFixed(1) + "% annualisé",
      color: "bg-gradient-to-br from-accent to-accent-dark"
    },
    {
      title: "Première Distribution",
      value: new Intl.NumberFormat('fr-FR').format(financialData.premiereDistribution) + " €",
      subtitle: "Reçue en octobre 2024",
      description: "Représente 5% du capital appelé",
      color: "bg-gradient-to-br from-primary-light to-primary"
    },
    {
      title: "Perspectives",
      value: "PCIOF II",
      subtitle: "Lancement T4 2024",
      description: "TRI cible de 10-12%, stratégie plus orientée vers les plus-values",
      color: "bg-gradient-to-br from-accent-dark to-accent"
    },
    {
      title: "Performance vs Fonds",
      value: "TVPI 1,15x",
      subtitle: "Supérieur au TVPI du fonds (1,12x)",
      description: "Investissement performant par rapport à la moyenne",
      color: "bg-gradient-to-br from-secondary-dark to-secondary"
    }
  ];

  // Données pour le graphique d'évolution de la NAV
  const navData = [
    { date: 'Déc 2023', nav: 634746 },
    { date: 'Mars 2024', nav: 704872 },
    { date: 'Juin 2024', nav: 850000 },
    { date: 'Sept 2024', nav: 980000 },
    { date: 'Déc 2024', nav: 1118231 },
  ];

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">
        Résumé Exécutif - Performance de Stéphane Bonvin
      </h2>
      
      {/* Cartes de résumé exécutif avec effet 3D */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {execSummaryCards.map((card, index) => (
          <div 
            key={index} 
            className={`card-colored ${card.color} transform hover:-translate-y-1`}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <h3 className="font-semibold text-base md:text-lg mb-2">{card.title}</h3>
            <p className="text-xl md:text-2xl font-bold">{card.value}</p>
            <p className="font-medium text-white text-opacity-90">{card.subtitle}</p>
            <p className="text-sm mt-2 text-white text-opacity-80">{card.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 card">
        <h3 className="text-lg md:text-xl font-semibold text-primary mb-3 md:mb-4">
          Évolution de l'Investissement
        </h3>
        <div style={{ height: isMobile ? '200px' : '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={navData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E4B7A" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1E4B7A" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: isMobile ? 10 : 12 }} />
              <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
              <Tooltip 
                formatter={(value) => {
                  if (typeof value === 'number') {
                    return new Intl.NumberFormat('fr-FR').format(value) + ' €';
                  }
                  return String(value);
                }} 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="nav" 
                stroke="#1E4B7A" 
                fill="url(#navGradient)" 
                strokeWidth={2}
                isAnimationActive={true}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-6 card">
        <h3 className="text-lg md:text-xl font-semibold text-primary mb-3 md:mb-4">
          Prochaines Étapes
        </h3>
        <div className="space-y-3">
          <div className="p-3 border-l-4 border-primary bg-neutral-light rounded transition-all duration-300 hover:shadow-md">
            <h4 className="font-medium text-primary">Capital Restant à Appeler</h4>
            <p className="text-text-dark mt-1">518 587 € (34,6% de l'engagement total) restent à appeler, permettant de participer aux futures opportunités d'investissement.</p>
          </div>
          <div className="p-3 border-l-4 border-secondary bg-neutral-light rounded transition-all duration-300 hover:shadow-md">
            <h4 className="font-medium text-secondary">Distributions Futures</h4>
            <p className="text-text-dark mt-1">Les actifs plus matures du portefeuille devraient générer des distributions régulières, comme celle d'octobre 2024.</p>
          </div>
          <div className="p-3 border-l-4 border-accent bg-neutral-light rounded transition-all duration-300 hover:shadow-md">
            <h4 className="font-medium text-accent">Opportunité PCIOF II</h4>
            <p className="text-text-dark mt-1">Le fonds successeur PCIOF II a été lancé au T4 2024, avec un TRI cible de 10-12% et une stratégie plus orientée vers les plus-values.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour l'Impact IA & Énergie
export const ImpactIAEnergie: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  
  // Données des sociétés par secteur
  const companiesBySector = {
    "Énergies Renouvelables": [
      {
        name: "SolarTech Solutions",
        ai_impact: "Modéré",
        energy_needs: "Faibles",
        ai_opportunity: "Optimisation de la production",
        sector: "Énergies Renouvelables",
        vehicle: "PCIOF I",
        key_characteristics: "Leader européen des panneaux solaires haute efficacité",
        strategic_position: "Expansion en Europe du Sud",
        exit_scenario: "IPO prévu en 2026",
        market_cap: "N/A (non coté)"
      },
      {
        name: "WindPower Innovations",
        ai_impact: "Faible",
        energy_needs: "Modérés",
        ai_opportunity: "Maintenance prédictive",
        sector: "Énergies Renouvelables",
        vehicle: "PCIOF I",
        key_characteristics: "Exploitant de parcs éoliens offshore",
        strategic_position: "Leader sur la Mer du Nord",
        exit_scenario: "Vente stratégique",
        market_cap: "N/A (non coté)"
      }
    ],
    "Infrastructure Digitale": [
      {
        name: "DataCenter Global",
        ai_impact: "Élevé",
        energy_needs: "Très élevés",
        ai_opportunity: "Optimisation énergétique critique",
        sector: "Infrastructure Digitale",
        vehicle: "PCIOF I",
        key_characteristics: "Réseau de centres de données verts",
        strategic_position: "Expansion en Scandinavie",
        exit_scenario: "Vente à un opérateur majeur",
        market_cap: "N/A (non coté)"
      },
      {
        name: "CloudEdge Solutions",
        ai_impact: "Très élevé",
        energy_needs: "Élevés",
        ai_opportunity: "Cœur de métier",
        sector: "Infrastructure Digitale",
        vehicle: "Co-investissement",
        key_characteristics: "Infrastructure edge computing",
        strategic_position: "Déploiement urbain européen",
        exit_scenario: "Acquisition par un géant tech",
        market_cap: "N/A (non coté)"
      }
    ],
    "Transport & Mobilité": [
      {
        name: "E-Fleet Management",
        ai_impact: "Modéré",
        energy_needs: "Modérés",
        ai_opportunity: "Optimisation des itinéraires",
        sector: "Transport & Mobilité",
        vehicle: "PCIOF I",
        key_characteristics: "Gestion de flottes électriques B2B",
        strategic_position: "Leader en France et Benelux",
        exit_scenario: "Vente stratégique",
        market_cap: "N/A (non coté)"
      }
    ],
    "Stockage d'Énergie": [
      {
        name: "BatteryTech Solutions",
        ai_impact: "Modéré",
        energy_needs: "Faibles",
        ai_opportunity: "R&D matériaux",
        sector: "Stockage d'Énergie",
        vehicle: "PCIOF I",
        key_characteristics: "Batteries stationnaires grande capacité",
        strategic_position: "Partenariats avec utilities",
        exit_scenario: "IPO ou vente industrielle",
        market_cap: "N/A (non coté)"
      }
    ]
  };

  // Modal pour les détails de la société
  const CompanyDetailModal = ({ company, onClose }: { company: any, onClose: () => void }) => {
    if (!company) return null;
    
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="text-xl font-bold text-primary mb-4">{company.name}</h3>
          <div className="space-y-3 text-sm">
            <p><strong className="text-primary-dark">Secteur:</strong> {company.sector}</p>
            <p><strong className="text-primary-dark">Véhicule:</strong> {company.vehicle}</p>
            <p><strong className="text-primary-dark">Caractéristiques Clés:</strong> {company.key_characteristics}</p>
            <p><strong className="text-primary-dark">Positionnement Stratégique:</strong> {company.strategic_position}</p>
            <p><strong className="text-primary-dark">Scénario d'Exit Probable:</strong> {company.exit_scenario}</p>
            <p><strong className="text-primary-dark">Impact IA:</strong> {company.ai_impact}</p>
            <p><strong className="text-primary-dark">Besoins Énergétiques:</strong> {company.energy_needs}</p>
            <p><strong className="text-primary-dark">Opportunité IA:</strong> {company.ai_opportunity}</p>
            {company.market_cap && <p><strong className="text-primary-dark">Capitalisation Boursière:</strong> {company.market_cap}</p>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">
        Impact IA &amp; Besoins Énergétiques (Sociétés &gt;70% du Portefeuille)
      </h2>
      <p className="text-sm text-text-light mb-6">Analyse de l'exposition à l'intelligence artificielle et des besoins énergétiques des principales sociétés du portefeuille. Cliquez sur une société pour afficher les détails.</p>
      
      {Object.entries(companiesBySector).map(([sector, companies], sectorIndex) => (
        <div key={sector} className="mb-8" style={{ animationDelay: `${sectorIndex * 200}ms` }}>
          <h3 className="text-lg md:text-xl font-semibold text-primary-dark mb-3 border-b-2 border-primary-light pb-2">
            {sector}
          </h3>
          <div className="table-container">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="table-header">Société</th>
                  <th scope="col" className="table-header">Impact IA</th>
                  <th scope="col" className="table-header">Besoins Énergétiques</th>
                  <th scope="col" className="table-header">Opportunité IA</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {companies.map((company, index) => (
                  <tr 
                    key={index} 
                    className="transition-colors duration-200 hover:bg-neutral-light cursor-pointer touch-feedback"
                    onClick={() => setSelectedCompany(company)}
                  >
                    <td className="table-cell font-medium text-gray-900">{company.name}</td>
                    <td className="table-cell text-gray-500">{company.ai_impact}</td>
                    <td className="table-cell text-gray-500">{company.energy_needs}</td>
                    <td className="table-cell text-gray-500">{company.ai_opportunity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      
      {/* Modal pour les détails de la société */}
      {selectedCompany && (
        <CompanyDetailModal 
          company={selectedCompany} 
          onClose={() => setSelectedCompany(null)} 
        />
      )}
    </div>
  );
};

// Composant pour la Répartition
export const Repartition: React.FC = () => {
  // Données pour les graphiques en donut
  const currencyData: AllocationData[] = [
    { name: 'EUR', value: 65 },
    { name: 'USD', value: 20 },
    { name: 'GBP', value: 10 },
    { name: 'Autres', value: 5 }
  ];
  
  const investmentTypeData: AllocationData[] = [
    { name: 'Primaires', value: 55 },
    { name: 'Co-investissements', value: 30 },
    { name: 'Secondaires', value: 15 }
  ];
  
  const riskProfileData: AllocationData[] = [
    { name: 'Core', value: 40 },
    { name: 'Core+', value: 45 },
    { name: 'Value-add', value: 15 }
  ];
  
  const sectorData: AllocationData[] = [
    { name: 'Énergies Renouvelables', value: 35 },
    { name: 'Infrastructure Digitale', value: 25 },
    { name: 'Transport & Mobilité', value: 20 },
    { name: 'Stockage d\'Énergie', value: 15 },
    { name: 'Autres', value: 5 }
  ];
  
  const COLORS = ['#1E4B7A', '#4CAF50', '#FF9800', '#E91E63', '#9C27B0', '#607D8B'];
  
  const isMobile = window.innerWidth <= 768;
  
  // Fonction pour le rendu des labels dans les graphiques donut
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    index, 
    name 
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
    name: string;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (isMobile) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="#333333" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">
        Répartition de l'Investissement
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-3">Répartition par Devises</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currencyData}
                  cx="50%"
                  cy="50%"
                  labelLine={!isMobile}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {currencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-3">Répartition par Type d'Investissement</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={investmentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={!isMobile}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {investmentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-3">Répartition par Profil de Risque</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskProfileData}
                  cx="50%"
                  cy="50%"
                  labelLine={!isMobile}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskProfileData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-primary mb-3">Répartition Sectorielle</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={!isMobile}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour l'Aperçu
export const Apercu: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">
        Aperçu du Fonds
      </h2>
      
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Patrimonium Climate Infrastructure Opportunity Fund</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2"><strong>Stratégie:</strong> Investissements dans des infrastructures liées à la transition énergétique et climatique</p>
            <p className="mb-2"><strong>Taille du fonds:</strong> 250 millions d'euros</p>
            <p className="mb-2"><strong>Année de lancement:</strong> 2021</p>
            <p className="mb-2"><strong>Durée:</strong> 10 ans (+ 2 ans d'extension possible)</p>
          </div>
          <div>
            <p className="mb-2"><strong>TRI cible:</strong> 8-10%</p>
            <p className="mb-2"><strong>Rendement courant cible:</strong> 4-6%</p>
            <p className="mb-2"><strong>Nombre d'investissements:</strong> 12 (cible: 15-20)</p>
            <p className="mb-2"><strong>Capital déployé:</strong> 65%</p>
          </div>
        </div>
      </div>
      
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Performance du Fonds</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Indicateur</th>
                <th scope="col" className="table-header">Valeur</th>
                <th scope="col" className="table-header">Benchmark</th>
                <th scope="col" className="table-header">Différence</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="table-cell font-medium">TVPI</td>
                <td className="table-cell">1,12x</td>
                <td className="table-cell">1,08x</td>
                <td className="table-cell text-secondary">+0,04x</td>
              </tr>
              <tr>
                <td className="table-cell font-medium">DPI</td>
                <td className="table-cell">0,05x</td>
                <td className="table-cell">0,03x</td>
                <td className="table-cell text-secondary">+0,02x</td>
              </tr>
              <tr>
                <td className="table-cell font-medium">TRI Net</td>
                <td className="table-cell">7,2%</td>
                <td className="table-cell">6,5%</td>
                <td className="table-cell text-secondary">+0,7%</td>
              </tr>
              <tr>
                <td className="table-cell font-medium">Rendement Courant</td>
                <td className="table-cell">3,8%</td>
                <td className="table-cell">3,5%</td>
                <td className="table-cell text-secondary">+0,3%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold text-primary mb-3">Faits Marquants 2024</h3>
        <ul className="space-y-2">
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">T1 2024:</span> Acquisition d'une participation dans un portefeuille de stockage d'énergie en Allemagne
          </li>
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">T2 2024:</span> Expansion du parc solaire en Espagne, ajout de 25MW de capacité
          </li>
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">T3 2024:</span> Première distribution aux investisseurs suite à un refinancement partiel
          </li>
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">T4 2024:</span> Lancement du fonds successeur PCIOF II avec un objectif de 350M€
          </li>
        </ul>
      </div>
    </div>
  );
};

// Composant pour le Compte Investisseur
export const CompteInvestisseur: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">
        Compte Investisseur - Stéphane Bonvin
      </h2>
      
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Résumé du Compte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2"><strong>Engagement total:</strong> 1 500 000 €</p>
            <p className="mb-2"><strong>Capital appelé:</strong> 981 413 € (65,4%)</p>
            <p className="mb-2"><strong>Capital restant à appeler:</strong> 518 587 € (34,6%)</p>
            <p className="mb-2"><strong>Distributions reçues:</strong> 49 000 €</p>
          </div>
          <div>
            <p className="mb-2"><strong>Valeur actuelle (NAV):</strong> 1 118 231 €</p>
            <p className="mb-2"><strong>TVPI:</strong> 1,15x</p>
            <p className="mb-2"><strong>DPI:</strong> 0,05x</p>
            <p className="mb-2"><strong>TRI Net:</strong> 8,1%</p>
          </div>
        </div>
      </div>
      
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Historique des Appels de Capital</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Date</th>
                <th scope="col" className="table-header">Montant</th>
                <th scope="col" className="table-header">% de l'Engagement</th>
                <th scope="col" className="table-header">Objectif</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="table-cell">15/03/2021</td>
                <td className="table-cell">300 000 €</td>
                <td className="table-cell">20,0%</td>
                <td className="table-cell">Premier closing</td>
              </tr>
              <tr>
                <td className="table-cell">10/09/2021</td>
                <td className="table-cell">225 000 €</td>
                <td className="table-cell">15,0%</td>
                <td className="table-cell">Acquisition portefeuille solaire</td>
              </tr>
              <tr>
                <td className="table-cell">22/04/2022</td>
                <td className="table-cell">187 500 €</td>
                <td className="table-cell">12,5%</td>
                <td className="table-cell">Co-investissement éolien</td>
              </tr>
              <tr>
                <td className="table-cell">08/11/2023</td>
                <td className="table-cell">150 000 €</td>
                <td className="table-cell">10,0%</td>
                <td className="table-cell">Infrastructure digitale</td>
              </tr>
              <tr>
                <td className="table-cell">14/06/2024</td>
                <td className="table-cell">118 913 €</td>
                <td className="table-cell">7,9%</td>
                <td className="table-cell">Stockage d'énergie</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold text-primary mb-3">Historique des Distributions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Date</th>
                <th scope="col" className="table-header">Montant</th>
                <th scope="col" className="table-header">Type</th>
                <th scope="col" className="table-header">Source</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="table-cell">05/10/2024</td>
                <td className="table-cell">49 000 €</td>
                <td className="table-cell">Dividende</td>
                <td className="table-cell">Refinancement partiel portefeuille solaire</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Composant pour les Données du Fonds
export const DonneesFonds: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">
        Données du Fonds
      </h2>
      
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Informations Générales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2"><strong>Nom du fonds:</strong> Patrimonium Climate Infrastructure Opportunity Fund</p>
            <p className="mb-2"><strong>Structure juridique:</strong> SICAV-RAIF (Luxembourg)</p>
            <p className="mb-2"><strong>Date de lancement:</strong> Janvier 2021</p>
            <p className="mb-2"><strong>Durée:</strong> 10 ans + 2 ans d'extension possible</p>
          </div>
          <div>
            <p className="mb-2"><strong>Gestionnaire:</strong> Patrimonium Asset Management AG</p>
            <p className="mb-2"><strong>Dépositaire:</strong> Banque Européenne d'Investissement</p>
            <p className="mb-2"><strong>Auditeur:</strong> PricewaterhouseCoopers</p>
            <p className="mb-2"><strong>Conseiller juridique:</strong> Allen & Overy</p>
          </div>
        </div>
      </div>
      
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Stratégie d'Investissement</h3>
        <p className="mb-3">Le fonds investit dans des infrastructures liées à la transition énergétique et climatique en Europe, avec un focus sur:</p>
        <ul className="space-y-2 mb-3">
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">Énergies renouvelables:</span> Solaire, éolien, hydroélectrique, biomasse
          </li>
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">Efficacité énergétique:</span> Réseaux intelligents, chauffage urbain, cogénération
          </li>
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">Stockage d'énergie:</span> Batteries, hydrogène, stockage thermique
          </li>
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">Mobilité durable:</span> Infrastructures de recharge, flottes électriques
          </li>
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">Infrastructure digitale verte:</span> Centres de données à faible empreinte carbone
          </li>
        </ul>
        <p>Le fonds vise un équilibre entre actifs opérationnels générant des revenus stables et projets en développement offrant un potentiel de plus-value.</p>
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold text-primary mb-3">Équipe de Gestion</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-3 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-primary">Jean Dupont</h4>
            <p className="text-sm text-gray-500 mb-2">Directeur des Investissements</p>
            <p className="text-sm">25 ans d'expérience dans les infrastructures énergétiques. Ancien directeur chez EDF Renewables et Meridiam.</p>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-primary">Marie Laurent</h4>
            <p className="text-sm text-gray-500 mb-2">Directrice de Portefeuille</p>
            <p className="text-sm">18 ans d'expérience dans la gestion d'actifs d'infrastructure. Spécialiste des énergies renouvelables.</p>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-primary">Thomas Schmidt</h4>
            <p className="text-sm text-gray-500 mb-2">Responsable ESG</p>
            <p className="text-sm">12 ans d'expérience en analyse d'impact environnemental et social. Expert en taxonomie européenne.</p>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-primary">Sophie Müller</h4>
            <p className="text-sm text-gray-500 mb-2">Directrice des Opérations</p>
            <p className="text-sm">15 ans d'expérience en gestion opérationnelle d'actifs d'infrastructure et optimisation de performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour la Durabilité
export const Durabilite: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">
        Durabilité et Impact ESG
      </h2>
      
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Indicateurs d'Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-neutral-light rounded-lg text-center">
            <div className="text-3xl font-bold text-secondary mb-2">1,2M</div>
            <p className="text-sm">Tonnes de CO₂ évitées par an</p>
          </div>
          <div className="p-4 bg-neutral-light rounded-lg text-center">
            <div className="text-3xl font-bold text-secondary mb-2">850K</div>
            <p className="text-sm">Foyers alimentés en énergie renouvelable</p>
          </div>
          <div className="p-4 bg-neutral-light rounded-lg text-center">
            <div className="text-3xl font-bold text-secondary mb-2">1 250</div>
            <p className="text-sm">Emplois créés ou soutenus</p>
          </div>
        </div>
      </div>
      
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Alignement avec les ODD</h3>
        <p className="mb-3">Le fonds contribue principalement aux Objectifs de Développement Durable suivants:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 border border-gray-200 rounded-lg text-center">
            <div className="font-bold text-primary mb-1">ODD 7</div>
            <p className="text-sm">Énergie propre et d'un coût abordable</p>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg text-center">
            <div className="font-bold text-primary mb-1">ODD 9</div>
            <p className="text-sm">Industrie, innovation et infrastructure</p>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg text-center">
            <div className="font-bold text-primary mb-1">ODD 11</div>
            <p className="text-sm">Villes et communautés durables</p>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg text-center">
            <div className="font-bold text-primary mb-1">ODD 13</div>
            <p className="text-sm">Mesures relatives à la lutte contre les changements climatiques</p>
          </div>
        </div>
      </div>
      
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Classification SFDR</h3>
        <div className="p-4 bg-neutral-light rounded-lg">
          <p className="mb-2"><strong>Article 9</strong> - Produit ayant pour objectif l'investissement durable</p>
          <p className="text-sm">Le fonds a un objectif d'investissement durable au sens du règlement SFDR et investit dans des activités économiques qui contribuent à un objectif environnemental, mesuré par exemple par des indicateurs clés en matière d'utilisation efficace des ressources concernant l'utilisation d'énergie, d'énergies renouvelables, de matières premières, d'eau et de terres.</p>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold text-primary mb-3">Initiatives ESG</h3>
        <ul className="space-y-2">
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">Reporting d'impact annuel</span> - Publication d'un rapport détaillé sur les impacts environnementaux et sociaux du portefeuille
          </li>
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">Engagement communautaire</span> - Programmes de soutien aux communautés locales autour des sites d'infrastructure
          </li>
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">Diversité et inclusion</span> - Objectifs de diversité pour les équipes de gestion des actifs et les conseils d'administration
          </li>
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">Taxonomie européenne</span> - Alignement progressif du portefeuille avec les critères de la taxonomie européenne
          </li>
          <li className="p-2 bg-neutral-light rounded">
            <span className="font-medium">Net Zero Asset Managers Initiative</span> - Engagement à atteindre la neutralité carbone d'ici 2050
          </li>
        </ul>
      </div>
    </div>
  );
};

// Structure de base de l'application
function App() {
  // État pour gérer l'onglet actif
  const [activeTab, setActiveTab] = useState('resume');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Données financières
  const financialData: FinancialData = {
    investissementInitial: 981413,
    valeurActuelle: 1118231,
    rendementPourcentage: 13.9,
    rendementAnnualise: 4.0,
    premiereDistribution: 49000
  };

  // Effet pour détecter les changements de taille d'écran
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fonction pour changer d'onglet
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-neutral">
      {/* Header avec espacement correct */}
      <header className="header">
        <div className="container mx-auto px-4">
          <h1 className="text-xl md:text-3xl font-bold">Patrimonium Climate Infrastructure</h1>
          <p className="text-lg md:text-xl mt-1">Rapport de Synthèse - Stéphane Bonvin</p>
          <p className="text-sm md:text-base">31 décembre 2024</p>
        </div>
      </header>

      {/* Navigation avec onglets correctement espacés */}
      <nav className="container mx-auto px-4 mt-4">
        <div className="mobile-scroll-container border-b border-gray-200">
          <button 
            className={`nav-tab mobile-scroll-item ${activeTab === 'resume' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
            onClick={() => handleTabChange('resume')}
          >
            Résumé Exécutif
          </button>
          <button 
            className={`nav-tab mobile-scroll-item ${activeTab === 'ai_impact' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
            onClick={() => handleTabChange('ai_impact')}
          >
            Impact IA & Énergie
          </button>
          <button 
            className={`nav-tab mobile-scroll-item ${activeTab === 'breakdown' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
            onClick={() => handleTabChange('breakdown')}
          >
            Répartition
          </button>
          <button 
            className={`nav-tab mobile-scroll-item ${activeTab === 'apercu' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
            onClick={() => handleTabChange('apercu')}
          >
            Aperçu
          </button>
          <button 
            className={`nav-tab mobile-scroll-item ${activeTab === 'investisseur' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
            onClick={() => handleTabChange('investisseur')}
          >
            Compte Investisseur
          </button>
          <button 
            className={`nav-tab mobile-scroll-item ${activeTab === 'fonds' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
            onClick={() => handleTabChange('fonds')}
          >
            Données du Fonds
          </button>
          <button 
            className={`nav-tab mobile-scroll-item ${activeTab === 'durabilite' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
            onClick={() => handleTabChange('durabilite')}
          >
            Durabilité
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-6">
        {/* Affichage conditionnel des onglets */}
        {activeTab === 'resume' && <ResumeExecutif financialData={financialData} />}
        {activeTab === 'ai_impact' && <ImpactIAEnergie />}
        {activeTab === 'breakdown' && <Repartition />}
        {activeTab === 'apercu' && <Apercu />}
        {activeTab === 'investisseur' && <CompteInvestisseur />}
        {activeTab === 'fonds' && <DonneesFonds />}
        {activeTab === 'durabilite' && <Durabilite />}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary-dark to-primary text-white py-4 md:py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-lg md:text-xl font-bold">Patrimonium Climate Infrastructure Opportunity</h3>
              <p className="mt-1 md:mt-2">Rapport de Synthèse au 31 décembre 2024</p>
            </div>
            <div className="mt-3 md:mt-0">
              <p>© 2025 Patrimonium Asset Management AG</p>
              <p className="text-sm mt-1">Tous droits réservés</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

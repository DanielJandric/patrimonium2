import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import aiEnergyData from '../ai_energy_data.json';

const ImpactIAEnergie = () => {
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  const { title, subtitle, sectors } = aiEnergyData;
  
  // Define color constants for charts
  const COLORS = ['#2C3E50', '#D35400', '#7F8C8D', '#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6'];
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-gradient animate-on-scroll">{title}</h2>
      <p className="text-xl text-center mb-8 text-secondary animate-on-scroll">{subtitle}</p>
      
      {sectors.map((sector, sectorIndex) => (
        <div key={sectorIndex} className="mb-12 animate-on-scroll" style={{ '--delay': `${sectorIndex * 0.2}s` } as React.CSSProperties}>
          <h3 className="text-2xl font-bold mb-6 text-primary border-b-2 border-accent pb-2">{sector.name}</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sector.companies.map((company, companyIndex) => (
              <div 
                key={companyIndex} 
                className="chart-container hover:border-accent hover:border-2 cursor-pointer transition-all"
                onClick={() => setSelectedCompany(selectedCompany?.name === company.name ? null : company)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-primary">{company.name}</h4>
                    <p className="text-secondary">{company.country} | {company.sector}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    company.risk === 'Core' ? 'bg-green-100 text-green-800' : 
                    company.risk === 'Core+' ? 'bg-blue-100 text-blue-800' : 
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {company.risk}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-secondary">Investi</p>
                    <p className="text-lg font-semibold">{company.invested}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary">Participation</p>
                    <p className="text-lg font-semibold">{company.ownership}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary">Rendement</p>
                    <p className="text-lg font-semibold">{company.returns}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary">Impact IA</p>
                    <p className="text-lg font-semibold">{company.ia_impact.split(' - ')[0]}</p>
                  </div>
                </div>
                
                {selectedCompany?.name === company.name && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-on-scroll">
                    <h5 className="font-semibold mb-2">Impact IA & Besoins Énergétiques</h5>
                    <p className="mb-2"><span className="font-medium">Impact IA:</span> {company.ia_impact}</p>
                    <p className="mb-2"><span className="font-medium">Besoins Énergétiques:</span> {company.energy_needs}</p>
                    <p className="mb-4"><span className="font-medium">Opportunités:</span> {company.opportunities}</p>
                    <h5 className="font-semibold mb-2">Détails</h5>
                    <p className="text-sm">{company.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="chart-container animate-on-scroll">
        <h3 className="text-xl font-semibold mb-4">Impact de l'IA sur la Consommation Énergétique</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-2">Consommation par Secteur</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Centres de Données', value: 85 },
                  { name: 'Smart Grids', value: 35 },
                  { name: 'Énergies Renouvelables', value: 15 },
                  { name: 'Stockage', value: 45 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 62, 80, 0.1)" />
                  <XAxis dataKey="name" tick={{ fill: '#2C3E50' }} />
                  <YAxis tickFormatter={(value) => `${value} TWh`} tick={{ fill: '#2C3E50' }} />
                  <Tooltip formatter={(value: any) => [`${value} TWh`, 'Consommation']}/>
                  <Bar dataKey="value" fill="#D35400" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2">Projection de Croissance</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { year: '2022', value: 100 },
                  { year: '2023', value: 145 },
                  { year: '2024', value: 210 },
                  { year: '2025', value: 290 },
                  { year: '2026', value: 380 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 62, 80, 0.1)" />
                  <XAxis dataKey="year" tick={{ fill: '#2C3E50' }} />
                  <YAxis tickFormatter={(value) => `${value} TWh`} tick={{ fill: '#2C3E50' }} />
                  <Tooltip formatter={(value: any) => [`${value} TWh`, 'Consommation']}/>
                  <Line type="monotone" dataKey="value" stroke="#2C3E50" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactIAEnergie;

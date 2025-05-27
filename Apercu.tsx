import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import data from '../data.json';

const Apercu = () => {
  const { title, fund_overview, performance_metrics, portfolio_composition } = data.apercu;
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient animate-on-scroll">{title}</h2>
      
      <div className="chart-container animate-on-scroll mb-8">
        <h3 className="text-xl font-semibold mb-4">Aperçu du Fonds</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {Object.entries(fund_overview).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium capitalize">{key.replace(/_/g, ' ')}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="chart-container animate-on-scroll">
          <h3 className="text-xl font-semibold mb-4">Métriques de Performance</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(performance_metrics).map(([key, value]) => (
              <div key={key} className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm text-secondary uppercase">{key.toUpperCase()}</p>
                <p className="text-2xl font-bold text-primary">{value}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="chart-container animate-on-scroll">
          <h3 className="text-xl font-semibold mb-4">Composition du Portefeuille</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium">Investissements</span>
              <span>{portfolio_composition.investments}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium">Capital Engagé</span>
              <span>{portfolio_composition.committed_capital}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium">Capital Non Appelé</span>
              <span>{portfolio_composition.unfunded_capital}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="chart-container animate-on-scroll">
        <h3 className="text-xl font-semibold mb-4">Sociétés en Portefeuille</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio_composition.portfolio_companies.map((company, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <p className="font-medium text-primary">{company}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="chart-container animate-on-scroll mt-8">
        <h3 className="text-xl font-semibold mb-4">Évolution de la Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { quarter: 'Q1 2023', tvpi: 1.02, dpi: 0.00, rvpi: 1.02 },
              { quarter: 'Q2 2023', tvpi: 1.04, dpi: 0.00, rvpi: 1.04 },
              { quarter: 'Q3 2023', tvpi: 1.07, dpi: 0.00, rvpi: 1.07 },
              { quarter: 'Q4 2023', tvpi: 1.09, dpi: 0.00, rvpi: 1.09 },
              { quarter: 'Q1 2024', tvpi: 1.10, dpi: 0.00, rvpi: 1.10 },
              { quarter: 'Q2 2024', tvpi: 1.11, dpi: 0.02, rvpi: 1.09 },
              { quarter: 'Q3 2024', tvpi: 1.12, dpi: 0.05, rvpi: 1.07 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 62, 80, 0.1)" />
              <XAxis dataKey="quarter" tick={{ fill: '#2C3E50' }} />
              <YAxis tick={{ fill: '#2C3E50' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tvpi" name="TVPI" stroke="#2C3E50" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="dpi" name="DPI" stroke="#D35400" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="rvpi" name="RVPI" stroke="#7F8C8D" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Apercu;

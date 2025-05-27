import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import data from '../data.json';
import additionalData from '../additional_data.json';
import fundData from '../fund_data.json';

// --- Utility Functions ---
const formatCurrency = (value: number | string | undefined, currency = 'EUR') => {
  const num = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
  if (num === undefined || isNaN(num)) return '-';
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
};

const ResumeExecutif = () => {
  // Define color constants for charts
  const COLORS = ['#2C3E50', '#D35400', '#7F8C8D', '#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6'];
  const RISK_PROFILE_COLORS: { [key: string]: string } = {
    'Core': '#2ECC71',
    'Core+': '#3498DB',
    'Value-add': '#D35400'
  };

  const { cards, details } = data.resume_executif;
  const executifData = additionalData.resume_executif;
  const fundPortfolioData = fundData.fund_data?.portfolio_analysis || {};

  // Prepare data for charts
  const capitalData = executifData?.investment_analysis?.capital_evolution?.data?.map(item => ({
    date: item.date.split(' ')[0],
    amount: item.valeur
  })) || [];
  
  let cumulativeAmount = 0;
  const cumulativeData = capitalData.map(item => {
    cumulativeAmount += item.amount;
    return { ...item, cumulative: cumulativeAmount };
  });

  const sectorAllocationData = fundPortfolioData?.portfolio_composition?.by_sector?.map(item => ({
    name: item.sector,
    value: item.percentage
  })) || data.repartition.charts.sector.data;

  const riskProfileData = fundPortfolioData?.portfolio_composition?.by_risk_profile?.map(item => ({
    name: item.profile,
    value: item.percentage
  })) || data.repartition.charts.risk_profile.data;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient animate-on-scroll">
        {data.resume_executif.title}
      </h2>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {cards.map((card, index) => (
          <div
            key={index}
            className="metric-card animate-on-scroll"
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            <div className="metric-value">{card.value}</div>
            <div className="metric-label">{card.title}</div>
            <p className="text-sm mt-2 text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="chart-container animate-on-scroll">
          <h3 className="text-xl font-semibold mb-4">Évolution du Capital Investi</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cumulativeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 62, 80, 0.1)" />
                <XAxis dataKey="date" tick={{ fill: '#2C3E50' }} />
                <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fill: '#2C3E50' }} />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Capital Cumulé']}
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} 
                />
                <Area type="monotone" dataKey="cumulative" stroke="#D35400" fill="url(#colorGradient)" strokeWidth={2}/>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D35400" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D35400" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-container animate-on-scroll">
          <h3 className="text-xl font-semibold mb-4">Indicateurs de Performance</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.entries(details.performanceMetrics).map(([key, value], index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-opacity-20 bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="text-3xl font-bold text-primary">{value}</div>
                <div className="text-sm text-secondary">{key}</div>
              </div>
            ))}
          </div>
          <h4 className="text-lg font-semibold mb-2">Historique des Transactions</h4>
          <div className="overflow-auto max-h-60 custom-scrollbar">
            <table className="data-table min-w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th className="text-right">Montant</th>
                </tr>
              </thead>
              <tbody>
                {details.investmentHistory.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${item.type === 'Distribution' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className={`font-medium text-right ${item.amount < 0 ? 'text-green-600' : 'text-blue-600'}`}>
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="chart-container animate-on-scroll mb-12">
        <h3 className="text-xl font-semibold mb-4">Analyse de l'Investissement</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-2">Répartition Sectorielle</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={sectorAllocationData} 
                    cx="50%" 
                    cy="50%" 
                    labelLine={false} 
                    outerRadius={80} 
                    fill="#8884d8" 
                    dataKey="value" 
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sectorAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value.toFixed(1)}%`, 'Allocation']}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2">Profil de Risque</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskProfileData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 62, 80, 0.1)" />
                  <XAxis dataKey="name" tick={{ fill: '#2C3E50' }} />
                  <YAxis tickFormatter={(value) => `${value}%`} tick={{ fill: '#2C3E50' }} />
                  <Tooltip formatter={(value: any) => [`${value.toFixed(1)}%`, 'Allocation']}/>
                  <Bar dataKey="value" fill="#2C3E50">
                    {riskProfileData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={RISK_PROFILE_COLORS[entry.name] || '#2C3E50'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      <div className="chart-container animate-on-scroll">
        <h3 className="text-xl font-semibold mb-4">Commentaire du Gestionnaire</h3>
        <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-accent mb-4">
          <p className="italic text-gray-700">
            "Les infrastructures liées à la transition énergétique et numérique continuent de démontrer leur résilience face aux incertitudes macroéconomiques, offrant des rendements stables et une protection contre l'inflation."
          </p>
          <p className="text-right mt-2 text-secondary">
            — Jean Dupont, Directeur des Investissements
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            Le portefeuille a démontré une performance solide malgré un contexte de taux d'intérêt élevés, grâce à la qualité des actifs sous-jacents et à leur positionnement stratégique dans des secteurs en croissance.
          </p>
          <p className="text-gray-700">
            Les investissements dans les infrastructures numériques et les énergies renouvelables ont particulièrement contribué à la performance, avec des rendements supérieurs aux attentes initiales.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {executifData?.future_outlook?.market_trends?.trends?.map((point: string, i: number) => (
            <div key={i} className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center mr-3 mt-0.5">
                <span className="text-accent text-sm">✓</span>
              </div>
              <p className="text-gray-700">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeExecutif;

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import sustainabilityData from '../sustainability_data.json';

const Durabilite = () => {
  const { title, subtitle, metrics, impact_areas, sdg_alignment } = sustainabilityData;
  
  // Define color constants for charts
  const COLORS = ['#2C3E50', '#D35400', '#7F8C8D', '#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6'];
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-gradient animate-on-scroll">{title}</h2>
      <p className="text-xl text-center mb-8 text-secondary animate-on-scroll">{subtitle}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className="metric-card animate-on-scroll"
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.title}</div>
            <p className="text-sm mt-2 text-gray-600">{metric.description}</p>
          </div>
        ))}
      </div>
      
      <div className="chart-container animate-on-scroll mb-12">
        <h3 className="text-xl font-semibold mb-4">Domaines d'Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-2">Répartition des Impacts</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={impact_areas.map(area => ({ name: area.name, value: area.impact_score }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {impact_areas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`Score: ${value}`, 'Impact']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2">Scores d'Impact par Domaine</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impact_areas}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 62, 80, 0.1)" />
                  <XAxis dataKey="name" tick={{ fill: '#2C3E50' }} />
                  <YAxis tick={{ fill: '#2C3E50' }} />
                  <Tooltip formatter={(value: any) => [`Score: ${value}`, 'Impact']} />
                  <Bar dataKey="impact_score" fill="#D35400" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      <div className="chart-container animate-on-scroll mb-12">
        <h3 className="text-xl font-semibold mb-4">Alignement avec les ODD</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sdg_alignment.map((sdg, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary text-xl font-bold">{sdg.number}</span>
                </div>
                <h4 className="font-semibold text-primary">{sdg.name}</h4>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-secondary">Contribution</span>
                  <span className="text-sm font-medium">{sdg.contribution_level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-accent rounded-full h-2" 
                    style={{ width: `${sdg.contribution_percentage}%` }}
                  ></div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">{sdg.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="chart-container animate-on-scroll">
        <h3 className="text-xl font-semibold mb-4">Évolution de l'Impact Environnemental</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { year: '2020', co2: 100, water: 100, waste: 100 },
              { year: '2021', co2: 85, water: 90, waste: 88 },
              { year: '2022', co2: 70, water: 75, waste: 72 },
              { year: '2023', co2: 55, water: 65, waste: 60 },
              { year: '2024', co2: 45, water: 55, waste: 50 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 62, 80, 0.1)" />
              <XAxis dataKey="year" tick={{ fill: '#2C3E50' }} />
              <YAxis tickFormatter={(value) => `${value}%`} tick={{ fill: '#2C3E50' }} />
              <Tooltip formatter={(value: any) => [`${value}%`, 'Réduction']} />
              <Legend />
              <Line type="monotone" dataKey="co2" name="Émissions CO2" stroke="#2C3E50" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="water" name="Consommation d'Eau" stroke="#3498DB" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="waste" name="Production de Déchets" stroke="#D35400" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Durabilite;

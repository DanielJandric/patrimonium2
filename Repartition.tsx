import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import data from '../data.json';

const Repartition = () => {
  const { title, charts } = data.repartition;
  
  // Define color constants for charts
  const COLORS = ['#2C3E50', '#D35400', '#7F8C8D', '#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6'];
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient animate-on-scroll">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(charts).map(([key, chartData]: [string, any], index) => (
          <div key={key} className="chart-container animate-on-scroll" style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}>
            <h3 className="text-xl font-semibold mb-4">{chartData.title}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {index % 2 === 0 ? (
                  <PieChart>
                    <Pie
                      data={chartData.data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.data.map((entry: any, i: number) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value.toFixed(1)}%`, 'Allocation']} />
                  </PieChart>
                ) : (
                  <BarChart data={chartData.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 62, 80, 0.1)" />
                    <XAxis dataKey="name" tick={{ fill: '#2C3E50' }} />
                    <YAxis tickFormatter={(value) => `${value}%`} tick={{ fill: '#2C3E50' }} />
                    <Tooltip formatter={(value: any) => [`${value.toFixed(1)}%`, 'Allocation']} />
                    <Bar dataKey="value" fill="#D35400" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
      
      <div className="chart-container animate-on-scroll mt-8">
        <h3 className="text-xl font-semibold mb-4">Répartition Géographique</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={[
                { name: 'France', value: 30 },
                { name: 'Allemagne', value: 25 },
                { name: 'Italie', value: 15 },
                { name: 'Espagne', value: 10 },
                { name: 'Royaume-Uni', value: 8 },
                { name: 'États-Unis', value: 7 },
                { name: 'Autres', value: 5 }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 62, 80, 0.1)" />
              <XAxis type="number" tick={{ fill: '#2C3E50' }} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#2C3E50' }} />
              <Tooltip formatter={(value: any) => [`${value.toFixed(1)}%`, 'Allocation']} />
              <Bar dataKey="value" fill="#2C3E50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Repartition;

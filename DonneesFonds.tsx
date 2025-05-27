import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import fundData from '../fund_data.json';

const DonneesFonds = () => {
  const { title, fund_data } = fundData;
  
  // Format currency values
  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
    if (isNaN(num)) return '-';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient animate-on-scroll">{title}</h2>
      
      <div className="chart-container animate-on-scroll mb-8">
        <h3 className="text-xl font-semibold mb-4">Informations Générales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {Object.entries(fund_data.general_info).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium capitalize">{key.replace(/_/g, ' ')}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="chart-container animate-on-scroll mb-8">
        <h3 className="text-xl font-semibold mb-4">Bilan</h3>
        <div className="overflow-auto max-h-96 custom-scrollbar">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Poste</th>
                <th className="text-right">2023</th>
                <th className="text-right">2024</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-medium bg-primary/5">
                <td>Actifs</td>
                <td className="text-right">-</td>
                <td className="text-right">-</td>
              </tr>
              {fund_data.balance_sheet.assets.map((item, index) => (
                <tr key={`asset-${index}`}>
                  <td className="pl-6">{item.name}</td>
                  <td className="text-right">{formatCurrency(item.value_2023)}</td>
                  <td className="text-right">{formatCurrency(item.value_2024)}</td>
                </tr>
              ))}
              <tr className="font-medium bg-primary/5">
                <td>Passifs</td>
                <td className="text-right">-</td>
                <td className="text-right">-</td>
              </tr>
              {fund_data.balance_sheet.liabilities.map((item, index) => (
                <tr key={`liability-${index}`}>
                  <td className="pl-6">{item.name}</td>
                  <td className="text-right">{formatCurrency(item.value_2023)}</td>
                  <td className="text-right">{formatCurrency(item.value_2024)}</td>
                </tr>
              ))}
              <tr className="font-medium bg-primary/5">
                <td>Capitaux Propres</td>
                <td className="text-right">-</td>
                <td className="text-right">-</td>
              </tr>
              {fund_data.balance_sheet.equity.map((item, index) => (
                <tr key={`equity-${index}`}>
                  <td className="pl-6">{item.name}</td>
                  <td className="text-right">{formatCurrency(item.value_2023)}</td>
                  <td className="text-right">{formatCurrency(item.value_2024)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="chart-container animate-on-scroll mb-8">
        <h3 className="text-xl font-semibold mb-4">Compte de Résultat</h3>
        <div className="overflow-auto max-h-96 custom-scrollbar">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Poste</th>
                <th className="text-right">2023</th>
                <th className="text-right">2024</th>
              </tr>
            </thead>
            <tbody>
              {fund_data.income_statement.map((item, index) => (
                <tr key={`income-${index}`} className={item.is_total ? "font-medium bg-primary/5" : ""}>
                  <td className={item.is_total ? "" : "pl-6"}>{item.name}</td>
                  <td className="text-right">{formatCurrency(item.value_2023)}</td>
                  <td className="text-right">{formatCurrency(item.value_2024)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="chart-container animate-on-scroll mb-8">
        <h3 className="text-xl font-semibold mb-4">Flux de Trésorerie</h3>
        <div className="overflow-auto max-h-96 custom-scrollbar">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Poste</th>
                <th className="text-right">2023</th>
                <th className="text-right">2024</th>
              </tr>
            </thead>
            <tbody>
              {fund_data.cash_flow.map((item, index) => (
                <tr key={`cash-${index}`} className={item.is_total ? "font-medium bg-primary/5" : ""}>
                  <td className={item.is_total ? "" : "pl-6"}>{item.name}</td>
                  <td className="text-right">{formatCurrency(item.value_2023)}</td>
                  <td className="text-right">{formatCurrency(item.value_2024)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="chart-container animate-on-scroll">
        <h3 className="text-xl font-semibold mb-4">Évolution des Actifs Sous Gestion</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={fund_data.aum_evolution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(44, 62, 80, 0.1)" />
              <XAxis dataKey="year" tick={{ fill: '#2C3E50' }} />
              <YAxis tickFormatter={(value) => `${value}M €`} tick={{ fill: '#2C3E50' }} />
              <Tooltip formatter={(value: any) => [`${value}M €`, 'Actifs Sous Gestion']} />
              <Line type="monotone" dataKey="value" stroke="#2C3E50" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DonneesFonds;

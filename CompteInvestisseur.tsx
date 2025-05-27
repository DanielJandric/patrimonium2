import React from 'react';
import data from '../data.json';

const CompteInvestisseur = () => {
  const { title, investor, performance, transactions, capital_account } = data.compte_investisseur;
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient animate-on-scroll">{title}</h2>
      
      <div className="chart-container animate-on-scroll mb-8">
        <h3 className="text-xl font-semibold mb-4">Informations Investisseur</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {Object.entries(investor).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium capitalize">{key.replace(/_/g, ' ')}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(performance).map(([key, value]) => (
          <div key={key} className="chart-container animate-on-scroll">
            <p className="text-sm text-secondary uppercase">{key.toUpperCase()}</p>
            <p className="text-3xl font-bold text-primary">{value}</p>
            <p className="text-xs text-secondary mt-2">
              {key === 'dpi' ? 'Distributions / Capital Investi' : 
               key === 'rvpi' ? 'Valeur Résiduelle / Capital Investi' : 
               'Valeur Totale / Capital Investi'}
            </p>
          </div>
        ))}
      </div>
      
      <div className="chart-container animate-on-scroll mb-8">
        <h3 className="text-xl font-semibold mb-4">Historique des Transactions</h3>
        <div className="overflow-auto max-h-96 custom-scrollbar">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th className="text-right">Montant</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${transaction.type === 'Distribution' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td>{transaction.description}</td>
                  <td className={`font-medium text-right ${transaction.amount.startsWith('-') ? 'text-green-600' : 'text-blue-600'}`}>
                    {transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="chart-container animate-on-scroll">
        <h3 className="text-xl font-semibold mb-4">Compte Capital</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {Object.entries(capital_account).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium capitalize">{key.replace(/_/g, ' ')}</span>
              <span className={`${value.startsWith('-') ? 'text-red-600' : ''}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompteInvestisseur;

import React from 'react';

const ThresholdInput = ({ p, setP, q, setQ }) => {
  return (
    
    <div className="p-4 bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">3. Seuils de Décision</h2>
      <div className="flex gap-6">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Seuil de Concordance (p)</label>

          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={p}
            onChange={(e) => setP(parseFloat(e.target.value) || 0)}
            className="w-32 p-2 border rounded focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Seuil de Discordance (q)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={q}
            onChange={(e) => setQ(parseFloat(e.target.value) || 0)}
            className="w-32 p-2 border rounded focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ThresholdInput;
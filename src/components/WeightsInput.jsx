import React from 'react';

const WeightsInput = ({ weights, setWeights, types, setTypes }) => {
  
  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = parseFloat(value) || 0;
    setWeights(newWeights);
  };

  const handleTypeChange = (index, value) => {
    const newTypes = [...types];
    newTypes[index] = value;
    setTypes(newTypes);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">2. Poids et Types des Critères</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {weights.map((weight, idx) => (
          <div key={idx} className="p-3 border rounded flex flex-col gap-2 bg-gray-50">
            <span className="font-semibold text-blue-700">Critère {idx + 1}</span>
            
            <div className="flex items-center gap-2">
              <label className="text-sm">Poids :</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => handleWeightChange(idx, e.target.value)}
                className="w-20 p-1 border rounded"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm">Objectif :</label>
              <select
                value={types[idx]}
                onChange={(e) => handleTypeChange(idx, e.target.value)}
                className="p-1 border rounded bg-white"
              >
                <option value="max">Maximiser (↑)</option>
                <option value="min">Minimiser (↓)</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightsInput;
import React from 'react';

const MatrixInput = ({ matrix, setMatrix }) => {
  
  // Ajouter une alternative (ligne)
  const addAlternative = () => {
    const newRow = new Array(matrix[0].length).fill(0);
    setMatrix([...matrix, newRow]);
  };

  // Ajouter un critère (colonne)
  const addCriterion = () => {
    const newMatrix = matrix.map(row => [...row, 0]);
    setMatrix(newMatrix);
  };

  // Mettre à jour une cellule spécifique
  const handleCellChange = (rowIndex, colIndex, value) => {
    const newMatrix = matrix.map((row, rIdx) => 
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? parseFloat(value) || 0 : cell))
    );
    setMatrix(newMatrix);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">1. Matrice de Performances</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Alternatives</th>
              {matrix[0].map((_, idx) => (
                <th key={idx} className="border border-gray-300 p-2">Critère {idx + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rIdx) => (
              <tr key={rIdx}>
                <td className="border border-gray-300 p-2 font-medium">A{rIdx + 1}</td>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={cell}
                      onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                      className="w-full p-1 border rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex gap-2">
        <button 
          onClick={addAlternative}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Ajouter une Alternative
        </button>
        <button 
          onClick={addCriterion}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Ajouter un Critère
        </button>
      </div>
    </div>
  );
};

export default MatrixInput;
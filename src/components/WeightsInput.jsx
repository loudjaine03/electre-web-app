import React from 'react';

const WeightsInput = ({ weights, setWeights, types, setTypes }) => {
  // Calcul de la somme totale pour la normalisation (ex: 25 dans ton TD)
  const totalSum = weights.reduce((a, b) => a + b, 0) || 1;

  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    // On accepte les nombres décimaux
    newWeights[index] = value === '' ? 0 : parseFloat(value);
    setWeights(newWeights);
  };

  const handleTypeChange = (index, value) => {
    const newTypes = [...types];
    newTypes[index] = value;
    setTypes(newTypes);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h3 style={{ fontSize: '16px', color: '#1e3a5f', fontWeight: '700', marginBottom: '10px' }}>
        2. Poids et Types des Critères
      </h3>
      
      {weights.map((w, i) => (
        <div key={i} style={{ 
          padding: '15px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '12px', 
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ fontWeight: '700', color: '#64748b', fontSize: '13px' }}>CRITÈRE {i + 1}</div>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {/* Saisie du Poids */}
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#94a3b8', marginBottom: '5px' }}>
                POIDS (BRUT OU NORMALISÉ)
              </label>
              <input
                type="number"
                value={w}
                onChange={(e) => handleWeightChange(i, e.target.value)}
                style={{ 
                  width: '100%', padding: '8px', borderRadius: '6px', 
                  border: '1px solid #cbd5e1', outline: 'none' 
                }}
              />
              {/* Affichage de la normalisation en temps réel (ex: 0.12 ou 12%) */}
              <div style={{ marginTop: '5px', fontSize: '12px', color: '#2563eb', fontWeight: '600' }}>
                Poids relatif : {((w / totalSum) * 100).toFixed(1)}% 
                <span style={{ color: '#94a3b8', fontWeight: '400', marginLeft: '5px' }}>
                  (valeur : {(w / totalSum).toFixed(3)})
                </span>
              </div>
            </div>

            {/* Saisie du Sens (Objectif) */}
            <div style={{ width: '150px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#94a3b8', marginBottom: '5px' }}>
                OBJECTIF
              </label>
              <select
                value={types[i]}
                onChange={(e) => handleTypeChange(i, e.target.value)}
                style={{ 
                  width: '100%', padding: '8px', borderRadius: '6px', 
                  border: '1px solid #cbd5e1', cursor: 'pointer' 
                }}
              >
                <option value="max">Maximiser (↑)</option>
                <option value="min">Minimiser (↓)</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      {/* Info bulle pour expliquer la normalisation */}
      <div style={{ 
        marginTop: '10px', padding: '12px', backgroundColor: '#eff6ff', 
        borderRadius: '8px', border: '1px border #bfdbfe', color: '#1e40af', fontSize: '13px' 
      }}>
        ℹ️ <strong>Note :</strong> La somme actuelle est de <strong>{totalSum}</strong>. 
        Le système normalise automatiquement chaque critère par cette somme, comme dans la formule $W_j = w_j / \sum w_j$ du cours[cite: 170].
      </div>
    </div>
  );
};

export default WeightsInput;
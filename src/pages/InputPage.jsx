import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixInput from '../components/MatrixInput';
import WeightsInput from '../components/WeightsInput';
import ThresholdInput from '../components/ThresholdInput';
import { calculateElectreI } from '../logic/electre';

// ── Exemple pré-rempli : Choix de Fournisseur (Tes valeurs) ──
const EXAMPLE = {
  matrix: [
    [0.360, 0.190, 1.000, 0.400, 0.459, 0.667, 0.780],
    [0.040, 0.420, 0.800, 0.900, 0.726, 0.667, 0.700],
    [0.970, 0.780, 0.800, 0.400, 0.729, 0.733, 0.670],
    [0.000, 0.100, 0.600, 0.700, 0.832, 0.733, 0.770],
    [0.000, 0.000, 0.400, 0.900, 0.787, 0.667, 0.030],
  ],
  weights: [0.12, 0.1, 0.22, 0.14, 0.12, 0.2, 0.1],
  types: ['max', 'max', 'max', 'max', 'max', 'max', 'max'],
  p: 0.6,
  q: 0.4,
};

export default function InputPage() {
  const navigate = useNavigate();

  // ── State ──
  const [step, setStep]       = useState(1);
  const [matrix, setMatrix]   = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [weights, setWeights] = useState([0.33, 0.33, 0.34]);
  const [types, setTypes]     = useState(['max', 'max', 'max']);
  const [p, setP]             = useState(0.6);
  const [q, setQ]             = useState(0.4);
  const [error, setError]     = useState('');

  // Synchronisation des colonnes pour les poids et types
  const syncWeightsTypes = (newMatrix) => {
    const cols = newMatrix[0]?.length || 0;
    setWeights(prev => Array(cols).fill(0).map((_, i) => prev[i] ?? 0));
    setTypes(prev => Array(cols).fill('max').map((_, i) => prev[i] ?? 'max'));
    setMatrix(newMatrix);
  };

  // ── Charger l'exemple tel que tu l'as défini ──
  const loadExample = () => {
    setMatrix(EXAMPLE.matrix);
    setWeights(EXAMPLE.weights);
    setTypes(EXAMPLE.types);
    setP(EXAMPLE.p);
    setQ(EXAMPLE.q);
    setStep(1); // On revient à l'étape 1 pour voir la matrice
    setError('');
  };

  const validateMatrix = () => {
    if (matrix.length < 2 || matrix[0].length < 2) {
      setError('Il faut au moins 2 alternatives et 2 critères.');
      return false;
    }
    setError('');
    return true;
  };

  const validateWeights = () => {
    const sum = weights.reduce((a, b) => a + b, 0);
    // On garde une petite marge pour les erreurs d'arrondi des nombres flottants
    if (Math.abs(sum - 1) > 0.05 && sum !== 0) { 
      // Si la somme n'est pas 1, ton electre.js normalisera quand même, 
      // mais on peut laisser un avertissement ou valider.
      console.log("Somme des poids :", sum);
    }
    setError('');
    return true;
  };

  const handleCalculate = () => {
    if (!validateWeights()) return;
    try {
      const alternatives = matrix.map((_, i) => `Z${i + 1}`);
      const results = calculateElectreI(matrix, weights, types, p, q);

      navigate('/results', {
        state: {
          alternatives,
          concordance: results.concordanceMatrix,
          discordance: results.discordanceMatrix,
          outranking:  results.outrankingMatrix,
          kernel:      results.kernel,
          p,
          q,
        }
      });
    } catch (e) {
      setError('Erreur lors du calcul. Vérifiez vos données.');
    }
  };

  const steps = ['Matrice', 'Poids & Types', 'Seuils'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: "'IBM Plex Sans', sans-serif" }}>
      
      {/* Navbar */}
      <div style={{
        backgroundColor: '#0f2035', padding: '18px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
      }}>
        <div style={{ color: 'white', fontWeight: '900', fontSize: '18px' }}>⚖️ ELECTRE I</div>
        <button onClick={loadExample} style={{
          backgroundColor: '#f59e0b', border: 'none', color: 'white', 
          padding: '8px 20px', borderRadius: '8px', cursor: 'pointer',
          fontSize: '13px', fontWeight: '700',
        }}>
          ⚡ Charger l'exemple (Poids Fixes)
        </button>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* Indicateur d'étapes */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '36px' }}>
          {steps.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  backgroundColor: step > i + 1 ? '#059669' : step === i + 1 ? '#1e3a5f' : '#e2e8f0',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800'
                }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: '11px', marginTop: '5px', fontWeight: '600', color: step === i + 1 ? '#1e3a5f' : '#94a3b8' }}>{label}</div>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: '2px', backgroundColor: step > i + 1 ? '#059669' : '#e2e8f0', margin: '0 10px', marginBottom: '20px' }} />}
            </div>
          ))}
        </div>

        {error && <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '15px', borderRadius: '10px', color: '#dc2626', marginBottom: '20px' }}>⚠️ {error}</div>}

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          {step === 1 && <MatrixInput matrix={matrix} setMatrix={syncWeightsTypes} />}
          {step === 2 && <WeightsInput weights={weights} setWeights={setWeights} types={types} setTypes={setTypes} />}
          {step === 3 && <ThresholdInput p={p} setP={setP} q={q} setQ={setQ} />}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
          <button
            onClick={() => setStep(s => s - 1)}
            style={{ visibility: step === 1 ? 'hidden' : 'visible', padding: '12px 28px', borderRadius: '10px', border: '2px solid #1e3a5f', fontWeight: '700', cursor: 'pointer', backgroundColor: 'white' }}
          >
            ← Précédent
          </button>

          <button
            onClick={() => {
              if (step === 1 && !validateMatrix()) return;
              if (step === 2 && !validateWeights()) return;
              if (step === 3) handleCalculate();
              else setStep(s => s + 1);
            }}
            style={{
              background: step === 3 ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : '#1e3a5f',
              color: 'white', border: 'none', padding: '12px 36px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer'
            }}
          >
            {step === 3 ? '🧮 Calculer' : 'Suivant →'}
          </button>
        </div>
      </div>
    </div>
  );
}
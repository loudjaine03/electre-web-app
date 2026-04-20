import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixInput from '../components/MatrixInput';
import WeightsInput from '../components/WeightsInput';
import ThresholdInput from '../components/ThresholdInput';
import { calculateElectreI } from '../logic/electre';

// ── Exemple pré-rempli : Choix de Fournisseur ──
const EXAMPLE = {
  matrix: [
    [5000, 8, 10, 7],
    [3500, 6, 7,  5],
    [4500, 9, 12, 8],
    [4000, 7, 8,  6],
  ],
  weights: [0.3, 0.3, 0.2, 0.2],
  types: ['min', 'max', 'min', 'max'],
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

  const numCriteria = matrix[0]?.length || 0;

  // Sync weights/types length with criteria count
  const syncWeightsTypes = (newMatrix) => {
    const cols = newMatrix[0]?.length || 0;
    setWeights(prev => {
      const next = Array(cols).fill(0).map((_, i) => prev[i] ?? 0);
      return next;
    });
    setTypes(prev => {
      const next = Array(cols).fill('max').map((_, i) => prev[i] ?? 'max');
      return next;
    });
    setMatrix(newMatrix);
  };

  // ── Load example ──
  const loadExample = () => {
    setMatrix(EXAMPLE.matrix);
    setWeights(EXAMPLE.weights);
    setTypes(EXAMPLE.types);
    setP(EXAMPLE.p);
    setQ(EXAMPLE.q);
    setStep(1);
    setError('');
  };

  // ── Validate step 1 ──
  const validateMatrix = () => {
    for (let i = 0; i < matrix.length; i++)
      for (let j = 0; j < matrix[i].length; j++)
        if (isNaN(matrix[i][j])) { setError('Toutes les cellules doivent contenir un nombre.'); return false; }
    if (matrix.length < 2) { setError('Il faut au moins 2 alternatives.'); return false; }
    if (matrix[0].length < 2) { setError('Il faut au moins 2 critères.'); return false; }
    setError(''); return true;
  };

  // ── Validate step 2 ──
  const validateWeights = () => {
    const sum = weights.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 1) > 0.01) { setError(`La somme des poids est ${sum.toFixed(2)}. Elle doit être égale à 1.`); return false; }
    setError(''); return true;
  };

  // ── Calculate & navigate ──
  const handleCalculate = () => {
    if (!validateWeights()) return;
    try {
      const alternatives = matrix.map((_, i) => `A${i + 1}`);
      const { concordanceMatrix, discordanceMatrix, outrankingMatrix, kernel } =
        calculateElectreI(matrix, weights, types, p, q);

      navigate('/results', {
        state: {
          alternatives,
          concordance: concordanceMatrix,
          discordance: discordanceMatrix,
          outranking:  outrankingMatrix,
          kernel,
          p,
          q,
        }
      });
    } catch (e) {
      setError('Erreur lors du calcul. Vérifiez vos données.');
    }
  };

  // ── Steps config ──
  const steps = ['Matrice', 'Poids & Types', 'Seuils'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* ── Navbar ── */}
      <div style={{
        backgroundColor: '#0f2035', padding: '18px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
      }}>
        <div style={{ color: 'white', fontWeight: '900', fontSize: '18px' }}>⚖️ ELECTRE I</div>
        <button onClick={loadExample} style={{
          backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          color: 'white', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer',
          fontSize: '13px', fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: '600',
        }}>
          ⚡ Charger l'exemple
        </button>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>

        {/* ── Step indicator ── */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '36px', gap: '0' }}>
          {steps.map((label, i) => {
            const num = i + 1;
            const active = step === num;
            const done   = step > num;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    backgroundColor: done ? '#059669' : active ? '#1e3a5f' : '#e2e8f0',
                    color: done || active ? 'white' : '#94a3b8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '800', fontSize: '14px', flexShrink: 0,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}>
                    {done ? '✓' : num}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: active ? '#1e3a5f' : '#94a3b8', whiteSpace: 'nowrap' }}>
                    {label}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: '2px', backgroundColor: done ? '#059669' : '#e2e8f0', margin: '0 8px', marginBottom: '22px' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Error ── */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: '10px', padding: '14px 18px', marginBottom: '20px',
            color: '#dc2626', fontSize: '14px', fontWeight: '500',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── Step 1: Matrix ── */}
        {step === 1 && (
          <MatrixInput matrix={matrix} setMatrix={syncWeightsTypes} />
        )}

        {/* ── Step 2: Weights & Types ── */}
        {step === 2 && (
          <WeightsInput
            weights={weights} setWeights={setWeights}
            types={types} setTypes={setTypes}
          />
        )}

        {/* ── Step 3: Thresholds ── */}
        {step === 3 && (
          <ThresholdInput p={p} setP={setP} q={q} setQ={setQ} />
        )}

        {/* ── Navigation buttons ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
          <button
            onClick={() => { setError(''); setStep(s => s - 1); }}
            style={{
              visibility: step === 1 ? 'hidden' : 'visible',
              backgroundColor: 'white', color: '#1e3a5f',
              border: '2px solid #1e3a5f', borderRadius: '10px',
              padding: '12px 28px', fontSize: '15px', fontWeight: '700',
              fontFamily: "'IBM Plex Sans', sans-serif", cursor: 'pointer',
            }}
          >
            ← Précédent
          </button>

          {step < 3 ? (
            <button
              onClick={() => {
                if (step === 1 && !validateMatrix()) return;
                if (step === 2 && !validateWeights()) return;
                setStep(s => s + 1);
              }}
              style={{
                background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
                color: 'white', border: 'none', borderRadius: '10px',
                padding: '12px 32px', fontSize: '15px', fontWeight: '700',
                fontFamily: "'IBM Plex Sans', sans-serif", cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
              }}
            >
              Suivant →
            </button>
          ) : (
            <button
              onClick={handleCalculate}
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white', border: 'none', borderRadius: '10px',
                padding: '12px 36px', fontSize: '15px', fontWeight: '700',
                fontFamily: "'IBM Plex Sans', sans-serif", cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(5,150,105,0.35)',
              }}
            >
              🧮 Calculer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
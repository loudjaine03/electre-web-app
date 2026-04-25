import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MatrixInput from "../components/MatrixInput";
import WeightsInput from "../components/WeightsInput";
import ThresholdInput from "../components/ThresholdInput";
import { calculateElectreI } from "../logic/electre";

// ── Exemple pré-rempli : Choix de Fournisseur (Tes valeurs) ──
const EXAMPLE = {
  matrix: [
    [0.36, 0.19, 1.0, 0.4, 0.459, 0.667, 0.78],
    [0.04, 0.42, 0.8, 0.9, 0.726, 0.667, 0.7],
    [0.97, 0.78, 0.8, 0.4, 0.729, 0.733, 0.67],
    [0.0, 0.1, 0.6, 0.7, 0.832, 0.733, 0.77],
    [0.0, 0.0, 0.4, 0.9, 0.787, 0.667, 0.03],
  ],
  weights: [0.12, 0.1, 0.22, 0.14, 0.12, 0.2, 0.1],
  types: ["max", "max", "max", "max", "max", "max", "max"],
  p: 0.8,
  q: 0.25,
};

export default function InputPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [matrix, setMatrix] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [weights, setWeights] = useState([0.33, 0.33, 0.34]);
  const [types, setTypes] = useState(["max", "max", "max"]);
  const [p, setP] = useState(0.6);
  const [q, setQ] = useState(0.4);
  const [error, setError] = useState("");

  // Synchronisation des colonnes pour les poids et types
  const syncWeightsTypes = (newMatrix) => {
    const cols = newMatrix[0]?.length || 0;
    setWeights((prev) => Array(cols).fill(0).map((_, i) => prev[i] ?? 0));
    setTypes((prev) => Array(cols).fill("max").map((_, i) => prev[i] ?? "max"));
    setMatrix(newMatrix);
  };

  // Charger l'exemple
  const loadExample = () => {
    setMatrix(EXAMPLE.matrix);
    setWeights(EXAMPLE.weights);
    setTypes(EXAMPLE.types);
    setP(EXAMPLE.p);
    setQ(EXAMPLE.q);
    setStep(1);
    setError("");
  };

  const validateMatrix = () => {
    if (matrix.length < 2 || matrix[0].length < 2) {
      setError("Il faut au moins 2 alternatives et 2 critères.");
      return false;
    }
    setError("");
    return true;
  };

  const validateWeights = () => {
    const sum = weights.reduce((a, b) => a + b, 0);

    if (Math.abs(sum - 1) > 0.05 && sum !== 0) {
      console.log("Somme des poids :", sum);
    }

    setError("");
    return true;
  };

  const handleCalculate = () => {
    if (!validateWeights()) return;

    try {
      const alternatives = matrix.map((_, i) => `Z${i + 1}`);
      const results = calculateElectreI(matrix, weights, types, p, q);

      navigate("/results", {
        state: {
          alternatives,
          concordance: results.concordanceMatrix,
          discordance: results.discordanceMatrix,
          outranking: results.outrankingMatrix,
          kernel: results.kernel,
          p,
          q,
        },
      });
    } catch (e) {
      setError("Erreur lors du calcul. Vérifiez vos données.");
    }
  };

  const steps = ["Matrice", "Poids & Types", "Seuils"];

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    fontFamily: "'IBM Plex Sans', sans-serif",
  };

  const headerStyle = {
    backgroundColor: "#0f2035",
    padding: "18px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
    flexWrap: "wrap",
  };

  const containerStyle = {
    width: "min(980px, calc(100% - 24px))",
    margin: "0 auto",
    padding: "32px 0 48px",
  };

  return (
    <div style={pageStyle}>
      {/* Navbar */}
      <div style={headerStyle}>
        <div style={{ color: "white", fontWeight: "900", fontSize: "18px" }}>⚖️ ELECTRE I</div>

        <button
          onClick={loadExample}
          style={{
            backgroundColor: "#f59e0b",
            border: "none",
            color: "white",
            padding: "8px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          ⚡ Charger l'exemple
        </button>
      </div>

      <div style={containerStyle}>
        {/* Step indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          {steps.map((label, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: "1 1 180px", minWidth: "180px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "56px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: step > i + 1 ? "#059669" : step === i + 1 ? "#1e3a5f" : "#e2e8f0",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                  }}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    marginTop: "5px",
                    fontWeight: "600",
                    color: step === i + 1 ? "#1e3a5f" : "#94a3b8",
                    textAlign: "center",
                  }}
                >
                  {label}
                </div>
              </div>

              {i < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    backgroundColor: step > i + 1 ? "#059669" : "#e2e8f0",
                    margin: "0 10px",
                    marginBottom: "20px",
                    minWidth: "24px",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              padding: "15px",
              borderRadius: "10px",
              color: "#dc2626",
              marginBottom: "20px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <div
          style={{
            backgroundColor: "white",
            padding: "clamp(18px, 3vw, 30px)",
            borderRadius: "20px",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            overflowX: "auto",
          }}
        >
          <div style={{ minWidth: "fit-content" }}>
            {step === 1 && <MatrixInput matrix={matrix} setMatrix={syncWeightsTypes} />}
            {step === 2 && <WeightsInput weights={weights} setWeights={setWeights} types={types} setTypes={setTypes} />}
            {step === 3 && <ThresholdInput p={p} setP={setP} q={q} setQ={setQ} />}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
          <button
            onClick={() => setStep((s) => s - 1)}
            style={{
              visibility: step === 1 ? "hidden" : "visible",
              padding: "12px 28px",
              borderRadius: "10px",
              border: "2px solid #1e3a5f",
              fontWeight: "700",
              cursor: "pointer",
              backgroundColor: "white",
            }}
          >
            ← Précédent
          </button>

          <button
            onClick={() => {
              if (step === 1 && !validateMatrix()) return;
              if (step === 2 && !validateWeights()) return;
              if (step === 3) handleCalculate();
              else setStep((s) => s + 1);
            }}
            style={{
              background: step === 3 ? "linear-gradient(135deg, #059669 0%, #047857 100%)" : "#1e3a5f",
              color: "white",
              border: "none",
              padding: "12px 36px",
              borderRadius: "10px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {step === 3 ? "🧮 Calculer" : "Suivant →"}
          </button>
        </div>
      </div>
    </div>
  );
}
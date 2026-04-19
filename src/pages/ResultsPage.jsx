import { useLocation, useNavigate } from "react-router-dom";
import SummaryCard from "../components/SummaryCard";
import ResultTables from "../components/ResultTables";
import OutrankingGraph from "../components/OutrankingGraph";
 
// ── Données fictives pour tester SANS Nermine ──
// Supprime mockData et utilise location.state quand tout est connecté
const mockData = {
  alternatives: ["A1", "A2", "A3", "A4"],
  concordance: [
    [0, 0.8, 0.6, 0.4],
    [0.2, 0, 0.7, 0.5],
    [0.4, 0.3, 0, 0.8],
    [0.6, 0.5, 0.4, 0],
  ],
  discordance: [
    [0, 0.1, 0.3, 0.5],
    [0.8, 0, 0.2, 0.4],
    [0.6, 0.7, 0, 0.3],
    [0.4, 0.5, 0.6, 0],
  ],
  outranking: [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [1, 1, 0, 0],
  ],
  kernel: ["A2"],
  p: 0.6,
  q: 0.4,
};
 
export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
 
  // Utilise les vraies données si elles existent, sinon mockData
  const data = location.state || mockData;
  const { alternatives, concordance, discordance, outranking, kernel, p, q } = data;
 
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f1f5f9",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
 
      {/* ── Header ── */}
      <div style={{
        backgroundColor: "#0f2035",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      }}>
        <div style={{ color: "white", fontWeight: "800", fontSize: "18px", letterSpacing: "0.5px" }}>
          ⚖️ ELECTRE I
        </div>
        <button
          onClick={() => navigate("/input")}
          style={{
            backgroundColor: "transparent",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white",
            padding: "8px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: "600",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
          onMouseLeave={e => e.target.style.backgroundColor = "transparent"}
        >
          ← Recommencer
        </button>
      </div>
 
      {/* ── Content ── */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
 
        <div style={{ marginBottom: "10px", fontSize: "13px", color: "#94a3b8", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase" }}>
          Analyse complète
        </div>
        <h1 style={{ fontSize: "30px", fontWeight: "900", color: "#0f2035", margin: "0 0 32px 0", letterSpacing: "-0.5px" }}>
          Résultats de la Décision
        </h1>
 
        {/* 1. Summary Card — en premier, le plus important */}
        <SummaryCard
          kernel={kernel}
          p={p}
          q={q}
          alternatives={alternatives}
        />
 
        {/* 2. Graphe de surclassement */}
        <div style={{ marginBottom: "32px" }}>
          <SectionTitle number="2" title="Graphe de Surclassement" />
          <OutrankingGraph
            outranking={outranking}
            alternatives={alternatives}
            kernel={kernel}
          />
        </div>
 
        {/* 3. Matrices */}
        <div style={{ marginBottom: "32px" }}>
          <SectionTitle number="3" title="Matrices de Calcul" />
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          }}>
            <ResultTables
              concordance={concordance}
              discordance={discordance}
              outranking={outranking}
              alternatives={alternatives}
              p={p}
              q={q}
            />
          </div>
        </div>
 
        {/* 4. Boutons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/input")}
            style={{
              background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "14px 32px",
              fontSize: "15px",
              fontWeight: "700",
              fontFamily: "'IBM Plex Sans', sans-serif",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
            }}
          >
            🔄 Nouvelle Analyse
          </button>
          <button
            onClick={() => window.print()}
            style={{
              backgroundColor: "white",
              color: "#1e3a5f",
              border: "2px solid #1e3a5f",
              borderRadius: "10px",
              padding: "14px 32px",
              fontSize: "15px",
              fontWeight: "700",
              fontFamily: "'IBM Plex Sans', sans-serif",
              cursor: "pointer",
            }}
          >
            🖨️ Imprimer / Exporter
          </button>
        </div>
      </div>
    </div>
  );
}
 
function SectionTitle({ number, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
      <div style={{
        width: "36px", height: "36px",
        backgroundColor: "#1e3a5f",
        borderRadius: "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", fontWeight: "900", fontSize: "16px",
        fontFamily: "'IBM Plex Mono', monospace",
        flexShrink: 0,
      }}>
        {number}
      </div>
      <div style={{ fontSize: "20px", fontWeight: "800", color: "#0f2035", letterSpacing: "-0.3px" }}>
        {title}
      </div>
    </div>
  );
}
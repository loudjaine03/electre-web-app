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
    width: "min(1240px, calc(100% - 24px))",
    margin: "0 auto",
    padding: "32px 0 56px",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "clamp(16px, 2vw, 28px)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    overflowX: "auto",
  };

  const buttonBaseStyle = {
    fontFamily: "'IBM Plex Sans', sans-serif",
    cursor: "pointer",
    borderRadius: "10px",
    padding: "14px 32px",
    fontSize: "15px",
    fontWeight: "700",
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ color: "white", fontWeight: "800", fontSize: "18px", letterSpacing: "0.5px" }}>
          ELECTRE I
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
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          ← Recommencer
        </button>
      </div>

      {/* Content */}
      <div style={containerStyle}>
 
        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 30px)",
            fontWeight: "900",
            color: "#0f2035",
            margin: "0 0 32px 0",
            letterSpacing: "-0.5px",
          }}
        >
          <br />
          Résultats de la Décision avec ELECTRE I
          <br/>
        </h1>

        {/* 1. Summary Card */}
        <div style={{ marginBottom: "24px" }}>
          <SummaryCard kernel={kernel} p={p} q={q} alternatives={alternatives} />
        </div>

        {/* 2. Matrices */}
        <div style={{ marginBottom: "24px" }}>
          <SectionTitle number="2" title="Matrices de Calcul" />
          <div style={cardStyle}>
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div style={{ minWidth: "max-content" }}>
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
          </div>
        </div>

        
        {/* 3. Graphe de surclassement */}
        <div style={{ marginBottom: "24px" }}>
          <SectionTitle number="3" title="Graphe de Surclassement" />
          <div style={cardStyle}>
            <div style={{ overflowX: "auto" }}>
              <div style={{ minWidth: "fit-content" }}>
                <OutrankingGraph
                  outranking={outranking}
                  alternatives={alternatives}
                  kernel={kernel}
                />
              </div>
            </div>
          </div>
        </div>


        {/* 4. Buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/input")}
            style={{
              ...buttonBaseStyle,
              background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
              color: "white",
              border: "none",
              boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
            }}
          >
            Nouvelle Analyse
          </button>

          <button
            onClick={() => window.print()}
            style={{
              ...buttonBaseStyle,
              backgroundColor: "white",
              color: "#1e3a5f",
              border: "2px solid #1e3a5f",
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
    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px", flexWrap: "wrap" }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          backgroundColor: "#1e3a5f",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "900",
          fontSize: "16px",
          fontFamily: "'IBM Plex Mono', monospace",
          flexShrink: 0,
        }}
      >
        {number}
      </div>
      <div style={{ fontSize: "20px", fontWeight: "800", color: "#0f2035", letterSpacing: "-0.3px" }}>
        {title}
      </div>
    </div>
  );
}
import { useState } from "react";
 
// ─── ResultTables ───────────────────────────────────────────────
// Props:
//   concordance  → matrice n×n de nombres
//   discordance  → matrice n×n de nombres
//   outranking   → matrice n×n de 0 et 1
//   alternatives → tableau de strings ex: ['A1','A2','A3']
//   p            → seuil concordance (ex: 0.6)
//   q            → seuil discordance (ex: 0.4)
// ────────────────────────────────────────────────────────────────
 
export default function ResultTables({ concordance, discordance, outranking, alternatives, p, q }) {
  const [activeTab, setActiveTab] = useState("concordance");
 
  const tabs = [
    { id: "concordance", label: "Concordance" },
    { id: "discordance", label: "Discordance" },
    { id: "outranking",  label: "Surclassement" },
  ];
 
  const getConcordanceColor = (val, i, j) => {
    if (i === j) return "#f0f0f0";
    if (val >= p) return "#d1fae5"; // vert clair = bon
    return "#fee2e2"; // rouge clair = mauvais
  };
 
  const getDiscordanceColor = (val, i, j) => {
    if (i === j) return "#f0f0f0";
    if (val <= q) return "#d1fae5";
    return "#fee2e2";
  };
 
  const getOutrankingColor = (val, i, j) => {
    if (i === j) return "#f0f0f0";
    if (val === 1) return "#d1fae5";
    return "#fff7ed";
  };
 
  const cellStyle = (bg) => ({
    backgroundColor: bg,
    border: "1px solid #e5e7eb",
    padding: "10px 14px",
    textAlign: "center",
    fontSize: "14px",
    fontFamily: "'IBM Plex Mono', monospace",
    minWidth: "70px",
  });
 
  const headerStyle = {
    backgroundColor: "#1e3a5f",
    color: "white",
    padding: "10px 14px",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: "700",
    fontFamily: "'IBM Plex Sans', sans-serif",
    minWidth: "70px",
    border: "1px solid #1e3a5f",
  };
 
  const cornerStyle = {
    ...headerStyle,
    backgroundColor: "#0f2035",
  };
 
  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
 
      {/* ── Tabs ── */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.2s",
              backgroundColor: activeTab === tab.id ? "#1e3a5f" : "#f1f5f9",
              color: activeTab === tab.id ? "white" : "#64748b",
              boxShadow: activeTab === tab.id ? "0 2px 8px rgba(30,58,95,0.3)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
 
      {/* ── Description ── */}
      <div style={{
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        padding: "14px 18px",
        marginBottom: "20px",
        fontSize: "13px",
        color: "#475569",
        lineHeight: "1.6",
      }}>
        {activeTab === "concordance" && (
          <span>Chaque cellule C(i,j) représente dans quelle mesure l'alternative <b>i</b> est au moins aussi bonne que <b>j</b>. Les cellules <span style={{ backgroundColor: "#d1fae5", padding: "1px 6px", borderRadius: "4px" }}>vertes</span> indiquent C(i,j) ≥ p = <b>{p}</b>.</span>
        )}
        {activeTab === "discordance" && (
          <span>Chaque cellule D(i,j) mesure l'intensité du désaccord. Les cellules <span style={{ backgroundColor: "#d1fae5", padding: "1px 6px", borderRadius: "4px" }}>vertes</span> indiquent D(i,j) ≤ q = <b>{q}</b> (favorable au surclassement).</span>
        )}
        {activeTab === "outranking" && (
          <span>✅ signifie que l'alternative <b>i surclasse j</b> (C ≥ {p} ET D ≤ {q}). ❌ signifie absence de surclassement.</span>
        )}
      </div>
 
      {/* ── Table ── */}
      <div style={{ overflowX: "auto", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={cornerStyle}>i \ j</th>
              {alternatives.map((alt) => (
                <th key={alt} style={headerStyle}>{alt}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alternatives.map((altRow, i) => (
              <tr key={altRow}>
                <th style={{ ...headerStyle, backgroundColor: "#1e3a5f" }}>{altRow}</th>
                {alternatives.map((altCol, j) => {
                  if (activeTab === "concordance") {
                    const val = concordance[i][j];
                    return (
                      <td key={altCol} style={cellStyle(getConcordanceColor(val, i, j))}>
                        {i === j ? "—" : val.toFixed(2)}
                      </td>
                    );
                  }
                  if (activeTab === "discordance") {
                    const val = discordance[i][j];
                    return (
                      <td key={altCol} style={cellStyle(getDiscordanceColor(val, i, j))}>
                        {i === j ? "—" : val.toFixed(2)}
                      </td>
                    );
                  }
                  if (activeTab === "outranking") {
                    const val = outranking[i][j];
                    return (
                      <td key={altCol} style={cellStyle(getOutrankingColor(val, i, j))}>
                        {i === j ? "—" : val === 1 ? "✅" : "❌"}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {/* ── Legend ── */}
      <div style={{ display: "flex", gap: "20px", marginTop: "16px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#64748b" }}>
          <div style={{ width: "16px", height: "16px", backgroundColor: "#d1fae5", borderRadius: "4px", border: "1px solid #6ee7b7" }} />
          {activeTab === "outranking" ? "Surclassement ✅" : "Favorable"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#64748b" }}>
          <div style={{ width: "16px", height: "16px", backgroundColor: activeTab === "outranking" ? "#fff7ed" : "#fee2e2", borderRadius: "4px", border: "1px solid #fca5a5" }} />
          {activeTab === "outranking" ? "Pas de surclassement ❌" : "Défavorable"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#64748b" }}>
          <div style={{ width: "16px", height: "16px", backgroundColor: "#f0f0f0", borderRadius: "4px", border: "1px solid #d1d5db" }} />
          Diagonale (i = j)
        </div>
      </div>
    </div>
  );
}
// ─── OutrankingGraph ─────────────────────────────────────────────
// Props:
//   outranking   → matrice n×n de 0 et 1
//   alternatives → tableau de strings ex: ['A1','A2','A3','A4']
//   kernel       → tableau de strings ex: ['A2']
// ─────────────────────────────────────────────────────────────────
 
export default function OutrankingGraph({ outranking, alternatives, kernel }) {
  const n = alternatives.length;
  const cx = 300; // centre du graphe
  const cy = 240;
  const radius = 160; // rayon du cercle de positionnement
  const nodeR = 34;   // rayon de chaque nœud
  const svgW = 600;
  const svgH = 480;
 
  // Calculer la position de chaque nœud (disposition en cercle)
  const positions = alternatives.map((_, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
 
  const isInKernel = (alt) => kernel && kernel.includes(alt);
 
  // Calculer le point sur le bord du cercle source vers la cible
  const getEdgePoints = (from, to) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / dist;
    const uy = dy / dist;
    return {
      x1: from.x + ux * nodeR,
      y1: from.y + uy * nodeR,
      x2: to.x - ux * (nodeR + 8), // +8 pour la pointe de flèche
      y2: to.y - uy * (nodeR + 8),
    };
  };
 
  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e3a5f", marginBottom: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>
          Graphe de Surclassement
        </div>
        <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "20px" }}>
          Une flèche A → B signifie que A surclasse B
        </div>
 
        <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} style={{ maxWidth: "100%" }}>
          <defs>
            {/* Pointe de flèche normale */}
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#2563eb" />
            </marker>
            {/* Pointe de flèche pour kernel */}
            <marker id="arrow-kernel" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#059669" />
            </marker>
            {/* Ombre douce */}
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.15)" />
            </filter>
          </defs>
 
          {/* ── Flèches ── */}
          {outranking.map((row, i) =>
            row.map((val, j) => {
              if (i === j || val !== 1) return null;
              const from = positions[i];
              const to = positions[j];
              const { x1, y1, x2, y2 } = getEdgePoints(from, to);
              const fromKernel = isInKernel(alternatives[i]);
              return (
                <line
                  key={`${i}-${j}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={fromKernel ? "#059669" : "#2563eb"}
                  strokeWidth={fromKernel ? 2.5 : 1.8}
                  strokeOpacity="0.75"
                  markerEnd={fromKernel ? "url(#arrow-kernel)" : "url(#arrow)"}
                />
              );
            })
          )}
 
          {/* ── Nœuds ── */}
          {alternatives.map((alt, i) => {
            const { x, y } = positions[i];
            const inKernel = isInKernel(alt);
            return (
              <g key={alt} filter="url(#shadow)">
                {/* Anneau extérieur pour le noyau */}
                {inKernel && (
                  <circle
                    cx={x} cy={y} r={nodeR + 7}
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2.5"
                    strokeDasharray="6 3"
                    opacity="0.7"
                  />
                )}
                {/* Cercle principal */}
                <circle
                  cx={x} cy={y} r={nodeR}
                  fill={inKernel ? "#059669" : "#1e3a5f"}
                  stroke={inKernel ? "#d1fae5" : "#3b82f6"}
                  strokeWidth="2"
                />
                {/* Texte de l'alternative */}
                <text
                  x={x} y={y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="15"
                  fontWeight="800"
                  fontFamily="'IBM Plex Mono', monospace"
                >
                  {alt}
                </text>
                {/* Badge noyau */}
                {inKernel && (
                  <text
                    x={x} y={y + nodeR + 20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#059669"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="'IBM Plex Sans', sans-serif"
                  >
                    ★ Noyau
                  </text>
                )}
              </g>
            );
          })}
        </svg>
 
        {/* ── Légende ── */}
        <div style={{
          display: "flex", gap: "24px", flexWrap: "wrap",
          justifyContent: "center", marginTop: "8px",
          padding: "12px 20px",
          backgroundColor: "#f8fafc",
          borderRadius: "10px",
          fontSize: "12px", color: "#64748b",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="16" height="16"><circle cx="8" cy="8" r="7" fill="#059669" /></svg>
            Alternative dans le noyau
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="16" height="16"><circle cx="8" cy="8" r="7" fill="#1e3a5f" /></svg>
            Autre alternative
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="30" height="12">
              <line x1="0" y1="6" x2="22" y2="6" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />
            </svg>
            A surclasse B
          </div>
        </div>
      </div>
    </div>
  );
}
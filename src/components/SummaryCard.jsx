// ─── SummaryCard ────────────────────────────────────────────────
// Props:
//   kernel       → tableau de strings ex: ['A2', 'A4'] ou []
//   p            → seuil concordance
//   q            → seuil discordance
//   alternatives → tous les noms d'alternatives
// ────────────────────────────────────────────────────────────────

export default function SummaryCard({ kernel, p, q, alternatives }) {
  const isEmpty = !kernel || kernel.length === 0;
  const isSingle = kernel && kernel.length === 1;

  return (
    <div style={{
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(30,58,95,0.15)",
      fontFamily: "'IBM Plex Sans', sans-serif",
      marginBottom: "32px",
    }}>

      {/* ── Header ── */}
      <div style={{
        background: isEmpty
          ? "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)"
          : "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
        padding: "28px 36px",
        color: "white",
      }}>
        <div style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "3px", opacity: 0.7, marginBottom: "8px", textTransform: "uppercase" }}>
          Résultat de l'Analyse ELECTRE I
        </div>
        <div style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.5px" }}>
          {isEmpty
            ? "Aucune alternative dominante trouvée"
            : isSingle
            ? "Alternative recommandée"
            : `${kernel.length} alternatives recommandées`}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{
        backgroundColor: "white",
        padding: "32px 36px",
      }}>

        {/* Kernel badges */}
        {isEmpty ? (
          <div style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "12px",
            padding: "20px 24px",
            marginBottom: "24px",
          }}>
            <div style={{ fontSize: "15px", color: "#dc2626", fontWeight: "600", marginBottom: "6px" }}>
              ⚠️ Noyau vide
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.6" }}>
              Aucune alternative ne domine les autres avec les seuils actuels.
              Essayez de <b>diminuer p</b> ou <b>augmenter q</b> pour obtenir un résultat.
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "28px" }}>
            {kernel.map((alt) => (
              <div key={alt} style={{
                background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
                color: "white",
                borderRadius: "14px",
                padding: "18px 32px",
                fontSize: "28px",
                fontWeight: "900",
                fontFamily: "'IBM Plex Mono', monospace",
                boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <span style={{ fontSize: "22px" }}>🏆</span>
                {alt}
              </div>
            ))}
          </div>
        )}

        {/* Explanation */}
        {!isEmpty && (
          <div style={{
            backgroundColor: "#f0f9ff",
            border: "1px solid #bae6fd",
            borderRadius: "10px",
            padding: "16px 20px",
            marginBottom: "20px",
            fontSize: "14px",
            color: "#0369a1",
            lineHeight: "1.7",
          }}>
            {isSingle ? (
              <span>
                <b>{kernel[0]}</b> est la seule alternative qui n'est surclassée par aucune autre.
                C'est la recommandation unique du modèle ELECTRE I.
              </span>
            ) : (
              <span>
                Les alternatives <b>{kernel.join(", ")}</b> forment le noyau — elles ne sont surclassées
                par aucune autre alternative et représentent les meilleures options selon les critères définis.
              </span>
            )}
          </div>
        )}

        {/* Parameters used */}
        <div style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          paddingTop: "16px",
          borderTop: "1px solid #f1f5f9",
        }}>
          <div style={paramBadge("#f1f5f9", "#334155")}>
            📊 {alternatives?.length} alternatives analysées
          </div>
          <div style={paramBadge("#f1f5f9", "#334155")}>
            Seuil concordance p = <b style={{ marginLeft: "4px" }}>{p}</b>
          </div>
          <div style={paramBadge("#f1f5f9", "#334155")}>
            Seuil discordance q = <b style={{ marginLeft: "4px" }}>{q}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

const paramBadge = (bg, color) => ({
  backgroundColor: bg,
  color,
  borderRadius: "8px",
  padding: "6px 14px",
  fontSize: "12px",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});
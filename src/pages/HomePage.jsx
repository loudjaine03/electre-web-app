import { useNavigate } from "react-router-dom";
 
export default function HomePage() {
  const navigate = useNavigate();
 
  const steps = [
    {
      number: "01",
      icon: "📋",
      title: "Saisir vos données",
      description: "Entrez la matrice de performances de vos alternatives selon chaque critère, avec leurs noms.",
    },
    {
      number: "02",
      icon: "⚖️",
      title: "Paramétrer les critères",
      description: "Attribuez un poids à chaque critère, choisissez s'il faut le maximiser ou le minimiser, et fixez les seuils.",
    },
    {
      number: "03",
      icon: "🏆",
      title: "Obtenir la recommandation",
      description: "L'algorithme ELECTRE I calcule automatiquement le noyau — la ou les meilleures alternatives.",
    },
  ];
 
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0f2035",
      fontFamily: "'IBM Plex Sans', sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>
 
      {/* ── Navbar ── */}
      <nav style={{
        padding: "18px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ color: "white", fontWeight: "900", fontSize: "20px", letterSpacing: "0.5px" }}>
          ⚖️ ELECTRE I
        </div>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: "500" }}>
          Master 1 RSID — Groupe 3
        </div>
      </nav>
 
      {/* ── Hero ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px 40px",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block",
          backgroundColor: "rgba(37,99,235,0.15)",
          border: "1px solid rgba(37,99,235,0.3)",
          borderRadius: "100px",
          padding: "8px 20px",
          color: "#93c5fd",
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "28px",
        }}>
          Aide Multicritère à la Décision
        </div>
 
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: "900",
          color: "white",
          margin: "0 0 20px 0",
          lineHeight: "1.1",
          letterSpacing: "-1.5px",
          maxWidth: "700px",
        }}>
          Prenez de meilleures{" "}
          <span style={{
            background: "linear-gradient(90deg, #60a5fa, #34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            décisions
          </span>
        </h1>
 
        <p style={{
          fontSize: "17px",
          color: "rgba(255,255,255,0.55)",
          maxWidth: "520px",
          lineHeight: "1.7",
          margin: "0 0 44px 0",
        }}>
          Analysez vos alternatives selon plusieurs critères grâce à la méthode
          ELECTRE I et obtenez une recommandation claire et justifiée.
        </p>
 
        <button
          onClick={() => navigate("/input")}
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "white",
            border: "none",
            borderRadius: "14px",
            padding: "18px 48px",
            fontSize: "17px",
            fontWeight: "800",
            fontFamily: "'IBM Plex Sans', sans-serif",
            cursor: "pointer",
            boxShadow: "0 8px 28px rgba(37,99,235,0.45)",
            letterSpacing: "0.3px",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={e => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 12px 36px rgba(37,99,235,0.55)";
          }}
          onMouseLeave={e => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 8px 28px rgba(37,99,235,0.45)";
          }}
        >
          Commencer l'Analyse →
        </button>
 
        {/* ── Steps ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          maxWidth: "820px",
          width: "100%",
          marginTop: "72px",
        }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "28px 24px",
              textAlign: "left",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.09)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <span style={{ fontSize: "28px" }}>{step.icon}</span>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "1px",
                }}>
                  {step.number}
                </span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: "800", color: "white", marginBottom: "10px" }}>
                {step.title}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6" }}>
                {step.description}
              </div>
            </div>
          ))}
        </div>
 
        {/* ── Footer info ── */}
        <div style={{
          marginTop: "56px",
          padding: "16px 28px",
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          fontSize: "12px",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.5px",
        }}>
          Faculté des Mathématiques et de l'Informatique — Fondements de la Décision — 2025/2026
        </div>
      </div>
    </div>
  );
}
 
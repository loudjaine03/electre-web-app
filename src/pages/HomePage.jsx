import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Saisie des données",
      description: "Entrez la matrice de performances de vos alternatives selon chaque critère.",
    },
    {
      number: "02",
      title: "Paramètres des critères",
      description: "Entrez les seuils, les poids et les objectifs des critères.",
    },
    {
      number: "03",
      title: "Obtenir la recommandation",
      description: "L'algorithme ELECTRE I calcule automatiquement le noyau.",
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
          ELECTRE I
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
          Choisir les mailleurs alternatives multicritéres en utilisant l'Algorithme d'ELECTRE I <br/> <br/>
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
        </button> <br/><br/><br/>

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
            <div
              key={idx}
              style={{
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
              {/* ── Step number badge ── */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                backgroundColor: "rgba(37,99,235,0.25)",
                border: "1px solid rgba(37,99,235,0.4)",
                marginBottom: "18px",
              }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#93c5fd",
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
          padding: "24px 36px",
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          fontSize: "12px",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.4px",
          lineHeight: "1",
          textAlign: "center",
        }}>
          <div style={{ color: "rgba(255,255,255,0.55)", fontWeight: "700", fontSize: "13px", marginBottom: "6px" }}>
            Université des Sciences et de la Technologie d'Oran
          </div>
          <div style={{ marginBottom: "4px" }}>Faculté des Mathématiques et de l'Informatique</div>
          <div style={{ marginBottom: "16px" }}>Département d'Informatique</div>

          <br/><br/>

          <div style={{ marginBottom: "4px" }}>Fondements de la Décision    Master 1 RSID</div>
          <div style={{ marginBottom: "16px" }}>Groupe 3</div>

          <br/><br/>
          <div style={{ marginBottom: "2px" }}>Réalisé par: <br/><br/></div>
          <div style={{ color: "rgba(255,255,255,0.55)", fontWeight: "600", marginBottom: "2px" }}>
            BENSALEM Loudjaine-hibatessetar <br/><br/>
          </div>
          
          <div style={{ color: "rgba(255,255,255,0.55)", fontWeight: "600" }}>
            TAIBI Nermine <br/> <br/>
          </div>
          <div>2025/2026</div>
        </div>

      </div>
    </div>
  );
}